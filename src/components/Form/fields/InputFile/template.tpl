export default function template({
    name,
    label,
    type,
    currentValue
}) {
    return (
        <>
            <label className="form-element">
                <div className="form-element-label">{label}</div>
                <input
                    type={type}
                    value={currentValue}
                    name={name}
                />
            </label>
        </>
    );
}
