import { FormElementType } from "@/components/Form";

const elements: FormElementType[] = [
    {
        label: "Старый пароль",
        name: "oldPassword",
        type: "password",
        value: "",
        errorMessage: "",
        validator: "password",
    },
    {
        label: "Новый пароль",
        name: "newPassword",
        type: "password",
        value: "",
        errorMessage: "",
        validator: "password",
    },
];

export default elements;
