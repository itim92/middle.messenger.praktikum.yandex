import template from "./template.tpl";
import { FormElementType } from "@/components/Form";
import { Component, DefaultPropsType } from "@/lib/templator";
import elements from "./fields";

import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "@/components/Form/types";
import { validatorService } from "@/services/Validator";
import { FormElementEventPayloadType } from "@/components/Form/types/form-element-event-handler";
import { authController } from "@/controllers/AuthController";

type PropsType = {
    elements: FormElementType[];
    onSubmit?: FormEventHandlerType;
    onFieldFocus?: FormElementEventHandlerType;
    onFieldBlur?: FormElementEventHandlerType;
} & DefaultPropsType;

export class LoginPage extends Component<PropsType> {
    onSubmit: FormEventHandlerType = (_event: FormDataEvent, { values }) => {
        const fieldsErrorsStack = [];
        for (const key in values) {
            const value = values[key];
            const element = elements.find((e) => e.name === key);
            element.value = value?.toString();

            if (element) {
                const errorMessage = this.validateField(key, value?.toString());
                element.errorMessage = errorMessage;
                fieldsErrorsStack.push(Boolean(errorMessage));
            }
        }

        const isFormHasError = fieldsErrorsStack.some((i) => i);
        if (!isFormHasError) {
            authController
                .login({
                    login: values["login"],
                    password: values["password"],
                })
                .then((result) => {
                    if (typeof result === "string") {
                        alert("Логин и пароль неверные");
                    }
                });
        }

        this.setProps({ elements });
    };

    onFieldBlur: FormElementEventHandlerType = (
        _event: FormDataEvent,
        { name, value, component, element }: FormElementEventPayloadType
    ) => {
        element.errorMessage = this.validateField(name, value);
        component.setProps({ element });
    };

    validateField(name: string, value: string) {
        let errorMessage = "";

        switch (name) {
            case "login":
                errorMessage = this.validateLogin(value);
                break;
            case "password":
                errorMessage = this.validatePassword(value);
                break;
        }

        return errorMessage;
    }

    validateLogin(value: string): string {
        const result = validatorService.isValidLogin(value);

        return result ? "" : "Логин не валидный";
    }

    validatePassword(value: string): string {
        const result = validatorService.isValidPassword(value);

        return result ? "" : "Некорректный пароль";
    }

    render() {
        type TemplateProps = {
            submit: string;
            elements: FormElementType[];
            onSubmit: FormEventHandlerType;
            onFieldBlur: FormElementEventHandlerType;
        };

        return template({
            elements,
            submit: "Авторизоваться",
            onSubmit: (event, payload) => this.onSubmit(event, payload),
            onFieldBlur: (event, payload) => this.onFieldBlur(event, payload),
        } as TemplateProps);
    }
}
