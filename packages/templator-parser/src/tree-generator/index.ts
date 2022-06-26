import { TOKEN_TYPES } from "../tokenizer/token-types";
import { isTextNodeHasLogic, isTextNodeHasVars } from "../util";
import { TokenType } from "../types/TokenType";
import { NODE_TYPE } from "./node-types";
import {
    AttributeOfNodeType,
    FragmentNodeType,
    NodeType,
    TagNodeType,
    TextNodeType,
} from "../types/NodeType";

export default class Tree {
    private readonly tokens: TokenType[];

    constructor(tokens: TokenType[]) {
        this.tokens = tokens;
    }

    generate() {
        const tree: NodeType[] = [];
        const treeNode: TagNodeType = {
            name: "template",
            type: NODE_TYPE.TEMPLATE,
            children: tree,
            attributes: [],
        };
        const tagStack: TagNodeType[] = [];
        // const meta = { lastNode: treeNode };

        tagStack.push(treeNode);

        for (const token of this.tokens) {
            let node;
            switch (token.type) {
                case TOKEN_TYPES.TEXT_NODE:
                    node = this.createTextNode(token);
                    tagStack.at(-1)?.children.push(node);

                    break;
                case TOKEN_TYPES.ATTRIBUTE:
                    node = this.createAttributeNode(token);
                    tagStack.at(-1)?.attributes.push(node);

                    break;
                case TOKEN_TYPES.CLOSE_TAG:
                    tagStack.pop();
                    break;
                case TOKEN_TYPES.END_OF_SINGLE_TAG:
                    tagStack.pop();
                    break;
                case TOKEN_TYPES.END_OF_TAG:
                    break;
                case TOKEN_TYPES.START_OF_TAG:
                    node = this.createTagNode(token);

                    tagStack.at(-1)?.children.push(node);
                    tagStack.push(node);
                    break;
                default:
                    throw new Error(`invalid token ${token.type}`);
            }

        }

        return treeNode;
    }

    createTagNode(token: TokenType): TagNodeType {
        const tag = token.value.slice(1);
        const type = /^[A-Z]/.test(tag)
            ? NODE_TYPE.COMPONENT
            : NODE_TYPE.HTML_ELEMENT;

        return {
            type,
            name: tag,
            attributes: [],
            children: [],
        };
    }

    createAttributeNode(token: TokenType): AttributeOfNodeType {
        const [name, ...attrValueChunks] = token.value.split("=");
        const value = attrValueChunks.join("=");

        return {
            name,
            value,
            smart: /^{/.test(value),
        };
    }

    createTextNode(token: TokenType): TextNodeType | FragmentNodeType {
        let value = token.value.trim();

        if (isTextNodeHasVars(value)) {
            value = value.replace(/({ ?[a-z._\s\d()]+ ?})/i, "$$$1");
        } else if (isTextNodeHasLogic(value)) {
            return this.createFragmentNode(token);
        }

        value = `\`${value}\``;

        return {
            type: NODE_TYPE.TEXT_NODE,
            content: value,
        };
    }

    createFragmentNode(token: TokenType): FragmentNodeType {
        return {
            type: NODE_TYPE.FRAGMENT,
            content: `(() => ${token.value.trim().slice(1, -1)})()`,
        };
    }
}
