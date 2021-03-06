import { Form, FormElementType } from "@/components/Form";
import { validatorService } from "@/services/Validator";
import { Component, DefaultPropsType } from "@/lib/templator";
import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "@/components/Form/types";
import template from "./template.tpl";
import elements from "./fields";
import { SignUpParams } from "@/services/api/AuthService/types";
import { authController } from "@/controllers/AuthController";

type PropsType = {
    elements: FormElementType[];
    onSubmit?: FormEventHandlerType;
    onFieldFocus?: FormElementEventHandlerType;
    onFieldBlur?: FormElementEventHandlerType;
} & DefaultPropsType;

export class RegisterPage extends Component<PropsType> {
    onSubmit: FormEventHandlerType = (_event: FormDataEvent, { values }) => {
        const fieldsErrorsStack = [];
        for (const key in values) {
            const value = values[key];
            const element = elements.find((e) => e.name === key);

            if (element) {
                const errorMessage = this.validateField(key, value?.toString());
                element.errorMessage = errorMessage;
                fieldsErrorsStack.push(Boolean(errorMessage));
            }
        }

        const isFormHasError = fieldsErrorsStack.some((i) => i);
        if (!isFormHasError) {
            authController.signUp(values as SignUpParams).then((result) => {
                if (result !== true && typeof result === "string") {
                    alert(result);
                }
            });
        }

        this.setProps({ elements });
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

        return result ? "" : "?????????? ???? ????????????????";
    }

    validatePassword(value: string, name: string): string {
        const result = validatorService.isValidPassword(value);
        if (result) {
            return "";
        }

        return name === "first_name"
            ? "???????????????????????? ????????????"
            : "???????????????????????? ???????????? ????????????";
    }

    validateEmail(value: string): string {
        const result = validatorService.isValidEmail(value);

        return result ? "" : "Email ???? ????????????????";
    }

    validateName(value: string, name: string): string {
        const result = validatorService.isValidName(value);
        if (result) {
            return "";
        }

        return name === "first_name"
            ? "?????? ???? ????????????????"
            : "?????????????? ???? ????????????????";
    }

    validatePhone(value: string): string {
        const result = validatorService.isValisPhone(value);

        return result ? "" : "?????????????? ???? ????????????????";
    }

    get form() {
        return new Form({
            submit: "????????????????????????????",
            elements: this.props.elements,
            onSubmit: this.props.onSubmit,
            onFieldFocus: this.props.onFieldFocus,
            onFieldBlur: this.props.onFieldBlur,
        });
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
            submit: "????????????????????????????",
            onSubmit: (event, payload) => this.onSubmit(event, payload),
            onFieldBlur: (event, payload) => this.onFieldBlur(event, payload),
        } as TemplateProps);
    }
}
