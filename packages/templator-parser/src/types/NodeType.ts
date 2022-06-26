import { OneOfNodeTypes, NODE_TYPE } from "../tree-generator/node-types";

type BaseNodeType = {
    type: OneOfNodeTypes;
};

export type TextNodeType = BaseNodeType & {
    type: typeof NODE_TYPE.TEXT_NODE;
    content: string;
};

export type TagNodeType = BaseNodeType & {
    type:
        | typeof NODE_TYPE.COMPONENT
        | typeof NODE_TYPE.HTML_ELEMENT
        | typeof NODE_TYPE.TEMPLATE;
    name: string;
    attributes: AttributeOfNodeType[];
    children: NodeType[];
};

export type AttributeOfNodeType = {
    name: string;
    value: string;
    smart: boolean;
};

export type FragmentNodeType = {
    type: typeof NODE_TYPE.FRAGMENT;
    content: string;
};

export type NodeType = TextNodeType | TagNodeType | FragmentNodeType;
