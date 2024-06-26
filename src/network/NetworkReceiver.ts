import { Packets } from "./Packets";

export class NetworkReceiver {
  private readonly IV_SIZE = 12;
  private readonly DESTINATION = 0;

  private keyPair: CryptoKeyPair | undefined;
  private HMACKey: CryptoKey | undefined;
  private sharedKey: CryptoKey | undefined;

  private readonly webSocket: WebSocket;

  constructor(
    URI: string,
    private readonly inviteCode: string | undefined,
    private readonly messageCallback: (data: Uint8Array) => void,
    private readonly errorCallback: (message: string) => void,
    private readonly leaveRoomCallback: () => void
  ) {
    this.webSocket = new WebSocket(URI);
    this.webSocket.binaryType = "arraybuffer";
    this.webSocket.onopen = this.onOpen.bind(this);
    this.webSocket.onclose = this.onClose.bind(this);
    this.webSocket.onerror = this.onError.bind(this);
    this.webSocket.onmessage = this.onMessage.bind(this);
  }

  private async init() {
    if (!this.inviteCode) {
      return this.error("Invite code is invalid.");
    }

    const index = this.inviteCode.lastIndexOf("-");
    if (index === -1) {
      return this.error("Invalid URL structure.");
    }

    const id = this.inviteCode.slice(0, index);
    const key = this.inviteCode.slice(index + 1);

    if (!key || !id) {
      return this.error("Invalid URL components.");
    }

    let keyData;
    try {
      keyData = Uint8Array.from(atob(key), (character) =>
        character.charCodeAt(0)
      );
    } catch (error) {
      return this.error("Failed to decode key data", error);
    }

    try {
      this.HMACKey = await window.crypto.subtle.importKey(
        "raw",
        keyData,
        {
          name: "HMAC",
          hash: { name: "SHA-256" },
        },
        true,
        ["sign", "verify"]
      );
    } catch (error) {
      return this.error("Failed to import HMAC key", error);
    }

    try {
      this.keyPair = await window.crypto.subtle.generateKey(
        {
          name: "ECDH",
          namedCurve: "P-256",
        },
        false,
        ["deriveBits"]
      );
    } catch (error) {
      return this.error("Failed to generate public-private key", error);
    }

    this.sendJSON({
      type: "join",
      id,
    });
  }

  private async onOpen() {
    await this.init();
  }

  private async onClose() {
    return this.error("The connection to the network was closed.");
  }

  private async onError() {
    return this.error(
      "The connection to the network was closed due to an error."
    );
  }

  private async onMessage(event: MessageEvent) {
    if (event.data instanceof ArrayBuffer) {
      const data = new Uint8Array(event.data).subarray(1);

      if (this.sharedKey) {
        const iv = data.subarray(0, this.IV_SIZE);
        const ciphertext = data.subarray(this.IV_SIZE);

        try {
          const plaintext = new Uint8Array(
            await window.crypto.subtle.decrypt(
              { name: "AES-GCM", iv },
              this.sharedKey,
              ciphertext
            )
          );

          return this.messageCallback(plaintext);
        } catch (error) {
          return this.error("Failed to decrypt", error);
        }
      } else {
        const packet = Packets.Packet.decode(data);

        switch (packet.value) {
          case "handshake":
            return this.onHandshake(packet.handshake!);
        }
      }
    } else {
      const packet = JSON.parse(event.data as string);

      switch (packet.type) {
        case "leave":
          return this.onLeaveRoom();
        case "error":
          return this.error(packet.message);
      }
    }
  }

  private async onLeaveRoom() {
    this.close();
    this.leaveRoomCallback();
  }

  private async onHandshake(packet: Packets.IHandshakePacket) {
    if (!this.HMACKey) {
      return this.error("HMAC key is not valid.");
    }

    if (!this.keyPair) {
      return this.error("Key pair is not valid.");
    }

    let verification;
    try {
      verification = await window.crypto.subtle.verify(
        "HMAC",
        this.HMACKey,
        packet.signature,
        packet.publicKey
      );
    } catch (error) {
      return this.error("Failed to verify public key", error);
    }

    if (!verification) {
      return this.error("The signature from the sender did not match.");
    }

    let publicKey;
    try {
      publicKey = await window.crypto.subtle.importKey(
        "raw",
        packet.publicKey,
        {
          name: "ECDH",
          namedCurve: "P-256",
        },
        false,
        []
      );
    } catch (error) {
      return this.error("Failed to import public key", error);
    }

    await this.sendHandshakeResponse();

    let sharedSecret;
    try {
      sharedSecret = await window.crypto.subtle.deriveBits(
        {
          name: "ECDH",
          public: publicKey,
        },
        this.keyPair.privateKey,
        256
      );
    } catch (error) {
      return this.error("Failed to derive shared secret bits", error);
    }

    let keyMaterial;
    try {
      keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        sharedSecret,
        { name: "HKDF" },
        false,
        ["deriveKey"]
      );
    } catch (error) {
      return this.error("Failed to import HKDF key", error);
    }

    let salt;
    try {
      salt = await window.crypto.subtle.exportKey("raw", this.HMACKey);
    } catch (error) {
      return this.error("Failed to export HMAC key", error);
    }

    try {
      this.sharedKey = await window.crypto.subtle.deriveKey(
        {
          name: "HKDF",
          hash: "SHA-256",
          info: new Uint8Array(),
          salt,
        },
        keyMaterial,
        { name: "AES-GCM", length: 128 },
        false,
        ["encrypt", "decrypt"]
      );
    } catch (error) {
      return this.error("Failed to derive key", error);
    }
  }

  private close() {
    if (this.webSocket.readyState === this.webSocket.OPEN) {
      this.sendJSON({ type: "leave" });
    }
  }

  public error(message: string, error?: any) {
    this.close();

    if (error) {
      console.error(error);

      message += ": " + error;
    }

    this.errorCallback(message);
  }

  private async sendHandshakeResponse() {
    if (!this.HMACKey) {
      return this.error("HMAC key is not valid.");
    }

    if (!this.keyPair) {
      return this.error("Key pair is not valid.");
    }

    let publicKey: Uint8Array;
    try {
      publicKey = new Uint8Array(
        await window.crypto.subtle.exportKey("raw", this.keyPair.publicKey)
      );
    } catch (error) {
      return this.error("Failed to export public key", error);
    }

    let signature: Uint8Array;
    try {
      signature = new Uint8Array(
        await window.crypto.subtle.sign("HMAC", this.HMACKey, publicKey)
      );
    } catch (error) {
      return this.error("Failed to export HMAC key", error);
    }

    const packet = Packets.Packet.encode({
      handshakeResponse: { publicKey, signature },
    });
    const data = packet.finish();

    this.sendPlaintext(data);
  }

  private sendJSON(data: any) {
    this.webSocket.send(JSON.stringify(data));
  }

  private sendPlaintext(data: Uint8Array) {
    if (this.sharedKey) {
      return this.error(
        "Failed to send plaintext: shared key already established"
      );
    }

    const index = new Uint8Array([this.DESTINATION]);
    const merged = new Uint8Array(index.byteLength + data.byteLength);
    merged.set(index);
    merged.set(data, index.length);

    this.webSocket.send(merged);
  }

  public async send(data: Uint8Array) {
    if (!this.sharedKey) {
      return this.error("Failed to send encrypted: no shared key established");
    }

    const index = new Uint8Array([this.DESTINATION]);
    const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_SIZE));

    try {
      const ciphertext = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        this.sharedKey,
        data
      );

      const merged = new Uint8Array(
        index.byteLength + iv.byteLength + ciphertext.byteLength
      );

      merged.set(index);
      merged.set(iv, index.length);
      merged.set(new Uint8Array(ciphertext), iv.length + index.length);

      this.webSocket.send(merged);
    } catch (error) {
      return this.error("Failed to send encrypted", error);
    }
  }
}
