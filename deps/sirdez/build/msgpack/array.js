"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackArrayBody = exports.packArray = void 0;
const pack_1 = require("./pack");
const size_1 = require("./size");
const unpack_1 = require("./unpack");
function packArray(ctx, data, floatHead, float, str) {
    const { length } = data;
    (0, size_1.packSize)(ctx, length, 0x90, 0xdc);
    for (let i = 0; i < length; i++) {
        (0, pack_1.pack)(ctx, data[i], floatHead, float, str);
    }
}
exports.packArray = packArray;
function unpackArrayBody(ctx, size, encoding) {
    const data = Array(size);
    for (let i = 0; i < size; i++) {
        data[i] = (0, unpack_1.unpack)(ctx, encoding);
    }
    return data;
}
exports.unpackArrayBody = unpackArrayBody;
//# sourceMappingURL=array.js.map