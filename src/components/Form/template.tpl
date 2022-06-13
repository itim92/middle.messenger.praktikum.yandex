import { InputPassword, InputText, InputFile } from "@/components/Form/fields";

export default function template({
    getFields,
    submit,
    onSubmit
}) {
    const renderField = ({
        Component,
        element,
        onFocus,
        onBlur,
        onChange
    }) => {
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

