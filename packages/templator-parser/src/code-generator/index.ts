import { NODE_TYPE } from "../tree-generator/node-types";
import {
    AttributeOfNodeType,
    NodeType,
    TagNodeType,
    TextNodeType,
} from "../types/NodeType";

export default class CodeGenerator {
    private readonly tree: NodeType;

    constructor(tree: NodeType) {
        this.tree = tree;
    }

    generate(): string {
        return this.generateNode(this.tree);
    }

    generateNodes(children: NodeType[]): string {
        const childrenCode: string[] = [];

        for (const child of children) {
            childrenCode.push(this.generateNode(child));
        }

        return `[${childrenCode.join(",\n")}]`;
    }

    generateNode(node: NodeType): string {
        let code;

        switch (node.type) {
            case NODE_TYPE.TEMPLATE:
            case NODE_TYPE.COMPONENT:
            case NODE_TYPE.HTML_ELEMENT:
                code = this.generateElement(node);
                break;
            case NODE_TYPE.TEXT_NODE:
                code = this.createTextElement(node);
                break;
            case NODE_TYPE.FRAGMENT:
                code = this.createElement({
                    element: "'template'",
                    attributes: "null",
                    children: node.content,
                });
                break;
            default:
                throw Error(`unknown node.type ${node}`);
        }

        return code;
    }

    generateElement(node: TagNodeType): string {
        const element =
            NODE_TYPE.COMPONENT === node.type ? node.name : `"${node.name}"`;
        const attributes = this.createAttributes(node.attributes);
        const children = node.children
            ? this.generateNodes(node.children)
            : `null`;

        return this.createElement({
            element,
            attributes: attributes ?? "null",
            children,
        });
    }

    createAttributes(attributes: AttributeOfNodeType[]): string {
        if (!attributes || !attributes.length) {
            return null;
        }

        const code = [];
        for (const attr of attributes) {
            const value = attr.smart ? attr.value.slice(1, -1) : attr.value;

            code.push(`${attr.name}: ${value}`);
        }

        return `
    {
       ${code.join(",\n")}
    }`;
    }

    createTextElement(node: TextNodeType): string {
        return `document.createTextNode(${node.content})`;
    }

    createElement({
        element,
        attributes,
        children,
    }: {
        element: string;
        attributes: string | "null";
        children: string;
    }): string {
        return `
    Templator.createElement(
        ${element}, 
        ${attributes}, 
        ${children}
    )`;
    }
}
