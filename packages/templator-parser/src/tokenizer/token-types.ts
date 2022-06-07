export const TOKEN_TYPES = {
    START_OF_TAG: "START_OF_TAG",
    END_OF_TAG: "END_OF_TAG",
    END_OF_SINGLE_TAG: "END_OF_SINGLE_TAG",
    CLOSE_TAG: "CLOSE_TAG",
    ATTRIBUTE: "ATTRIBUTE",
    TEXT_NODE: "TEXT_NODE",
} as const;

export type OneOfTokenTypes = typeof TOKEN_TYPES[keyof typeof TOKEN_TYPES];
