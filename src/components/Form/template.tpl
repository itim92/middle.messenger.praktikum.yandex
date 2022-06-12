import { InputPassword, InputText, InputFile } from "@/components/Form/fields";

export default function template({
    getFields,
    submit,
    onSubmit
}) {
    const renderField = ({
        element,
        onFocus,
        onBlur,
        onChange
    }) => {
        let Component;
        switch (element.type) {
            case "password":
                Component = InputPassword;
            case "file":
                Component = InputFile;
            case "text":
            default:
                Component = InputText;
        }

        return (
            <>
                <Component element={element} onFocus={onFocus} onBlur={onBlur}
                           onChange={onChange} />
            </>
        );
    };

    return (
        <>
            <form className="chat-base-form" autoComplete="off" onSubmit={onSubmit}>
                {getFields()
                    .map(renderField)}
                <div className="submit-wrapper">
                    <input type="submit" value={submit} />
                </div>
            </form>
        </>
    );
}

