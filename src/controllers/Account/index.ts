import { IController } from "../IController";
import { Component } from "../../templator";
import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "../../components/Form/types";

import { validatorService } from "../../services/Validator";
import { BaseAccountPage, EditedAccountPage } from "../../pages/Account";
import elements from "./fields";
import accountData from "./data";

elements.forEach((element) => {
    const name = element.name;
    element.value = (accountData as Record<string, string>)[name] ?? "";
});

export class AccountController implements IController {
    readonly view: Component;

    constructor(isEdit = false) {
        const onFieldChange = this.onFieldChange;
        const onFieldBlur = this.onFieldBlur;
        const onSubmit = this.onSubmit;

        if (isEdit) {
            this.view = new EditedAccountPage(
                { elements, onFieldBlur, onSubmit, onFieldChange },
                "div",
                "container fluid"
            );
        } else {
            this.view = new BaseAccountPage({}, "div", "container fluid");
        }
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

    onFieldChange: FormElementEventHandlerType = (
        _event,
        { value, element }
    ) => {
        element.value = value;
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
            case "nickname":
                errorMessage = this.validateLogin(value, name);
                break;
        }

        return errorMessage;
    }

    validateLogin(value: string, name: string): string {
        const result = validatorService.isValidLogin(value);

        if (result) {
            return "";
        }

        return name === "login" ? "Логин не валидный" : "Никнейм не валидный";
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
