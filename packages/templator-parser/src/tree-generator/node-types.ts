export const NODE_TYPE = {
    TEMPLATE: "TEMPLATE",
    FRAGMENT: "FRAGMENT",
    TEXT_NODE: "TEXT_NODE",
    HTML_ELEMENT: "HTML_ELEMENT",
    COMPONENT: "COMPONENT",
} as const;

export type OneOfNodeTypes = typeof NODE_TYPE[keyof typeof NODE_TYPE];
