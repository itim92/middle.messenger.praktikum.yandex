import { IController } from "../IController";
import { Component } from "../../templator";
import { LoginPage } from "../../pages/Login";
import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "../../components/Form/types";
import { validatorService } from "../../services/Validator";

import elements from "./fields";

export class LoginController implements IController {
    readonly view: Component;

    constructor() {
        const onFieldBlur = this.onFieldBlur;
        const onSubmit = this.onSubmit;
        this.view = new LoginPage(
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
}
