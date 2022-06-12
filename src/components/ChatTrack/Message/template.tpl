export default function template( { message, user } ) {
    let messageItemClassName = message?.user_id === user?.id ? "mine" : "";
    messageItemClassName = `message-item ${messageItemClassName}`;

    return (
        <>
            <div className={messageItemClassName}>
                <div className="text">{message.content}</div>
                <div className="time">{message.time}</div>
            </div>
        </>
    )
}
