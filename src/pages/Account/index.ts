import template from "./template.tpl";
import "./styles.less";
import { Component } from "@/lib/templator";
import { FormElementType } from "@/components/Form";
import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "@/components/Form/types";
import { validatorService } from "@/services/Validator";
import profileFormElements from "./fields/profile-fields";
import avatarFormElements from "./fields/avatar-fields";
import passwordFormElements from "./fields/password-fields";

import { userController } from "@/controllers/UserController";
import { ProfileParams } from "@/services/Api/UserService/types";
import {
    FormElementValidators,
    FormElementValidatorType,
} from "@/components/Form/types/form-validators";

type PropsType = {
    profileFormElements: FormElementType[];
    passwordFormElements: FormElementType[];
    onSubmit?: FormEventHandlerType;
    onFieldChange?: FormElementEventHandlerType;
    onFieldFocus?: FormElementEventHandlerType;
    onFieldBlur?: FormElementEventHandlerType;
    isEdit: boolean;
};

export class AccountPage extends Component<PropsType> {
    onSubmitChangePassword: FormEventHandlerType = (
        _event: FormDataEvent,
        { values }
    ) => {
        const fieldsErrorsStack = [];
        for (const key in values) {
            const value = values[key];
            const element = passwordFormElements.find(
                (e: FormElementType) => e.name === key
            );
            element.value = value?.toString();

            if (element && element.validator) {
                const errorMessage = this.validateField(
                    element.validator,
                    key,
                    value?.toString()
                );
                element.errorMessage = errorMessage;
                fieldsErrorsStack.push(Boolean(errorMessage));
            }
        }

        const isFormHasError = fieldsErrorsStack.some((i) => i);
        if (!isFormHasError) {
            userController
                .updatePassword(values as ProfileParams)
                .then((result) => {
                    if (typeof result === "string" && result != "OK") {
                        alert(result);
                    } else {
                        this.setProps({ isEdit: false });
                    }
                });
        }

        this.setProps({ passwordFormElements });
    };

    onSubmitChangeAvatar: FormEventHandlerType = (event: FormDataEvent) => {
        const formData = new FormData(event.target as HTMLFormElement);
        userController.updateAvatar(formData).then((result) => {
            if (typeof result === "string" && result != "OK") {
                alert(result);
            } else {
                this.setProps({ isEdit: false });
            }
        });
    };

    onSubmitChangeProfile: FormEventHandlerType = (
        _event: FormDataEvent,
        { values }
    ) => {
        const fieldsErrorsStack = [];
        for (const key in values) {
            const value = values[key];
            const element = profileFormElements.find((e) => e.name === key);
            element.value = value?.toString();

            if (element && element.validator) {
                const errorMessage = this.validateField(
                    element.validator,
                    key,
                    value?.toString()
                );
                if (key === "display_name" && !value) {
                    continue;
                }

                element.errorMessage = errorMessage;
                fieldsErrorsStack.push(Boolean(errorMessage));
            }
        }

        const isFormHasError = fieldsErrorsStack.some((i) => i);
        if (!isFormHasError) {
            userController
                .updateProfile(values as ProfileParams)
                .then((result) => {
                    if (typeof result === "string") {
                        alert(result);
                    } else {
                        this.setProps({ isEdit: false });
                    }
                });
        }

        this.setProps({ profileFormElements });
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
        const ignoredNames = ["display_name", "oldPassword", "newPassword"];
        if (!element.validator || (ignoredNames.includes(name) && !value)) {
            return;
        }

        element.errorMessage = this.validateField(
            element.validator,
            name,
            value?.toString()
        );
        component.setProps({ element });
    };

    validateField(
        validatorType: FormElementValidatorType,
        name: string,
        value: string
    ) {
        let errorMessage = "";

        switch (validatorType) {
            case FormElementValidators.EMAIL:
                errorMessage = this.validateEmail(value);
                break;
            case FormElementValidators.NAME:
                errorMessage = this.validateName(value, name);
                break;
            case FormElementValidators.PHONE:
                errorMessage = this.validatePhone(value);
                break;
            case FormElementValidators.PASSWORD:
                errorMessage = this.validatePassword(value);
                break;
            case FormElementValidators.LOGIN:
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

    validatePassword(value: string): string {
        const result = validatorService.isValidPassword(value);

        return result ? "" : "Пароль не валидный";
    }

    goToEdit() {
        this.setProps({ isEdit: true });
    }

    cancelEdit() {
        this.setProps({ isEdit: false });
    }

    render() {
        type TemplateProps = {
            submit: string;
            profileFormElements: FormElementType[];
            avatarFormElements: FormElementType[];
            passwordFormElements: FormElementType[];
            onSubmitChangeProfile: FormEventHandlerType;
            onSubmitChangeAvatar: FormEventHandlerType;
            onSubmitChangePassword: FormEventHandlerType;
            onFieldBlur: FormElementEventHandlerType;
            onFieldChange: FormElementEventHandlerType;
            goToEdit: CallableFunction;
            cancelEdit: CallableFunction;
        };

        return template({
            isEdit: this.props.isEdit,
            submit: "Сохранить",
            profileFormElements,
            avatarFormElements,
            passwordFormElements,
            onSubmitChangeProfile: (event, payload) =>
                this.onSubmitChangeProfile(event, payload),
            onSubmitChangeAvatar: (event, payload) =>
                this.onSubmitChangeAvatar(event, payload),
            onSubmitChangePassword: (event, payload) =>
                this.onSubmitChangePassword(event, payload),
            onFieldBlur: (event, payload) => this.onFieldBlur(event, payload),
            onFieldChange: (event, payload) =>
                this.onFieldChange(event, payload),
            goToEdit: this.goToEdit.bind(this),
            cancelEdit: this.cancelEdit.bind(this),
        } as TemplateProps);
    }
}
