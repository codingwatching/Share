(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const Me=(e,t)=>e===t,He=Symbol("solid-track"),q={equals:Me};let Pe=be;const I=1,W=2,he={owned:null,cleanups:null,context:null,owner:null};var k=null;let se=null,b=null,A=null,F=null,X=0;function G(e,t){const n=b,s=k,r=e.length===0,i=r?he:{owned:null,cleanups:null,context:null,owner:t===void 0?s:t},o=r?e:()=>e(()=>_(()=>te(i)));k=i,b=null;try{return V(o,!0)}finally{b=n,k=s}}function R(e,t){t=t?Object.assign({},q,t):q;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=r=>(typeof r=="function"&&(r=r(n.value)),pe(n,r));return[ye.bind(n),s]}function L(e,t,n){const s=we(e,t,!1,I);ee(s)}function N(e,t,n){n=n?Object.assign({},q,n):q;const s=we(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,ee(s),ye.bind(s)}function _(e){if(b===null)return e();const t=b;b=null;try{return e()}finally{b=t}}function Ue(e){return k===null||(k.cleanups===null?k.cleanups=[e]:k.cleanups.push(e)),e}function Re(e){const t=N(e),n=N(()=>ie(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}function ye(){if(this.sources&&this.state)if(this.state===I)ee(this);else{const e=A;A=null,V(()=>Y(this),!1),A=e}if(b){const e=this.observers?this.observers.length:0;b.sources?(b.sources.push(this),b.sourceSlots.push(e)):(b.sources=[this],b.sourceSlots=[e]),this.observers?(this.observers.push(b),this.observerSlots.push(b.sources.length-1)):(this.observers=[b],this.observerSlots=[b.sources.length-1])}return this.value}function pe(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&V(()=>{for(let r=0;r<e.observers.length;r+=1){const i=e.observers[r],o=se&&se.running;o&&se.disposed.has(i),(o?!i.tState:!i.state)&&(i.pure?A.push(i):F.push(i),i.observers&&me(i)),o||(i.state=I)}if(A.length>1e6)throw A=[],new Error},!1)),t}function ee(e){if(!e.fn)return;te(e);const t=k,n=b,s=X;b=k=e,Oe(e,e.value,s),b=n,k=t}function Oe(e,t,n){let s;try{s=e.fn(t)}catch(r){return e.pure&&(e.state=I,e.owned&&e.owned.forEach(te),e.owned=null),e.updatedAt=n+1,ve(r)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?pe(e,s):e.value=s,e.updatedAt=n)}function we(e,t,n,s=I,r){const i={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:k,context:null,pure:n};return k===null||k!==he&&(k.owned?k.owned.push(i):k.owned=[i]),i}function ge(e){if(e.state===0)return;if(e.state===W)return Y(e);if(e.suspense&&_(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<X);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===I)ee(e);else if(e.state===W){const s=A;A=null,V(()=>Y(e,t[0]),!1),A=s}}function V(e,t){if(A)return e();let n=!1;t||(A=[]),F?n=!0:F=[],X++;try{const s=e();return Fe(n),s}catch(s){n||(F=null),A=null,ve(s)}}function Fe(e){if(A&&(be(A),A=null),e)return;const t=F;F=null,t.length&&V(()=>Pe(t),!1)}function be(e){for(let t=0;t<e.length;t++)ge(e[t])}function Y(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const s=e.sources[n];if(s.sources){const r=s.state;r===I?s!==t&&(!s.updatedAt||s.updatedAt<X)&&ge(s):r===W&&Y(s,t)}}}function me(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=W,n.pure?A.push(n):F.push(n),n.observers&&me(n))}}function te(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),r=n.observers;if(r&&r.length){const i=r.pop(),o=n.observerSlots.pop();s<r.length&&(i.sourceSlots[o]=s,r[s]=i,n.observerSlots[s]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)te(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Ne(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ve(e,t=k){throw Ne(e)}function ie(e){if(typeof e=="function"&&!e.length)return ie(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=ie(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}const Ie=Symbol("fallback");function ae(e){for(let t=0;t<e.length;t++)e[t]()}function Be(e,t,n={}){let s=[],r=[],i=[],o=0,l=t.length>1?[]:null;return Ue(()=>ae(i)),()=>{let c=e()||[],u,a;return c[He],_(()=>{let d=c.length,m,v,h,f,p,C,S,$,E;if(d===0)o!==0&&(ae(i),i=[],s=[],r=[],o=0,l&&(l=[])),n.fallback&&(s=[Ie],r[0]=G(M=>(i[0]=M,n.fallback())),o=1);else if(o===0){for(r=new Array(d),a=0;a<d;a++)s[a]=c[a],r[a]=G(w);o=d}else{for(h=new Array(d),f=new Array(d),l&&(p=new Array(d)),C=0,S=Math.min(o,d);C<S&&s[C]===c[C];C++);for(S=o-1,$=d-1;S>=C&&$>=C&&s[S]===c[$];S--,$--)h[$]=r[S],f[$]=i[S],l&&(p[$]=l[S]);for(m=new Map,v=new Array($+1),a=$;a>=C;a--)E=c[a],u=m.get(E),v[a]=u===void 0?-1:u,m.set(E,a);for(u=C;u<=S;u++)E=s[u],a=m.get(E),a!==void 0&&a!==-1?(h[a]=r[u],f[a]=i[u],l&&(p[a]=l[u]),a=v[a],m.set(E,a)):i[u]();for(a=C;a<d;a++)a in h?(r[a]=h[a],i[a]=f[a],l&&(l[a]=p[a],l[a](a))):r[a]=G(w);r=r.slice(0,o=d),s=c.slice(0)}return r});function w(d){if(i[a]=d,l){const[m,v]=R(a);return l[a]=v,t(c[a],m)}return t(c[a])}}}function y(e,t){return _(()=>e(t||{}))}const Ce=e=>`Stale read from <${e}>.`;function Te(e){const t="fallback"in e&&{fallback:()=>e.fallback};return N(Be(()=>e.each,e.children,t||void 0))}function le(e){const t=e.keyed,n=N(()=>e.when,void 0,{equals:(s,r)=>t?s===r:!s==!r});return N(()=>{const s=n();if(s){const r=e.children;return typeof r=="function"&&r.length>0?_(()=>r(t?s:()=>{if(!_(n))throw Ce("Show");return e.when})):r}return e.fallback},void 0,void 0)}function ke(e){let t=!1;const n=(i,o)=>i[0]===o[0]&&(t?i[1]===o[1]:!i[1]==!o[1])&&i[2]===o[2],s=Re(()=>e.children),r=N(()=>{let i=s();Array.isArray(i)||(i=[i]);for(let o=0;o<i.length;o++){const l=i[o].when;if(l)return t=!!i[o].keyed,[o,l,i[o]]}return[-1]},void 0,{equals:n});return N(()=>{const[i,o,l]=r();if(i<0)return e.fallback;const c=l.children;return typeof c=="function"&&c.length>0?_(()=>c(t?o:()=>{if(_(r)[0]!==i)throw Ce("Match");return l.when})):c},void 0,void 0)}function U(e){return e}function Le(e,t,n){let s=n.length,r=t.length,i=s,o=0,l=0,c=t[r-1].nextSibling,u=null;for(;o<r||l<i;){if(t[o]===n[l]){o++,l++;continue}for(;t[r-1]===n[i-1];)r--,i--;if(r===o){const a=i<s?l?n[l-1].nextSibling:n[i-l]:c;for(;l<i;)e.insertBefore(n[l++],a)}else if(i===l)for(;o<r;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[i-1]&&n[l]===t[r-1]){const a=t[--r].nextSibling;e.insertBefore(n[l++],t[o++].nextSibling),e.insertBefore(n[--i],a),t[r]=n[i]}else{if(!u){u=new Map;let w=l;for(;w<i;)u.set(n[w],w++)}const a=u.get(t[o]);if(a!=null)if(l<a&&a<i){let w=o,d=1,m;for(;++w<r&&w<i&&!((m=u.get(t[w]))==null||m!==a+d);)d++;if(d>a-l){const v=t[o];for(;l<a;)e.insertBefore(n[l++],v)}else e.replaceChild(n[l++],t[o++])}else o++;else t[o++].remove()}}}const ue="_$DX_DELEGATE";function je(e,t,n,s={}){let r;return G(i=>{r=i,t===document?e():H(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{r(),t.textContent=""}}function P(e,t,n){let s;const r=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},i=t?()=>_(()=>document.importNode(s||(s=r()),!0)):()=>(s||(s=r())).cloneNode(!0);return i.cloneNode=i,i}function ce(e,t=window.document){const n=t[ue]||(t[ue]=new Set);for(let s=0,r=e.length;s<r;s++){const i=e[s];n.has(i)||(n.add(i),t.addEventListener(i,ze))}}function Ae(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function De(e,t,n){return _(()=>e(t,n))}function H(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return Q(e,t,s,n);L(r=>Q(e,t(),r,n),s)}function ze(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const s=n[t];if(s&&!n.disabled){const r=n[`${t}Data`];if(r!==void 0?s.call(n,r,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function Q(e,t,n,s,r){for(;typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,i==="string"||i==="number")if(i==="number"&&(t=t.toString()),o){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=B(e,n,s,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||i==="boolean")n=B(e,n,s);else{if(i==="function")return L(()=>{let l=t();for(;typeof l=="function";)l=l();n=Q(e,l,n,s)}),()=>n;if(Array.isArray(t)){const l=[],c=n&&Array.isArray(n);if(oe(l,t,n,r))return L(()=>n=Q(e,l,n,s,!0)),()=>n;if(l.length===0){if(n=B(e,n,s),o)return n}else c?n.length===0?fe(e,l,s):Le(e,n,l):(n&&B(e),fe(e,l));n=l}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=B(e,n,s,t);B(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function oe(e,t,n,s){let r=!1;for(let i=0,o=t.length;i<o;i++){let l=t[i],c=n&&n[i],u;if(!(l==null||l===!0||l===!1))if((u=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))r=oe(e,l,c)||r;else if(u==="function")if(s){for(;typeof l=="function";)l=l();r=oe(e,Array.isArray(l)?l:[l],Array.isArray(c)?c:[c])||r}else e.push(l),r=!0;else{const a=String(l);c&&c.nodeType===3&&c.data===a?e.push(c):e.push(document.createTextNode(a))}}return r}function fe(e,t,n=null){for(let s=0,r=t.length;s<r;s++)e.insertBefore(t[s],n)}function B(e,t,n,s){if(n===void 0)return e.textContent="";const r=s||document.createTextNode("");if(t.length){let i=!1;for(let o=t.length-1;o>=0;o--){const l=t[o];if(r!==l){const c=l.parentNode===e;!i&&!o?c?e.replaceChild(r,l):e.insertBefore(r,n):c&&l.remove()}else i=!0}}else e.insertBefore(r,n);return[r]}function Ze(e=4096){const t=new ArrayBuffer(e);return{i:0,view:new DataView(t),bytes:new Uint8Array(t)}}function Ve(e){e.bytes=new Uint8Array(e.bytes.length*2),e.view=new DataView(e.bytes.buffer)}function de(e,t,n){for(;;){const s=e.bytes.length-8;e.i=0;try{if(t(e,n),e.i<s)return e.bytes}catch(r){if(e.i<s&&!(r instanceof RangeError))throw r}Ve(e)}}function Je(e,t,n){const{length:s}=n;s<4096?(e.bytes.set(n),e.i=0):e=Ge(n);const r=t(e);if(e.i!==s)throw RangeError(`Expected to process ${s} bytes, processed ${e.i} bytes instead`);return r}function Ge(e){return{i:0,bytes:e,view:new DataView(e.buffer,e.byteOffset,e.byteLength)}}function O(e,t){return{ser:e,des:t}}function qe({ser:e,des:t},n){const s=Ze(n);return{ser:e,des:t,toBytes:r=>de(s,e,r).slice(0,s.i),toUnsafeBytes:r=>de(s,e,r).subarray(0,s.i),fromBytes:r=>Je(s,t,r)}}const We={encode(e,t){const{length:n}=t;for(let s=0;s<n;s++){const r=t.charCodeAt(s);if(r<128)e.view.setUint8(e.i,r),e.i++;else if(r<2048){const i=(r&1984)<<2,o=r&63;e.view.setUint16(e.i,i|o|49280),e.i+=2}else if(r<55296||r>=57344){const i=(r&61440)<<12,o=(r&4032)<<10,l=(r&63)<<8;e.view.setUint32(e.i,i|o|l|3766517760),e.i+=3}else{const i=t.codePointAt(s++),o=(i&1835008)<<6,l=(i&258048)<<4,c=(i&4032)<<2,u=i&63;e.view.setUint32(e.i,o|l|c|u|4034953344),e.i+=4}}},decode(e,t){const n=[],s=e.i+t;for(;e.i<s;){const r=e.view.getUint8(e.i);if(r<192)n.push(r),e.i++;else if(r<224){const i=e.view.getUint8(e.i+1);e.i+=2,n.push((r&31)<<6|i&63)}else if(r<240){const i=e.view.getUint8(e.i+1),o=e.view.getUint8(e.i+2);e.i+=3,n.push((r&15)<<12|(i&63)<<6|o&63)}else{const i=e.view.getUint32(e.i),o=(r&7)<<18,l=(i&4128768)>>4,c=(i&16128)>>2,u=i&63;n.push(o|l|c|u),e.i+=4}}return String.fromCodePoint(...n)}},Ye=(e,t)=>O((n,s)=>{const{length:r}=s;t.ser(n,r);for(let i=0;i<r;i++)e.ser(n,s[i])},n=>{const s=t.des(n),r=new Array(s);for(let i=0;i<s;i++)r[i]=e.des(n);return r}),j=e=>O((t,n)=>{const{byteLength:s}=n;e.ser(t,s);const{i:r}=t;t.i+=s,t.bytes.set(n,r)},t=>{const n=e.des(t);return t.bytes.subarray(t.i,t.i+=n)}),Qe=(e,t)=>O((n,s)=>{const r=n.i;t.ser(n,s.length);const i=n.i,o=i-r;e.encode(n,s);const l=n.i,c=l-i;if(c===s.length)return;t.ser(n,c);const u=n.i-l;o!==u&&n.bytes.copyWithin(r+u,i,l),n.i=r,t.ser(n,c),n.i=l+(u-o)},n=>e.decode(n,t.des(n)));class Xe extends Error{constructor(t){super(`Invalid oneOf type (${t})`),this.type=t}}const et=(e,t)=>{const n=Object.keys(t),s=tt(n),r=nt(s);return O((i,o)=>{const l=s[o.type];e.ser(i,l),t[o.type].ser(i,o.value)},i=>{const o=e.des(i),l=r[o];if(l===void 0)throw new Xe(o);const u=t[l].des(i);return{type:l,value:u}})};function tt(e){const t={};for(let n=0;n<e.length;++n){const s=e[n];t[s]=n}return t}function nt(e){const t={};for(const n of Object.keys(e)){const s=e[n];t[s]=n}return t}const Se=O((e,t)=>e.view.setUint8(e.i++,t),e=>e.view.getUint8(e.i++)),T=O((e,t)=>{e.view.setUint16(e.i,t),e.i+=2},e=>{const t=e.view.getUint16(e.i);return e.i+=2,t}),D=O((e,t)=>{e.view.setUint32(e.i,t),e.i+=4},e=>{const t=e.view.getUint32(e.i);return e.i+=4,t}),J=e=>{const t=e instanceof Array?()=>[]:()=>({});return O((n,s)=>{for(const r in e)e[r].ser(n,s[r])},n=>{const s=t();for(const r in e)s[r]=e[r].des(n);return s})},rt=J({publicKey:j(D),signature:j(D)}),st=J({publicKey:j(D),signature:j(D)}),it=Ye(J({index:T,name:Qe(We,T),size:D}),T),ot=J({index:T,progress:Se}),lt=J({chunk:j(T)}),ct=et(Se,{Handshake:rt,HandshakeResponse:st,List:it,Progress:ot,Chunk:lt}),{fromBytes:at,toUnsafeBytes:ut}=qe(ct);function z(e,t){return{type:e,value:t}}function Z(e){return ut(e)}function ne(e){return at(e)}class ft{constructor(t,n,s,r,i,o,l){this.messageCallback=n,this.openCallback=s,this.createRoomCallback=r,this.leaveRoomCallback=i,this.joinRoomCallback=o,this.errorCallback=l,this.webSocket=new WebSocket(t),this.webSocket.onopen=this.onOpen.bind(this),this.webSocket.onclose=this.onClose.bind(this),this.webSocket.onerror=this.onError.bind(this),this.webSocket.onmessage=this.onMessage.bind(this)}ROOM_SIZE=2;IV_SIZE=12;DESTINATION=1;keyPair;HMACKey;sharedKey;webSocket;async init(){try{this.keyPair=await window.crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},!1,["deriveKey"])}catch(t){return this.error("Failed to generate public-private key: "+t)}try{this.HMACKey=await window.crypto.subtle.generateKey({name:"HMAC",hash:{name:"SHA-256"}},!0,["sign","verify"])}catch(t){return this.error("Failed to generate HMAC key: "+t)}this.sendJSON({type:"create",size:this.ROOM_SIZE})}async onOpen(){this.openCallback()}async onClose(){return this.error("Network closed.")}async onError(){return this.error("Network error.")}async onMessage(t){if(t.data instanceof Blob){const n=await t.data.arrayBuffer(),s=new Uint8Array(n).slice(1);if(this.sharedKey){const r=s.slice(0,this.IV_SIZE),i=s.slice(this.IV_SIZE);try{const o=new Uint8Array(await window.crypto.subtle.decrypt({name:"AES-GCM",iv:r},this.sharedKey,i));return this.messageCallback(o)}catch(o){return this.error("Failed to decrypt: "+o)}}else{const r=ne(s);switch(r.type){case"HandshakeResponse":return this.onHandshakeResponse(r.value)}}}else{const n=JSON.parse(t.data);switch(n.type){case"create":return this.onCreateRoom(n.id);case"leave":return this.onLeaveRoom();case"join":return this.onJoinRoom();case"error":return this.error(n.message)}}}async onLeaveRoom(){this.sharedKey=void 0,this.leaveRoomCallback()}async onCreateRoom(t){if(!this.HMACKey)return this.error("HMAC key is not valid.");let n;try{n=await window.crypto.subtle.exportKey("raw",this.HMACKey)}catch(r){return this.error("Failed to export HMAC key: "+r)}const s=t+"-"+btoa(String.fromCharCode(...new Uint8Array(n)));this.createRoomCallback(s)}async onJoinRoom(){if(!this.HMACKey)return this.error("HMAC key is not valid.");if(!this.keyPair)return this.error("Key pair is not valid.");let t;try{t=new Uint8Array(await window.crypto.subtle.exportKey("raw",this.keyPair.publicKey))}catch(i){return this.error("Failed to export public key: "+i)}let n;try{n=new Uint8Array(await window.crypto.subtle.sign("HMAC",this.HMACKey,t))}catch(i){return this.error("Failed to export HMAC key: "+i)}const s=z("Handshake",{publicKey:t,signature:n}),r=Z(s);this.send(r)}async onHandshakeResponse(t){if(!this.HMACKey)return this.error("HMAC key is not valid.");if(!this.keyPair)return this.error("Key pair is not valid.");let n;try{n=await window.crypto.subtle.verify("HMAC",this.HMACKey,t.signature,t.publicKey)}catch(r){return this.error("Failed to verify public key: "+r)}if(!n)return this.error("The signature from the receiver was invalid.");let s;try{s=await window.crypto.subtle.importKey("raw",t.publicKey,{name:"ECDH",namedCurve:"P-256"},!1,[])}catch(r){return this.error("Failed to import public key: "+r)}try{this.sharedKey=await window.crypto.subtle.deriveKey({name:"ECDH",public:s},this.keyPair.privateKey,{name:"AES-GCM",length:128},!1,["encrypt","decrypt"])}catch(r){return this.error("Failed to derive key: "+r)}this.joinRoomCallback()}error(t){this.webSocket.readyState===this.webSocket.OPEN&&this.sendJSON({type:"leave"}),this.errorCallback(t)}async sendJSON(t){this.webSocket.send(JSON.stringify(t))}async send(t){const n=new Uint8Array([this.DESTINATION]);if(this.sharedKey){const s=window.crypto.getRandomValues(new Uint8Array(12));try{const r=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:s},this.sharedKey,t);this.webSocket.send(new Blob([n,s,r]))}catch(r){return this.error("Failed to encrypt: "+r)}}else this.webSocket.send(new Blob([n,t]))}}const dt="/assets/error-a5dcf9ff.svg",ht=P('<button class="transition border w-fit font-bold border-[#4a4f58] py-2 px-6 rounded hover:bg-[#292e34] mr-2">Go Back'),yt=P('<button class="transition w-fit font-bold border-[#4a4f58] py-2 px-4 rounded hover:bg-[#292e34]">Retry'),pt=P('<div class="flex flex-col h-fit min-h-screen justify-center items-center p-5"><img class="w-32 h-32 mb-[-20px]"><div class="text-4xl text-white">Error</div><div class="text-xl text-white max-w-lg mt-3 mb-5 text-center"></div><div class="flex flex-row">'),wt=P('<button class="transition border w-fit font-bold border-[#4a4f58] py-2 px-6 rounded hover:bg-[#292e34] mr-2">Retry'),xe=e=>{const t=()=>{location.reload()},n=()=>{history.pushState("",document.title,window.location.pathname+window.location.search),location.reload()};return(()=>{const s=pt(),r=s.firstChild,i=r.nextSibling,o=i.nextSibling,l=o.nextSibling;return Ae(r,"src",dt),H(o,()=>e.message),H(l,y(le,{get when(){return location.hash},get fallback(){return(()=>{const c=wt();return c.$$click=t,c})()},get children(){return[(()=>{const c=ht();return c.$$click=n,c})(),(()=>{const c=yt();return c.$$click=t,c})()]}})),s})()};ce(["click"]);const gt=P('<div class="flex flex-col h-fit min-h-screen justify-center items-center p-5 text-center"><div class="text-4xl max-w-lg mb-3">Your files are ready to send...</div><div class="text-lg max-w-lg mb-6">Copy the link to share your files. Keep your <b>browser tab open</b> as your files are sent in real-time rather than being uploaded to a server.</div><input type="text" placeholder="Type a name..." readonly class="max-w-lg mb-4 focus:border-[#9ea6b5] border rounded bg-transparent border-[#4a4f58] w-full py-4 px-3 text-white leading-tight focus:outline-none"><button class="transition w-full max-w-lg font-bold bg-[#0060df] py-3 px-6 rounded hover:bg-[#2e75d1]">'),bt=()=>{const[e,t]=R(!1),n=()=>{navigator.clipboard.writeText(window.location.href),t(!0),setTimeout(()=>t(!1),1e3)};return(()=>{const s=gt(),r=s.firstChild,i=r.nextSibling,o=i.nextSibling,l=o.nextSibling;return l.$$click=n,H(l,y(le,{get when(){return e()},fallback:"Copy link",children:"Copied!"})),L(()=>o.value=window.location.href),s})()};ce(["click"]);const mt=P('<div class="flex flex-col h-fit min-h-screen justify-center items-center p-5"><svg class="w-16 h-16 text-[#0f1013] animate-spin mb-7 dark:text-gray-600 fill-[#fff]" viewBox="0 0 100 101" fill="none"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path></svg><div class="text-white text-xl max-w-lg select-none text-center">'),$e=e=>(()=>{const t=mt(),n=t.firstChild,s=n.nextSibling;return H(s,()=>e.message),t})(),vt="/assets/logo-59aceee3.svg",Ct=P(`<div class="flex h-fit min-h-screen justify-center md:items-center items-start"><div class="flex flex-col-reverse md:flex-row max-w-[53rem] bg-[#23272c] shadow-lg rounded-md overflow-hidden text-center"><div class="flex-col"><div class="flex flex-col items-center justify-center border-2 border-dashed rounded-md border-[#64676e] px-[100px] py-[150px]"><svg class="h-10 w-10 mb-3" fill="#fff" viewBox="0 0 32 32"><path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 
                14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 
                0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path></svg><div class="text-2xl w-max">Drag and drop files</div><div class="text-l w-max mb-6">or click to select files</div><button class="transition w-fit font-bold bg-[#0060df] py-3 px-6 rounded hover:bg-[#2e75d1] mr-2">Select files to upload</button><input multiple type="file"></div></div><div class="flex flex-col bg-[#101214] pb-7 w-full md:pb-0 md:w-[21rem]"><div class="flex flex-row m-7 mb-6 items-center"><div class="bg-[#0060df] h-14 w-14 p-1 rounded-lg mr-5"><img class="invert"></div><div class="text-5xl font-bold mb-[5px] select-none text-white">Share</div></div><div class="mx-7 text-gray-300 text-justify">A real-time, peer-to-peer file transfer application allows you to send files of any size by simply selecting your files and sending a link. Your files are sent in real-time and are not stored on any server. No sign-ups are required.`),kt=e=>{const t=r=>{const i=r.target;i.files&&e.selectFiles(i.files)},n=()=>{s?.click()};let s;return(()=>{const r=Ct(),i=r.firstChild,o=i.firstChild,l=o.firstChild,c=l.firstChild,u=c.nextSibling,a=u.nextSibling,w=a.nextSibling,d=w.nextSibling,m=o.nextSibling,v=m.firstChild,h=v.firstChild,f=h.firstChild;w.$$click=n,d.addEventListener("change",t);const p=s;return typeof p=="function"?De(p,d):s=d,d.style.setProperty("display","none"),Ae(f,"src",vt),r})()};ce(["click"]);const At=P('<div class="flex flex-col h-fit min-h-screen justify-center items-center p-5 text-center"><div class="text-4xl max-w-lg mb-3">Transferring files...</div><div class="text-lg max-w-lg mb-6">Keep your <b>browser tab open</b> as files are sent in real-time.</div><div class="flex flex-col gap-3">'),St=P('<div class="flex flex-col bg-[#23272c] shadow-lg rounded-md text-left p-4 w-[500px]"><div class="flex flex-row"><div class="mr-2"><svg class="w-12 h-12 invert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m79.46,22.56l-6.67-7.04-3.92-4.14c-.33-.35-.7-.62-1.1-.84-.23-.13-.48-.23-.73-.31-.07-.02-.13-.05-.2-.07h0s0,0,0,0v11.08c0,1.26.87,2.32,2.04,2.61.21.05.43.09.66.09h10.81s0,0,0,0h0c-.23-.51-.52-.99-.9-1.39Z"></path><path d="m27.79,10c-4.75,0-8.61,4.12-8.61,9.19v61.62c0,5.07,3.86,9.19,8.61,9.19h44.41c4.75,0,8.61-4.12,8.61-9.19V27.2h-11.26c-3.28,0-5.95-2.67-5.95-5.95v-11.25H27.79Zm4.58,17.57h17.62c.9,0,1.62.72,1.62,1.62s-.72,1.62-1.62,1.62h-17.62c-.9,0-1.62-.72-1.62-1.62s.72-1.62,1.62-1.62Zm35.24,44.86h-35.24c-.9,0-1.62-.72-1.62-1.62s.72-1.62,1.62-1.62h35.24c.9,0,1.62.72,1.62,1.62s-.72,1.62-1.62,1.62Zm0-24.05c.9,0,1.62.72,1.62,1.62s-.72,1.62-1.62,1.62h-35.24c-.9,0-1.62-.72-1.62-1.62s.72-1.62,1.62-1.62h35.24Z"></path></svg></div><div class="flex flex-col items-start"><div class="font-bold"></div><div></div></div></div><div class="flex flex-col px-2"><div class="text-[#2f88fc] font-bold mb-1 mt-1">%</div><div class="w-full bg-gray-700 rounded-full h-1.5 mb-2"><div class="bg-[#2f88fc] h-1.5 rounded-full">'),Ee=e=>{const t=n=>{const s=n==0?0:Math.floor(Math.log(n)/Math.log(1024));return(n/Math.pow(1024,s)).toFixed(2)+" "+["B","KB","MB","GB","TB"][s]};return(()=>{const n=At(),s=n.firstChild,r=s.nextSibling,i=r.nextSibling;return H(i,y(Te,{get each(){return e.files()},children:o=>(()=>{const l=St(),c=l.firstChild,u=c.firstChild,a=u.nextSibling,w=a.firstChild,d=w.nextSibling,m=c.nextSibling,v=m.firstChild,h=v.firstChild,f=v.nextSibling,p=f.firstChild;return H(w,()=>o.name),H(d,()=>t(o.size)),H(v,()=>o.progress(),h),L(()=>o.progress()+"%"!=null?p.style.setProperty("width",o.progress()+"%"):p.style.removeProperty("width")),l})()})),n})()},xt=()=>{let t,n,s,r;const[i,o]=R([]),[l,c]=R({type:"loading",message:"Attempting to connect..."}),u=g=>{const x=ne(g);switch(x.type){case"Progress":return h(x.value)}},a=()=>{c({type:"selectFile"})},w=g=>{location.hash=g,c({type:"invite"})},d=()=>{c({type:"invite"})},m=async()=>{c({type:"transferFile"}),await $(),await S()},v=g=>{c({type:"error",message:g})},h=g=>{const x=i().at(g.index);if(!x)return M.error("Expected valid progress packet index.");x.setProgress(g.progress)},f=g=>{if(g.length===0)return M.error("Expected file list to not be empty.");const x=[];for(let K=0;K<g.length;K++){const re=g[K],[Ke,_e]=R(0);x.push({index:K,file:re,progress:Ke,setProgress:_e,name:re.name,size:re.size})}o(x),c({type:"loading",message:"Attempting to create room..."}),M.init()},p=()=>{const g=new Uint8Array(E.result),x=z("Chunk",{chunk:g}),K=Z(x);M.send(K),C()},C=()=>{if(l().type!=="transferFile")return M.error("Transfer cancelled.");if(s===0){if(t===i().length-1)return;t++,n=0,r=65535,s=i()[t].size}const g=i()[t].file;if(!g)return M.error("File handle is invalid.");s<r&&(r=s);const x=g.slice(n,n+r);s-=r,n+=r,E.readAsArrayBuffer(x)},S=()=>{t=0,n=0,r=65535,s=i()[t].size,C()},$=()=>{const g=z("List",[]);for(const K of i())g.value.push({index:K.index,name:K.name,size:K.size});const x=Z(g);M.send(x)},E=new FileReader;E.onload=p;const M=new ft("wss://vldr.org:8080/relay",u,a,w,d,m,v);return y(ke,{get children(){return[y(U,{get when(){return l().type==="error"},get children(){return y(xe,{get message(){return l().message}})}}),y(U,{get when(){return l().type==="loading"},get children(){return y($e,{get message(){return l().message}})}}),y(U,{get when(){return l().type==="invite"},get children(){return y(bt,{})}}),y(U,{get when(){return l().type==="selectFile"},get children(){return y(kt,{selectFiles:f})}}),y(U,{get when(){return l().type==="transferFile"},get children(){return y(Ee,{files:i})}})]}})};class $t{constructor(t,n,s,r){this.inviteCode=n,this.messageCallback=s,this.errorCallback=r,this.webSocket=new WebSocket(t),this.webSocket.onopen=this.onOpen.bind(this),this.webSocket.onclose=this.onClose.bind(this),this.webSocket.onerror=this.onError.bind(this),this.webSocket.onmessage=this.onMessage.bind(this)}IV_SIZE=12;DESTINATION=0;keyPair;HMACKey;sharedKey;webSocket;async init(){if(!this.inviteCode)return this.error("Invite code is invalid.");const t=this.inviteCode.lastIndexOf("-");if(t===-1)return this.error("Invalid URL structure.");const n=this.inviteCode.slice(0,t),s=this.inviteCode.slice(t+1);if(!s||!n)return this.error("Invalid URL components.");let r;try{r=Uint8Array.from(atob(s),i=>i.charCodeAt(0))}catch(i){return this.error("Failed to decode key data: "+i)}try{this.HMACKey=await window.crypto.subtle.importKey("raw",r,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign","verify"])}catch(i){return this.error("Failed to import HMAC key: "+i)}try{this.keyPair=await window.crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},!1,["deriveKey"])}catch(i){return this.error("Failed to generate public-private key: "+i)}this.sendJSON({type:"join",id:n})}async onOpen(){await this.init()}async onClose(){return this.error("Network closed.")}async onError(){return this.error("Network error.")}async onMessage(t){if(t.data instanceof Blob){const n=await t.data.arrayBuffer(),s=new Uint8Array(n).slice(1);if(this.sharedKey){const r=s.slice(0,this.IV_SIZE),i=s.slice(this.IV_SIZE);try{const o=new Uint8Array(await window.crypto.subtle.decrypt({name:"AES-GCM",iv:r},this.sharedKey,i));return this.messageCallback(o)}catch(o){return this.error("Failed to decrypt: "+o)}}else{const r=ne(s);switch(r.type){case"Handshake":return this.onHandshake(r.value)}}}else{const n=JSON.parse(t.data);switch(n.type){case"leave":return this.onLeaveRoom();case"error":return this.error(n.message)}}}async onLeaveRoom(){return this.error("The sender has left the room.")}async onHandshake(t){if(!this.HMACKey)return this.error("HMAC key is not valid.");if(!this.keyPair)return this.error("Key pair is not valid.");let n;try{n=await window.crypto.subtle.verify("HMAC",this.HMACKey,t.signature,t.publicKey)}catch(r){return this.error("Failed to verify public key: "+r)}if(!n)return this.error("The signature from the sender was invalid.");let s;try{s=await window.crypto.subtle.importKey("raw",t.publicKey,{name:"ECDH",namedCurve:"P-256"},!1,[])}catch(r){return this.error("Failed to import public key: "+r)}await this.sendHandshakeResponse();try{this.sharedKey=await window.crypto.subtle.deriveKey({name:"ECDH",public:s},this.keyPair.privateKey,{name:"AES-GCM",length:128},!1,["encrypt","decrypt"])}catch(r){return this.error("Failed to derive key: "+r)}}error(t){this.webSocket.readyState===this.webSocket.OPEN&&this.sendJSON({type:"leave"}),this.errorCallback(t)}async sendHandshakeResponse(){if(!this.HMACKey)return this.error("HMAC key is not valid.");if(!this.keyPair)return this.error("Key pair is not valid.");let t;try{t=new Uint8Array(await window.crypto.subtle.exportKey("raw",this.keyPair.publicKey))}catch(i){return this.error("Failed to export public key: "+i)}let n;try{n=new Uint8Array(await window.crypto.subtle.sign("HMAC",this.HMACKey,t))}catch(i){return this.error("Failed to export HMAC key: "+i)}const s=z("HandshakeResponse",{publicKey:t,signature:n}),r=Z(s);this.send(r)}async sendJSON(t){this.webSocket.send(JSON.stringify(t))}async send(t){const n=new Uint8Array([this.DESTINATION]);if(this.sharedKey){const s=window.crypto.getRandomValues(new Uint8Array(12));try{const r=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:s},this.sharedKey,t);this.webSocket.send(new Blob([n,s,r]))}catch(r){return this.error("Failed to encrypt: "+r)}}else this.webSocket.send(new Blob([n,t]))}}const Et=()=>{let e,t,n,s;const[r,i]=R([]),[o,l]=R({type:"loading",message:"Attempting to connect..."}),c=h=>{const f=ne(h);switch(f.type){case"List":return a(f.value);case"Chunk":return w(f.value)}},u=h=>{l({type:"error",message:h})},a=h=>{const f=[];for(const p of h){const[C,S]=R(0);f.push({name:p.name,index:p.index,size:p.size,progress:C,setProgress:S,file:void 0})}e=0,t=0,n=0,s=[],i(f),l({type:"transferFile"})},w=h=>{const f=r()[e];if(!f)return v.error("Chunk packet does not match a given index.");s.push(h.chunk),t+=h.chunk.byteLength,f.setProgress(t/f.size*100>>0),(f.progress()===100||f.progress()-n>1)&&m(f),f.size===t&&d(f)},d=h=>{const f=new Blob(s),p=document.createElement("a");document.body.appendChild(p);const C=window.URL.createObjectURL(f);p.href=C,p.download=h.name,p.click(),window.URL.revokeObjectURL(C),e++,t=0,n=0,s=[]},m=h=>{n=h.progress();const f=z("Progress",{index:h.index,progress:n}),p=Z(f);v.send(p)},v=new $t("wss://vldr.org:8080/relay",location.hash.replace("#",""),c,u);return y(ke,{get children(){return[y(U,{get when(){return o().type==="error"},get children(){return y(xe,{get message(){return o().message}})}}),y(U,{get when(){return o().type==="loading"},get children(){return y($e,{get message(){return o().message}})}}),y(U,{get when(){return o().type==="transferFile"},get children(){return y(Ee,{files:r})}})]}})},Kt=()=>y(le,{get when(){return location.hash},get fallback(){return y(xt,{})},get children(){return y(Et,{})}});const _t=document.getElementById("root");je(()=>y(Kt,{}),_t);
