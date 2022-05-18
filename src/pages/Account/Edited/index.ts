import template from "./template.hbs";
import { Component } from "../../../templator";
import { Avatar } from "../../../components/Avatar";
import { Form, FormElementType } from "../../../components/Form";
import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "../../../components/Form/types";

type PropsType = {
    elements: FormElementType[];
    onSubmit?: FormEventHandlerType;
    onFieldChange?: FormElementEventHandlerType;
    onFieldFocus?: FormElementEventHandlerType;
    onFieldBlur?: FormElementEventHandlerType;
};

export class EditedAccountPage extends Component<PropsType> {
    get form() {
        return new Form({
            submit: "Сохранить",
            elements: this.props.elements,
            onSubmit: this.props.onSubmit,
            onFieldFocus: this.props.onFieldFocus,
            onFieldBlur: this.props.onFieldBlur,
            onFieldChange: this.props.onFieldChange,
        });
    }

    inject() {
        return [
            {
                selector: "[data-avatar]",
                component: new Avatar({ name: "Сергей" }),
            },
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
