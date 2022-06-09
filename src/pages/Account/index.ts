import template from "./template.tpl";
import "./styles.less";
import { Component } from "@/lib/templator";
import { FormElementType } from "@/components/Form";
import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "@/components/Form/types";
import { validatorService } from "@/services/Validator";

type PropsType = {
    elements: FormElementType[];
    onSubmit?: FormEventHandlerType;
    onFieldChange?: FormElementEventHandlerType;
    onFieldFocus?: FormElementEventHandlerType;
    onFieldBlur?: FormElementEventHandlerType;
    isEdit: boolean;
};

import accountData from "./data";
import elements from "./fields";

elements.forEach((element) => {
    const name = element.name;
    element.value = (accountData as Record<string, string>)[name] ?? "";
});

export class AccountPage extends Component<PropsType> {
    // get form() {
    //     return new Form({
    //         submit: "Сохранить",
    //         elements: this.props.elements,
    //         onSubmit: this.props.onSubmit,
    //         onFieldFocus: this.props.onFieldFocus,
    //         onFieldBlur: this.props.onFieldBlur,
    //         onFieldChange: this.props.onFieldChange,
    //     });
    // }

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

        this.setProps({ elements });
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

    goToEdit() {
        this.setProps({ isEdit: true });
    }

    cancelEdit() {
        this.setProps({ isEdit: false });
    }

    render() {
        type TemplateProps = {
            name: string;
            submit: string;
            elements: FormElementType[];
            onSubmit: FormEventHandlerType;
            onFieldBlur: FormElementEventHandlerType;
            onFieldChange: FormElementEventHandlerType;
            goToEdit: CallableFunction;
            cancelEdit: CallableFunction;
        };

        return template({
            isEdit: this.props.isEdit,
            name: "Сергей",
            submit: "Сохранить",
            elements,
            onSubmit: (event, payload) => this.onSubmit(event, payload),
            onFieldBlur: (event, payload) => this.onFieldBlur(event, payload),
            onFieldChange: (event, payload) =>
                this.onFieldChange(event, payload),
            goToEdit: this.goToEdit.bind(this),
            cancelEdit: this.cancelEdit.bind(this),
        } as TemplateProps);
    }
}
