import { InputText, TextInputPropsType } from "../InputText";

export class InputPassword extends InputText {
    constructor(props: TextInputPropsType = {} as TextInputPropsType) {
        super(props);
        this.props.element.type = "password";
    }
}
