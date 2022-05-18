import { Component } from "../../templator";
import template from "./template.hbs";
import {
    FormElementEventHandlerType,
    FormElementType,
    FormEventHandlerType,
    FormValuesType,
} from "./types";
import { InputPassword, InputText } from "./fields";
import { TextInputPropsType } from "./fields/InputText";

type PropsType = {
    elements: FormElementType[];
    submit: string;
    onSubmit?: FormEventHandlerType;
    onFieldChange?: FormElementEventHandlerType;
    onFieldFocus?: FormElementEventHandlerType;
    onFieldBlur?: FormElementEventHandlerType;
};

export class Form extends Component<PropsType> {
    readonly events = {
        "submit form": this.onSubmit.bind(this),
    };

    _getFormData(form: HTMLFormElement): FormValuesType {
        const values: FormValuesType = {};
        const formData = new FormData(form);

        for (const entry of formData.entries()) {
            const [key, value] = entry;
            values[key] = value;
        }

        return values;
    }

    onSubmit(event: FormDataEvent) {
        event.preventDefault();

        if (typeof this.props.onSubmit !== "function") {
            return;
        }

        const form = event.target as HTMLFormElement;
        const values = this._getFormData(form);

        console.log(values);
        this.props.onSubmit(event, { values, component: this });
    }

    getFields() {
        const formFields: Component[] = this.props.elements.map((element) => {
            const props: TextInputPropsType = {
                element,
                onFocus: this.props.onFieldFocus,
                onBlur: this.props.onFieldBlur,
                onChange: this.props.onFieldChange,
            };
            if (element.value) {
                props.currentValue = element.value;
            }
            switch (element.type) {
                case "password":
                    return new InputPassword(props);
                case "text":
                default:
                    return new InputText(props);
            }
        });

        return formFields;
    }

    inject() {
        return [
            {
                selector: "[data-fields]",
                component: this.getFields(),
            },
        ];
    }

    render() {
        return template(this.props);
    }
}
