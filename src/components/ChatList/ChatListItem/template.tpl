export default function template({
    username,
    lastMessage,
    noAvatarImage,
    isActive = false
}) {

    const itemClassName = "chat-item" + (isActive ? " active" : "");

    return (
        <>
            <div className={itemClassName}>
                <div className="avatar"><img src={noAvatarImage} alt="no-avatar" /></div>
                <div className="item-container">
                    <div className="header">
                        <div className="username">{username}</div>
                        <div className="datetime">{lastMessage.datetime}</div>
                    </div>
                    <div className="message">{lastMessage.message}</div>
                </div>
            </div>
        </>
    );
}
