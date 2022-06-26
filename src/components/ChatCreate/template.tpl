export default function template({
    onCreateChat,
    onFieldBlur,
    fieldValue
}) {

    const fieldParams = {
        placeholder: "Создать чат"
    };

    return (
        <>
            <div className="chat-create-wrapper">
                <div className="chat-create-form">
                    <input
                        type="text"
                        value={fieldValue}
                        onBlur={onFieldBlur}
                        placeholder={fieldParams.placeholder}
                    />
                    <button onClick={onCreateChat}>Создать</button>
                </div>
            </div>
        </>
    );
}
