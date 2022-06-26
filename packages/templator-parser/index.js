var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequirec580"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequirec580"] = parcelRequire;
}
parcelRequire.register("gio3e", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $agEb9 = parcelRequire("agEb9");

var $1vc03 = parcelRequire("1vc03");
function $d5236a2f272f8223$var$_slicedToArray(arr, i) {
    return $d5236a2f272f8223$var$_arrayWithHoles(arr) || $d5236a2f272f8223$var$_iterableToArrayLimit(arr, i) || $d5236a2f272f8223$var$_unsupportedIterableToArray(arr, i) || $d5236a2f272f8223$var$_nonIterableRest();
}
function $d5236a2f272f8223$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $d5236a2f272f8223$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $d5236a2f272f8223$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $d5236a2f272f8223$var$_arrayLikeToArray(o, minLen);
}
function $d5236a2f272f8223$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $d5236a2f272f8223$var$_iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function $d5236a2f272f8223$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function $d5236a2f272f8223$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $d5236a2f272f8223$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $d5236a2f272f8223$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $d5236a2f272f8223$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $d5236a2f272f8223$var$_defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function $d5236a2f272f8223$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
var $d5236a2f272f8223$var$Tokenizer = /*#__PURE__*/ function() {
    function Tokenizer(template) {
        $d5236a2f272f8223$var$_classCallCheck(this, Tokenizer);
        $d5236a2f272f8223$var$_defineProperty(this, "TOKEN_TYPES", $1vc03.TOKEN_TYPES);
        this.tokens = [];
        this.template = template;
        this.code = this.template.code;
    }
    $d5236a2f272f8223$var$_createClass(Tokenizer, [
        {
            key: "parse",
            value: function parse() {
                var code = this.code;
                var lastToken = undefined;
                while(code){
                    code = code.trim();
                    var token = undefined;
                    if ((0, $agEb9.isTextNode)(code) && this.isMaybeNextText(lastToken)) {
                        var _this$parseTextNode = this.parseTextNode(code);
                        var _this$parseTextNode2 = $d5236a2f272f8223$var$_slicedToArray(_this$parseTextNode, 2);
                        token = _this$parseTextNode2[0];
                        code = _this$parseTextNode2[1];
                    } else if ((0, $agEb9.isOpenTag)(code)) {
                        var _this$parseOpenTag = this.parseOpenTag(code);
                        var _this$parseOpenTag2 = $d5236a2f272f8223$var$_slicedToArray(_this$parseOpenTag, 2);
                        token = _this$parseOpenTag2[0];
                        code = _this$parseOpenTag2[1];
                    } else if ((0, $agEb9.isEndOfOpenTag)(code) && this.isMaybeNextAttribute(lastToken)) {
                        var _this$parseEndOfOpenT = this.parseEndOfOpenTag(code);
                        var _this$parseEndOfOpenT2 = $d5236a2f272f8223$var$_slicedToArray(_this$parseEndOfOpenT, 2);
                        token = _this$parseEndOfOpenT2[0];
                        code = _this$parseEndOfOpenT2[1];
                    } else if ((0, $agEb9.isAttribute)(code) && this.isMaybeNextAttribute(lastToken)) {
                        var _this$parseAttribute = this.parseAttribute(code);
                        var _this$parseAttribute2 = $d5236a2f272f8223$var$_slicedToArray(_this$parseAttribute, 2);
                        token = _this$parseAttribute2[0];
                        code = _this$parseAttribute2[1];
                    } else if ((0, $agEb9.isCloseOfPairTag)(code)) {
                        var _this$parseCloseTag = this.parseCloseTag(code);
                        var _this$parseCloseTag2 = $d5236a2f272f8223$var$_slicedToArray(_this$parseCloseTag, 2);
                        token = _this$parseCloseTag2[0];
                        code = _this$parseCloseTag2[1];
                    }
                    if (typeof token !== "undefined") {
                        this.tokens.push(token);
                        lastToken = token;
                    } else {
                        console.error(this.tokens);
                        throw new Error(code);
                    }
                }
                this.code = code;
                return this.tokens;
            }
        },
        {
            key: "parseEndOfOpenTag",
            value: function parseEndOfOpenTag(code) {
                var re = /^(\/?>)/;
                var matches = code.match(re);
                var token = this.createToken(this.TOKEN_TYPES.END_OF_TAG);
                if (!matches) return [
                    token,
                    code
                ];
                var textNode = matches[1];
                if (textNode.length) {
                    code = code.slice(textNode.length);
                    token.value = textNode;
                }
                if (/^\/>/.test(textNode)) token.type = this.TOKEN_TYPES.END_OF_SINGLE_TAG;
                return [
                    token,
                    code
                ];
            }
        },
        {
            key: "parseAttribute",
            value: function parseAttribute(code) {
                var re = /([\w\d]+=)("[\w\d_\-=#{}().: ]+"|{[\w\d_\-=#().: "']+})(\s|\/?)>?/i;
                var matches = code.match(re);
                var token = this.createToken(this.TOKEN_TYPES.ATTRIBUTE);
                if (!matches) return [
                    token,
                    code
                ];
                var textNode = matches[1] + matches[2];
                if (textNode.length) {
                    code = code.slice(textNode.length);
                    token.value = textNode;
                }
                return [
                    token,
                    code
                ];
            }
        },
        {
            key: "parseCloseTag",
            value: function parseCloseTag(code) {
                var re = /^(<\/[a-z\d]+>)/i;
                var matches = code.match(re);
                var token = this.createToken(this.TOKEN_TYPES.CLOSE_TAG);
                if (!matches) return [
                    token,
                    code
                ];
                var textNode = matches[1];
                if (textNode.length) {
                    code = code.slice(textNode.length);
                    token.value = textNode;
                }
                return [
                    token,
                    code
                ];
            }
        },
        {
            key: "parseOpenTag",
            value: function parseOpenTag(code) {
                var re = /^(<[a-z\d]+)(\s|>)/i;
                var matches = code.match(re);
                var token = this.createToken(this.TOKEN_TYPES.START_OF_TAG);
                if (!matches) return [
                    token,
                    code
                ];
                var textNode = matches[1];
                if (textNode.length) {
                    code = code.slice(textNode.length);
                    token.value = textNode;
                }
                return [
                    token,
                    code
                ];
            }
        },
        {
            key: "parseTextNode",
            value: function parseTextNode(code) {
                var re = /^([_\n\w\d\sа-я?!.,:{}()[\]'"]+|{[_\n\w\d\sа-я?!.,:{}()[\]'"]+}\s+)</i;
                var matches = code.match(re);
                var token = this.createToken(this.TOKEN_TYPES.TEXT_NODE);
                if (!matches) return [
                    token,
                    code
                ];
                var textNode = matches[1];
                if (textNode.length) {
                    code = code.slice(textNode.length);
                    token.value = textNode.trim();
                }
                return [
                    token,
                    code
                ];
            }
        },
        {
            key: "createToken",
            value: function createToken(type) {
                return {
                    type: type,
                    value: ""
                };
            }
        },
        {
            key: "isMaybeNextAttribute",
            value: function isMaybeNextAttribute(lastToken) {
                switch(lastToken === null || lastToken === void 0 ? void 0 : lastToken.type){
                    case this.TOKEN_TYPES.START_OF_TAG:
                    case this.TOKEN_TYPES.ATTRIBUTE:
                        return true;
                    default:
                        return false;
                }
            }
        },
        {
            key: "isMaybeNextText",
            value: function isMaybeNextText(lastToken) {
                switch(lastToken === null || lastToken === void 0 ? void 0 : lastToken.type){
                    case this.TOKEN_TYPES.CLOSE_TAG:
                    case this.TOKEN_TYPES.END_OF_SINGLE_TAG:
                    case this.TOKEN_TYPES.END_OF_TAG:
                        return true;
                    default:
                        return false;
                }
            }
        }
    ]);
    return Tokenizer;
}();
module.exports["default"] = $d5236a2f272f8223$var$Tokenizer;

});
parcelRequire.register("agEb9", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.isAttribute = $510fd552298dd2bb$var$isAttribute;
module.exports.isCloseOfPairTag = $510fd552298dd2bb$var$isCloseOfPairTag;
module.exports.isComponent = $510fd552298dd2bb$var$isComponent;
module.exports.isEndOfOpenTag = $510fd552298dd2bb$var$isEndOfOpenTag;
module.exports.isOpenTag = $510fd552298dd2bb$var$isOpenTag;
module.exports.isTextNode = $510fd552298dd2bb$var$isTextNode;
module.exports.isTextNodeHasLogic = $510fd552298dd2bb$var$isTextNodeHasLogic;
module.exports.isTextNodeHasVars = $510fd552298dd2bb$var$isTextNodeHasVars;
function $510fd552298dd2bb$var$isTextNode(code) {
    return /^([_\n\w\d\sа-я?!.,:{}()[\]'"]+|{[_\n\w\d\sа-я?!.,:{}()[\]'"]+}\s+)</i.test(code.trim());
}
function $510fd552298dd2bb$var$isOpenTag(code) {
    return /^<[a-z]/i.test(code);
}
function $510fd552298dd2bb$var$isEndOfOpenTag(code) {
    return /^\/?>/.test(code);
}
function $510fd552298dd2bb$var$isCloseOfPairTag(code) {
    return /^<\//.test(code);
}
function $510fd552298dd2bb$var$isComponent(code) {
    return /^<[A-Z]+/.test(code);
}
function $510fd552298dd2bb$var$isAttribute(code) {
    return /^\w+[\w\d-_]=/i.test(code);
}
function $510fd552298dd2bb$var$isTextNodeHasVars(code) {
    return /{ ?[a-z._\s\d]+ ?}/i.test(code);
}
function $510fd552298dd2bb$var$isTextNodeHasLogic(code) {
    return /^{ ?\[?[`"'a-z]/i.test(code);
}

});

parcelRequire.register("1vc03", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.TOKEN_TYPES = void 0;
var $3d0cf4718a87e74c$var$TOKEN_TYPES = {
    START_OF_TAG: "START_OF_TAG",
    END_OF_TAG: "END_OF_TAG",
    END_OF_SINGLE_TAG: "END_OF_SINGLE_TAG",
    CLOSE_TAG: "CLOSE_TAG",
    ATTRIBUTE: "ATTRIBUTE",
    TEXT_NODE: "TEXT_NODE"
};
module.exports.TOKEN_TYPES = $3d0cf4718a87e74c$var$TOKEN_TYPES;

});


parcelRequire.register("6PWqD", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $1vc03 = parcelRequire("1vc03");

var $agEb9 = parcelRequire("agEb9");

var $1PXWC = parcelRequire("1PXWC");
function $8aa66dcdd6756aa6$var$_toArray(arr) {
    return $8aa66dcdd6756aa6$var$_arrayWithHoles(arr) || $8aa66dcdd6756aa6$var$_iterableToArray(arr) || $8aa66dcdd6756aa6$var$_unsupportedIterableToArray(arr) || $8aa66dcdd6756aa6$var$_nonIterableRest();
}
function $8aa66dcdd6756aa6$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $8aa66dcdd6756aa6$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function $8aa66dcdd6756aa6$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function $8aa66dcdd6756aa6$var$_createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = $8aa66dcdd6756aa6$var$_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it["return"] != null) it["return"]();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function $8aa66dcdd6756aa6$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $8aa66dcdd6756aa6$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $8aa66dcdd6756aa6$var$_arrayLikeToArray(o, minLen);
}
function $8aa66dcdd6756aa6$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $8aa66dcdd6756aa6$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $8aa66dcdd6756aa6$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $8aa66dcdd6756aa6$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $8aa66dcdd6756aa6$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $8aa66dcdd6756aa6$var$_defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
var $8aa66dcdd6756aa6$var$Tree = /*#__PURE__*/ function() {
    function Tree(tokens) {
        $8aa66dcdd6756aa6$var$_classCallCheck(this, Tree);
        this.tokens = tokens;
    }
    $8aa66dcdd6756aa6$var$_createClass(Tree, [
        {
            key: "generate",
            value: function generate() {
                var _tagStack$at, _tagStack$at2, _tagStack$at3;
                var tree = [];
                var treeNode = {
                    name: "template",
                    type: $1PXWC.NODE_TYPE.TEMPLATE,
                    children: tree,
                    attributes: []
                };
                var tagStack = []; // const meta = { lastNode: treeNode };
                tagStack.push(treeNode);
                var _iterator = $8aa66dcdd6756aa6$var$_createForOfIteratorHelper(this.tokens), _step;
                try {
                    for(_iterator.s(); !(_step = _iterator.n()).done;){
                        var token = _step.value;
                        var node = void 0;
                        switch(token.type){
                            case $1vc03.TOKEN_TYPES.TEXT_NODE:
                                node = this.createTextNode(token);
                                (_tagStack$at = tagStack.at(-1)) === null || _tagStack$at === void 0 || _tagStack$at.children.push(node);
                                break;
                            case $1vc03.TOKEN_TYPES.ATTRIBUTE:
                                node = this.createAttributeNode(token);
                                (_tagStack$at2 = tagStack.at(-1)) === null || _tagStack$at2 === void 0 || _tagStack$at2.attributes.push(node);
                                break;
                            case $1vc03.TOKEN_TYPES.CLOSE_TAG:
                                tagStack.pop();
                                break;
                            case $1vc03.TOKEN_TYPES.END_OF_SINGLE_TAG:
                                tagStack.pop();
                                break;
                            case $1vc03.TOKEN_TYPES.END_OF_TAG:
                                break;
                            case $1vc03.TOKEN_TYPES.START_OF_TAG:
                                node = this.createTagNode(token);
                                (_tagStack$at3 = tagStack.at(-1)) === null || _tagStack$at3 === void 0 || _tagStack$at3.children.push(node);
                                tagStack.push(node);
                                break;
                            default:
                                throw new Error("invalid token ".concat(token.type));
                        } // meta.lastNode = node;
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally{
                    _iterator.f();
                }
                return treeNode;
            }
        },
        {
            key: "createTagNode",
            value: function createTagNode(token) {
                var tag = token.value.slice(1);
                var type = /^[A-Z]/.test(tag) ? $1PXWC.NODE_TYPE.COMPONENT : $1PXWC.NODE_TYPE.HTML_ELEMENT;
                return {
                    type: type,
                    name: tag,
                    attributes: [],
                    children: []
                };
            }
        },
        {
            key: "createAttributeNode",
            value: function createAttributeNode(token) {
                var _token$value$split = token.value.split("="), _token$value$split2 = $8aa66dcdd6756aa6$var$_toArray(_token$value$split), name = _token$value$split2[0], attrValueChunks = _token$value$split2.slice(1);
                var value = attrValueChunks.join("=");
                return {
                    name: name,
                    value: value,
                    smart: /^{/.test(value)
                };
            }
        },
        {
            key: "createTextNode",
            value: function createTextNode(token) {
                var value = token.value.trim();
                if ((0, $agEb9.isTextNodeHasVars)(value)) value = value.replace(/({ ?[a-z._\s\d()]+ ?})/i, "$$$1");
                else if ((0, $agEb9.isTextNodeHasLogic)(value)) return this.createFragmentNode(token);
                value = "`".concat(value, "`");
                return {
                    type: $1PXWC.NODE_TYPE.TEXT_NODE,
                    content: value
                };
            }
        },
        {
            key: "createFragmentNode",
            value: function createFragmentNode(token) {
                return {
                    type: $1PXWC.NODE_TYPE.FRAGMENT,
                    content: "(() => ".concat(token.value.trim().slice(1, -1), ")()")
                };
            }
        }
    ]);
    return Tree;
}();
module.exports["default"] = $8aa66dcdd6756aa6$var$Tree;

});
parcelRequire.register("1PXWC", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.NODE_TYPE = void 0;
var $295f508c3bfe10ef$var$NODE_TYPE = {
    TEMPLATE: "TEMPLATE",
    FRAGMENT: "FRAGMENT",
    TEXT_NODE: "TEXT_NODE",
    HTML_ELEMENT: "HTML_ELEMENT",
    COMPONENT: "COMPONENT"
};
module.exports.NODE_TYPE = $295f508c3bfe10ef$var$NODE_TYPE;

});


parcelRequire.register("icFnW", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $1PXWC = parcelRequire("1PXWC");
function $e81c517acd0c9239$var$_createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = $e81c517acd0c9239$var$_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it["return"] != null) it["return"]();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function $e81c517acd0c9239$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $e81c517acd0c9239$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $e81c517acd0c9239$var$_arrayLikeToArray(o, minLen);
}
function $e81c517acd0c9239$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $e81c517acd0c9239$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $e81c517acd0c9239$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $e81c517acd0c9239$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $e81c517acd0c9239$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $e81c517acd0c9239$var$_defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
var $e81c517acd0c9239$var$CodeGenerator = /*#__PURE__*/ function() {
    function CodeGenerator(tree) {
        $e81c517acd0c9239$var$_classCallCheck(this, CodeGenerator);
        this.tree = tree;
    }
    $e81c517acd0c9239$var$_createClass(CodeGenerator, [
        {
            key: "generate",
            value: function generate() {
                return this.generateNode(this.tree);
            }
        },
        {
            key: "generateNodes",
            value: function generateNodes(children) {
                var childrenCode = [];
                var _iterator = $e81c517acd0c9239$var$_createForOfIteratorHelper(children), _step;
                try {
                    for(_iterator.s(); !(_step = _iterator.n()).done;){
                        var child = _step.value;
                        childrenCode.push(this.generateNode(child));
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally{
                    _iterator.f();
                }
                return "[".concat(childrenCode.join(",\n"), "]");
            }
        },
        {
            key: "generateNode",
            value: function generateNode(node) {
                var code;
                switch(node.type){
                    case $1PXWC.NODE_TYPE.TEMPLATE:
                    case $1PXWC.NODE_TYPE.COMPONENT:
                    case $1PXWC.NODE_TYPE.HTML_ELEMENT:
                        code = this.generateElement(node);
                        break;
                    case $1PXWC.NODE_TYPE.TEXT_NODE:
                        code = this.createTextElement(node);
                        break;
                    case $1PXWC.NODE_TYPE.FRAGMENT:
                        code = this.createElement({
                            element: "'template'",
                            attributes: "null",
                            children: node.content
                        });
                        break;
                    default:
                        throw Error("unknown node.type ".concat(node));
                }
                return code;
            }
        },
        {
            key: "generateElement",
            value: function generateElement(node) {
                var element = $1PXWC.NODE_TYPE.COMPONENT === node.type ? node.name : "\"".concat(node.name, "\"");
                var attributes = this.createAttributes(node.attributes);
                var children = node.children ? this.generateNodes(node.children) : "null";
                return this.createElement({
                    element: element,
                    attributes: attributes !== null && attributes !== void 0 ? attributes : "null",
                    children: children
                });
            }
        },
        {
            key: "createAttributes",
            value: function createAttributes(attributes) {
                if (!attributes || !attributes.length) return null;
                var code = [];
                var _iterator2 = $e81c517acd0c9239$var$_createForOfIteratorHelper(attributes), _step2;
                try {
                    for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
                        var attr = _step2.value;
                        var value = attr.smart ? attr.value.slice(1, -1) : attr.value;
                        code.push("".concat(attr.name, ": ").concat(value));
                    }
                } catch (err) {
                    _iterator2.e(err);
                } finally{
                    _iterator2.f();
                }
                return "\n    {\n       ".concat(code.join(",\n"), "\n    }");
            }
        },
        {
            key: "createTextElement",
            value: function createTextElement(node) {
                return "document.createTextNode(".concat(node.content, ")");
            }
        },
        {
            key: "createElement",
            value: function createElement(_ref) {
                var element = _ref.element, attributes = _ref.attributes, children = _ref.children;
                return "\n    Templator.createElement(\n        ".concat(element, ", \n        ").concat(attributes, ", \n        ").concat(children, "\n    )");
            }
        }
    ]);
    return CodeGenerator;
}();
module.exports["default"] = $e81c517acd0c9239$var$CodeGenerator;

});

"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
Object.defineProperty(module.exports, "parse", {
    enumerable: true,
    get: function get() {
        return $dad363e19ed00b2e$exports.parse;
    }
});
var $dad363e19ed00b2e$exports = {};
"use strict";
Object.defineProperty($dad363e19ed00b2e$exports, "__esModule", {
    value: true
});
$dad363e19ed00b2e$exports.parse = $dad363e19ed00b2e$var$parse;
var $6cc9f4031074e45b$exports = {};
"use strict";
Object.defineProperty($6cc9f4031074e45b$exports, "__esModule", {
    value: true
});
$6cc9f4031074e45b$exports.parseTemplates = $6cc9f4031074e45b$var$parseTemplates;

var $agEb9 = parcelRequire("agEb9");
function $6cc9f4031074e45b$var$parseTemplates(code) {
    var templateRegexp = /<\/?>/;
    var templates = [];
    var lastTemplate;
    var offset = 0;
    var matches;
    while(matches = code.slice(offset).match(templateRegexp)){
        var _matches$index;
        if (!matches) break;
        var tag = matches[0];
        var isClose = (0, $agEb9.isCloseOfPairTag)(tag);
        var matchIndex = (_matches$index = matches.index) !== null && _matches$index !== void 0 ? _matches$index : 0;
        if (isClose && lastTemplate) {
            lastTemplate.endIndex = offset + matchIndex;
            lastTemplate.endIndexWithTag = offset + matchIndex + tag.length;
            lastTemplate.code = code.slice(lastTemplate.startIndexWithTag, lastTemplate.endIndex).trim();
            lastTemplate.key = "{{{===".concat(templates.length, "===}}}");
            code = code.slice(0, lastTemplate.startIndex) + lastTemplate.key + code.slice(lastTemplate.endIndexWithTag);
            offset = 0;
            continue;
        }
        lastTemplate = {
            startIndex: offset + matchIndex,
            startIndexWithTag: offset + matchIndex + tag.length
        };
        templates.push(lastTemplate);
        offset += matchIndex + tag.length;
    }
    return [
        code,
        templates
    ];
}



var $dad363e19ed00b2e$var$_tokenizer = $dad363e19ed00b2e$var$_interopRequireDefault((parcelRequire("gio3e")));

var $dad363e19ed00b2e$var$_treeGenerator = $dad363e19ed00b2e$var$_interopRequireDefault((parcelRequire("6PWqD")));

var $dad363e19ed00b2e$var$_codeGenerator = $dad363e19ed00b2e$var$_interopRequireDefault((parcelRequire("icFnW")));
function $dad363e19ed00b2e$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $dad363e19ed00b2e$var$_createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = $dad363e19ed00b2e$var$_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e2) {
                    throw _e2;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e3) {
            didErr = true;
            err = _e3;
        },
        f: function f() {
            try {
                if (!normalCompletion && it["return"] != null) it["return"]();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function $dad363e19ed00b2e$var$_slicedToArray(arr, i) {
    return $dad363e19ed00b2e$var$_arrayWithHoles(arr) || $dad363e19ed00b2e$var$_iterableToArrayLimit(arr, i) || $dad363e19ed00b2e$var$_unsupportedIterableToArray(arr, i) || $dad363e19ed00b2e$var$_nonIterableRest();
}
function $dad363e19ed00b2e$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $dad363e19ed00b2e$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $dad363e19ed00b2e$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $dad363e19ed00b2e$var$_arrayLikeToArray(o, minLen);
}
function $dad363e19ed00b2e$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $dad363e19ed00b2e$var$_iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function $dad363e19ed00b2e$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function $dad363e19ed00b2e$var$parse(raw) {
    var _parseTemplates = (0, $6cc9f4031074e45b$exports.parseTemplates)(raw), _parseTemplates2 = $dad363e19ed00b2e$var$_slicedToArray(_parseTemplates, 2), _code = _parseTemplates2[0], templates = _parseTemplates2[1];
    var code = _code;
    var _iterator = $dad363e19ed00b2e$var$_createForOfIteratorHelper(templates), _step;
    try {
        for(_iterator.s(); !(_step = _iterator.n()).done;){
            var _template$key;
            var template = _step.value;
            var tokenizer = new $dad363e19ed00b2e$var$_tokenizer["default"](template);
            var tokens = tokenizer.parse();
            var treeGenerator = new $dad363e19ed00b2e$var$_treeGenerator["default"](tokens);
            var tree = treeGenerator.generate();
            var codeGenerator = new $dad363e19ed00b2e$var$_codeGenerator["default"](tree);
            var templateCode = codeGenerator.generate();
            code = code.replace((_template$key = template.key) !== null && _template$key !== void 0 ? _template$key : "", templateCode);
        }
    } catch (err) {
        _iterator.e(err);
    } finally{
        _iterator.f();
    }
    return code;
} /**
 * text node
 * start open tag
 * attribute name="" or name={}
 * end open tag or end singled tag
 * closed tag
 */ 




//# sourceMappingURL=index.js.map
