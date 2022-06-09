import { Component } from "@/lib/templator";
import { FormElementType } from "@/components/Form";
import {
    FormElementEventHandlerType,
    FormEventHandlerType,
} from "@/components/Form/types";
import template from "./template.tpl";

type EditPropsType = {
    submit: string;
    elements: FormElementType[];
    onSubmit: FormEventHandlerType;
    onFieldBlur: FormElementEventHandlerType;
    onFieldChange: FormElementEventHandlerType;
    cancelEdit: CallableFunction;
};

export class Edit extends Component<EditPropsType> {
    render() {
        return template({ ...this.props });
    }
}
