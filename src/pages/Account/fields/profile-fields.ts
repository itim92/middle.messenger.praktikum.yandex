import { FormElementType } from "@/components/Form";

const elements: FormElementType[] = [
    {
        label: "E-mail",
        name: "email",
        type: "text",
        value: "",
        errorMessage: "",
        validator: "email",
    },
    {
        label: "Логин",
        name: "login",
        type: "text",
        value: "",
        errorMessage: "",
        validator: "login",
    },
    {
        label: "Имя",
        name: "first_name",
        type: "text",
        value: "",
        errorMessage: "",
        validator: "name",
    },
    {
        label: "Фамилия",
        name: "second_name",
        type: "text",
        value: "",
        errorMessage: "",
        validator: "name",
    },
    {
        label: "Имя в чате",
        name: "display_name",
        type: "text",
        value: "",
        errorMessage: "",
        validator: "login",
    },
    {
        label: "Телефон",
        name: "phone",
        type: "text",
        value: "",
        errorMessage: "",
        validator: "phone",
    },
];

export default elements;
