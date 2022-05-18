import template from "./template.hbs";
import { Form, FormElementType } from "../../components/Form";
import { Component } from "../../templator";
import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "../../components/Form/types";

type PropsType = {
    elements: FormElementType[];
    onSubmit?: FormEventHandlerType;
    onFieldFocus?: FormElementEventHandlerType;
    onFieldBlur?: FormElementEventHandlerType;
};

export class RegisterPage extends Component<PropsType> {
    get form() {
        return new Form({
            submit: "Авторизоваться",
            elements: this.props.elements,
            onSubmit: this.props.onSubmit,
            onFieldFocus: this.props.onFieldFocus,
            onFieldBlur: this.props.onFieldBlur,
        });
    }

    inject() {
        return [
            {
                selector: "[data-form]",
                component: this.form,
            },
        ];
    }

    render() {
        return template(this.props);
    }
}
