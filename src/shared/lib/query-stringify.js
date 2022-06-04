"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var obj = {
    key: 1,
    key2: "test",
    key3: false,
    key4: true,
    key5: [1, 2, 3],
    key6: { a: 1 },
    key7: { b: { d: 2 } }
};
function queryStringify(data) {
    var _a;
    if (!isObject(data)) {
        throw new Error("input must be an object");
    }
    var queryArray = [];
    for (var _i = 0, _b = Object.keys(data); _i < _b.length; _i++) {
        var key = _b[_i];
        if (Array.isArray(data[key]) || data[key].constructor === Object) {
            queryArray = __spreadArray(__spreadArray([], queryArray, true), objectToHash(data[key], key), true);
        }
        else {
            queryArray.push([key, (_a = data[key]) === null || _a === void 0 ? void 0 : _a.toString()]);
        }
    }
    // queryArray //?
    return queryArray.map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, "=").concat(value);
    }).join("&");
}
function isObject(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        obj.constructor === Object &&
        obj.toString() === "[object Object]");
}
function objectToHash(data, keyPrefix) {
    var keyValuePair = [];
    if (Array.isArray(data)) {
        data.forEach(function (value, index) {
            var key = "".concat(keyPrefix, "[").concat(index, "]");
            if (Array.isArray(value) || isObject(value)) {
                keyValuePair = __spreadArray(__spreadArray([], keyValuePair, true), objectToHash(value, key), true);
            }
            else {
                value = "".concat(value);
                keyValuePair.push([key, value]);
            }
        });
    }
    else {
        Object.keys(data).forEach(function (objectKey) {
            var key = "".concat(keyPrefix, "[").concat(objectKey, "]");
            var value = data[objectKey];
            if (Array.isArray(value) || isObject(value)) {
                keyValuePair = __spreadArray(__spreadArray([], keyValuePair, true), objectToHash(value, key), true);
            }
            else {
                value = "".concat(value);
                keyValuePair.push([key, value]);
            }
        });
    }
    return keyValuePair;
}
exports["default"] = queryStringify;
queryStringify(obj); //?
// 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
