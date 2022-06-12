import {
    isAttribute,
    isCloseOfPairTag,
    isEndOfOpenTag,
    isOpenTag,
    isTextNode,
} from "../util";
import { TemplateType } from "../types/TemplateType";
import { TokenType } from "../types/TokenType";
import { OneOfTokenTypes, TOKEN_TYPES } from "./token-types";

export default class Tokenizer {
    TOKEN_TYPES = TOKEN_TYPES;

    private readonly tokens: TokenType[];
    private template: TemplateType;
    private code: string | undefined;

    constructor(template: TemplateType) {
        this.tokens = [];
        this.template = template;
        this.code = this.template.code;
    }

    parse() {
        let code = this.code;
        let lastToken: TokenType | undefined = undefined;

        while (code) {
            code = code.trim();
            let token: TokenType | undefined = undefined;
            if (isTextNode(code) && this.isMaybeNextText(lastToken)) {
                [token, code] = this.parseTextNode(code);
            } else if (isOpenTag(code)) {
                [token, code] = this.parseOpenTag(code);
            } else if (
                isEndOfOpenTag(code) &&
                this.isMaybeNextAttribute(lastToken)
            ) {
                [token, code] = this.parseEndOfOpenTag(code);
            } else if (
                isAttribute(code) &&
                this.isMaybeNextAttribute(lastToken)
            ) {
                [token, code] = this.parseAttribute(code);
            } else if (isCloseOfPairTag(code)) {
                [token, code] = this.parseCloseTag(code);
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

    parseEndOfOpenTag(code: string): [TokenType, string] {
        const re = /^(\/?>)/;
        const matches = code.match(re);

        const token = this.createToken(this.TOKEN_TYPES.END_OF_TAG);

        if (!matches) {
            return [token, code];
        }

        const textNode = matches[1];

        if (textNode.length) {
            code = code.slice(textNode.length);
            token.value = textNode;
        }

        if (/^\/>/.test(textNode)) {
            token.type = this.TOKEN_TYPES.END_OF_SINGLE_TAG;
        }

        return [token, code];
    }

    parseAttribute(code: string): [TokenType, string] {
        const re =
            /([\w\d]+=)("[\w\d_\-=#{}().: ]+"|{[\w\d_\-=#().: "']+})(\s|\/?)>?/i;
        const matches = code.match(re);

        const token = this.createToken(this.TOKEN_TYPES.ATTRIBUTE);

        if (!matches) {
            return [token, code];
        }

        const textNode = matches[1] + matches[2];

        if (textNode.length) {
            code = code.slice(textNode.length);
            token.value = textNode;
        }

        return [token, code];
    }

    parseCloseTag(code: string): [TokenType, string] {
        const re = /^(<\/[a-z\d]+>)/i;
        const matches = code.match(re);

        const token = this.createToken(this.TOKEN_TYPES.CLOSE_TAG);

        if (!matches) {
            return [token, code];
        }

        const textNode = matches[1];

        if (textNode.length) {
            code = code.slice(textNode.length);
            token.value = textNode;
        }

        return [token, code];
    }

    parseOpenTag(code: string): [TokenType, string] {
        const re = /^(<[a-z\d]+)(\s|>)/i;
        const matches = code.match(re);

        const token = this.createToken(this.TOKEN_TYPES.START_OF_TAG);

        if (!matches) {
            return [token, code];
        }

        const textNode = matches[1];

        if (textNode.length) {
            code = code.slice(textNode.length);
            token.value = textNode;
        }

        return [token, code];
    }

    parseTextNode(code: string): [TokenType, string] {
        const re =
            /^([_\n\w\d\sа-я?!.,:{}()[\]'"]+|{[_\n\w\d\sа-я?!.,:{}()[\]'"]+}\s+)</i;
        const matches = code.match(re);

        const token = this.createToken(this.TOKEN_TYPES.TEXT_NODE);

        if (!matches) {
            return [token, code];
        }

        const textNode = matches[1];

        if (textNode.length) {
            code = code.slice(textNode.length);
            token.value = textNode.trim();
        }

        return [token, code];
    }

    createToken(type: OneOfTokenTypes): TokenType {
        return { type, value: "" };
    }

    isMaybeNextAttribute(lastToken?: TokenType) {
        switch (lastToken?.type) {
            case this.TOKEN_TYPES.START_OF_TAG:
            case this.TOKEN_TYPES.ATTRIBUTE:
                return true;
            default:
                return false;
        }
    }

    isMaybeNextText(lastToken?: TokenType) {
        switch (lastToken?.type) {
            case this.TOKEN_TYPES.CLOSE_TAG:
            case this.TOKEN_TYPES.END_OF_SINGLE_TAG:
            case this.TOKEN_TYPES.END_OF_TAG:
                return true;
            default:
                return false;
        }
    }
}
