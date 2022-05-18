import { IController } from "../IController";
import { Component } from "../../templator";
import { RegisterPage } from "../../pages/Register";
import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "../../components/Form/types";

import { validatorService } from "../../services/Validator";
import elements from "./fields";

export class RegisterController implements IController {
    readonly view: Component;

    constructor() {
        const onFieldBlur = this.onFieldBlur;
        const onSubmit = this.onSubmit;
        this.view = new RegisterPage(
            { elements, onFieldBlur, onSubmit },
            "div",
            "container"
        );
    }

    onSubmit: FormEventHandlerType = (_event: FormDataEvent, { values }) => {
        for (const key in values) {
            const value = values[key];
            const element = elements.find((e) => e.name === key);

            if (element) {
                element.errorMessage = this.validateField(
                    key,
                    value?.toString()
                );
            }
        }

        this.view.setProps({ elements });
    };

    onFieldBlur: FormElementEventHandlerType = (
        _event,
        { name, value, component, element }
    ) => {
        element.errorMessage = this.validateField(name, value);
        component.setProps({ element });
    };

    validateField(name: string, value: string) {
        let errorMessage = "";

        switch (name) {
            case "email":
                errorMessage = this.validateEmail(value);
                break;
            case "first_name":
            case "second_name":
                errorMessage = this.validateName(value, name);
                break;
            case "phone":
                errorMessage = this.validatePhone(value);
                break;
            case "login":
                errorMessage = this.validateLogin(value);
                break;
            case "password":
            case "password_repeat":
                errorMessage = this.validatePassword(value, name);
                break;
        }

        return errorMessage;
    }

    validateLogin(value: string): string {
        const result = validatorService.isValidLogin(value);

        return result ? "" : "Логин не валидный";
    }

    validatePassword(value: string, name: string): string {
        const result = validatorService.isValidPassword(value);
        if (result) {
            return "";
        }

        return name === "first_name"
            ? "Некорректный пароль"
            : "Некорректный повтор пароля";
    }

    validateEmail(value: string): string {
        const result = validatorService.isValidEmail(value);

        return result ? "" : "Email не валидный";
    }

    validateName(value: string, name: string): string {
        const result = validatorService.isValidName(value);
        if (result) {
            return "";
        }

        return name === "first_name"
            ? "Имя не валидное"
            : "Фамилия не валидная";
    }

    validatePhone(value: string): string {
        const result = validatorService.isValisPhone(value);

        return result ? "" : "Телефон не валидный";
    }
}
