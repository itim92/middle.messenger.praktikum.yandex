import { FormElementType } from "@/components/Form";

const elements: FormElementType[] = [
    {
        label: "Логин",
        name: "login",
        type: "text",
        value: "",
        errorMessage: "",
    },
    {
        label: "Пароль",
        name: "password",
        type: "password",
        value: "",
        errorMessage: "",
    },
];

export default elements;
