import { FormElementValidatorType } from "@/components/Form/types/form-validators";

export const FormElementVariations = {
    TEXT: "text",
    PASSWORD: "password",
    FILE: "file",
} as const;

export type FormElementType = {
    name: string;
    label: string;
    type: typeof FormElementVariations[keyof typeof FormElementVariations];
    value: string;
    errorMessage?: string;
    validator?: FormElementValidatorType;
};
