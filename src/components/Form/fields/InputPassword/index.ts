import { Component } from "../../../../templator";
import { InputText, TextInputPropsType } from "../InputText";

export class InputPassword extends Component<TextInputPropsType> {
    constructor(
        props: TextInputPropsType = {} as TextInputPropsType,
        tagName = "div",
        className = ""
    ) {
        super(props, tagName, className);
        this.props.element.type = "password";

        return new InputText(this.props);
    }
}
