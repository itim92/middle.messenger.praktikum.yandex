export default function template({
    name,
    label,
    type,
    currentValue,
    errorMessage,
    inputClassName,
    onBlur,
    onFocus,
    onChange
}) {
    const errorMessageElement = () => {
        if (errorMessage) {
            return [
                <>
                    <div className="form-element-error">{errorMessage}</div>
                </>
            ];
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
                    value={currentValue}
                    className={inputClassName}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                />
                {errorMessageElement()}
            </label>
        </>
    );
}
