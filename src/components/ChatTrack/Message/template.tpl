export default function template( { author_id, text, time } ) {
    let messageItemClassName = author_id ? "" : "mine";
    messageItemClassName = `message-item ${messageItemClassName}`;

    return (
        <>
            <div className={messageItemClassName}>
                <div className="text">{text}</div>
                <div className="time">{time}</div>
            </div>
        </>
    )
}
