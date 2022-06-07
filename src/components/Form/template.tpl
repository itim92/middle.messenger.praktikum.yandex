import { InputText, TextInputPropsType } from "./fields/InputText/index.js";
import { InputPassword } from "./fields/index.js";

export default function template() {

    return (
        <>
            <form className="chat-base-form" autoComplete="off">
                <span data-fields></span>
                <div className="submit-wrapper">
                    <input type="submit" value="{{ submit }}" />
                </div>
            </form>
        </>
    );
}

function fields({
    element,
    onFocus,
    onBlur,
    onChange
}) {
    const formFields: Component[] = this.props.elements.map((element) => {
        const props: TextInputPropsType = {
            element,
            onFocus: this.props.onFieldFocus,
            onBlur: this.props.onFieldBlur,
            onChange: this.props.onFieldChange
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

}
}

