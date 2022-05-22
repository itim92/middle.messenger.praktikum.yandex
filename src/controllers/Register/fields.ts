import { FormElementType } from "../../components/Form";

const elements: FormElementType[] = [
    {
        label: "E-mail",
        name: "email",
        type: "text",
        value: "",
        errorMessage: "",
    },
    {
        label: "Логин",
        name: "login",
        type: "text",
        value: "",
        errorMessage: "",
    },
    {
        label: "Имя",
        name: "first_name",
        type: "text",
        value: "",
        errorMessage: "",
    },
    {
        label: "Фамилия",
        name: "second_name",
        type: "text",
        value: "",
        errorMessage: "",
    },
    {
        label: "Телефон",
        name: "phone",
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
    {
        label: "Повторите пароль",
        name: "password_repeat",
        type: "password",
        value: "",
        errorMessage: "",
    },
];

export default elements;
