import { Component } from "../../../../templator";
import template from "./template.hbs";
import { FormElementType, FormElementEventHandlerType } from "../../types";

export type TextInputPropsType = {
    currentValue?: string;
    element: FormElementType;
    onChange?: FormElementEventHandlerType;
    onFocus?: FormElementEventHandlerType;
    onBlur?: FormElementEventHandlerType;
    errorMessage?: string;
};

export class InputText extends Component<TextInputPropsType> {
    currentValue = "";

    readonly events = {
        "blur input": this.onBlur.bind(this),
        "focus input": this.onFocus.bind(this),
        "change input": this.onChange.bind(this),
    };

    constructor(props: TextInputPropsType) {
        super(props);

        this.currentValue =
            this.props.currentValue ?? this.props.element.value ?? "";
    }

    onChange(event: FormDataEvent) {
        event.preventDefault();
        const target = event.target as HTMLFormElement;

        this.currentValue = target.value;

        if (typeof this.props.onChange !== "function") {
            return;
        }
        this.props.onChange(event, {
            component: this,
            element: this.props.element,
            name: target.name,
            value: (target.value as string) ?? "",
        });
    }

    onBlur(event: FormDataEvent) {
        event.preventDefault();

        if (typeof this.props.onBlur !== "function") {
            return;
        }

        const target = event.target as HTMLFormElement;
        this.props.onBlur(event, {
            component: this,
            element: this.props.element,
            name: target.name,
            value: (target.value as string) ?? "",
        });
    }

    onFocus(event: FormDataEvent) {
        event.preventDefault();

        if (typeof this.props.onFocus !== "function") {
            return;
        }

        const target = event.target as HTMLFormElement;
        this.props.onFocus(event, {
            component: this,
            element: this.props.element,
            name: target.name,
            value: (target.value as string) ?? "",
        });
    }

    render() {
        const currentValue =
            this.currentValue ??
            this.props.currentValue ??
            this.props.element.value ??
            "";

        return template({ ...this.props, currentValue });
    }
}
