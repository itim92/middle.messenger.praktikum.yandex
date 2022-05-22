export type FormElementType = {
    name: string;
    label: string;
    type: "text" | "password";
    value: string;
    errorMessage?: string;
};
