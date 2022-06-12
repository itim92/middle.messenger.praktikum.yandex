import { OneOfTokenTypes } from "../tokenizer/token-types";

export type TokenType = {
    type: OneOfTokenTypes;
    value: string;
};
