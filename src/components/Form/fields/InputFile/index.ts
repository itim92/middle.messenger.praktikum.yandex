import { InputText, TextInputPropsType } from "../InputText";
import template from "@/components/Form/fields/InputText/template.tpl";

export class InputFile extends InputText {
    constructor(props: TextInputPropsType = {} as TextInputPropsType) {
        super(props);
        this.props.element.type = "file";
    }

    render() {
        return template({
            ...this.props.element,
        });
    }
}
