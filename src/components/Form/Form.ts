import { Component } from "@/lib/templator";
import template from "./template.tpl";
import {
    FormElementEventHandlerType,
    FormElementType,
    FormEventHandlerType,
    FormValuesType,
} from "./types";
import { InputText, TextInputPropsType } from "./fields/InputText";
import { InputFile, InputPassword } from "@/components/Form/fields";
import { FormElementVariations } from "@/components/Form/types/form-element";

type PropsType = {
    elements: FormElementType[];
    submit: string;
    onSubmit?: FormEventHandlerType;
    onFieldChange?: FormElementEventHandlerType;
    onFieldFocus?: FormElementEventHandlerType;
    onFieldBlur?: FormElementEventHandlerType;
};

export class Form extends Component<PropsType> {
    _getFormData(form: HTMLFormElement): FormValuesType {
        const values: FormValuesType = {};
        const formData = new FormData(form);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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

        this.props.onSubmit(event, { values, component: this });
    }

    getFieldComponentClass(element: FormElementType): typeof Component {
        let Component;
        switch (element.type) {
            case FormElementVariations.PASSWORD:
                Component = InputPassword;
                break;
            case FormElementVariations.FILE:
                Component = InputFile;
                break;
            case FormElementVariations.TEXT:
            default:
                Component = InputText;
        }

        return Component;
    }

    getFields() {
        return this.props.elements.map((element) => {
            const props: TextInputPropsType = {
                Component: this.getFieldComponentClass(element),
                element,
                onFocus: this.props.onFieldFocus,
                onBlur: this.props.onFieldBlur,
                onChange: this.props.onFieldChange,
            };
            if (element.value) {
                props.currentValue = element.value;
            }

            return props;
        });
    }

    render() {
        return template({
            getFields: this.getFields.bind(this),
            onSubmit: this.onSubmit.bind(this),
            submit: this.props.submit,
        });
    }
}
