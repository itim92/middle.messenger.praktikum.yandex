export const FormElementValidators = {
    EMAIL: "email",
    NAME: "name",
    PHONE: "phone",
    PASSWORD: "password",
    LOGIN: "login",
} as const;

export type FormElementValidatorType =
    typeof FormElementValidators[keyof typeof FormElementValidators];
