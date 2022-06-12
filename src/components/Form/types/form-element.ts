export type FormElementType = {
    name: string;
    label: string;
    type: "text" | "password" | "file";
    value: string;
    errorMessage?: string;
};
