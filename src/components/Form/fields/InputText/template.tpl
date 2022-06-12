export default function template({
    name,
    label,
    type,
    errorMessage,
}) {
    const inputClassName = errorMessage ? " with-error" : "";
    const errorMessageElement = () => {
        if (errorMessage) {
            return [1].map(() => (
                <>
                    <div className="form-element-error">{errorMessage}</div>
                </>
            ));
        }

        return null;
    };

    return (
        <>
            <label className="form-element">
                <div className="form-element-label">{label}</div>
                <input
                    type={type}
                    name={name}
                    className={inputClassName}
                />
                {errorMessageElement()}
            </label>
        </>
    );
}
