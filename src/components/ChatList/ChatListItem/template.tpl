import { Avatar } from "@/components/Avatar";

export default function template({
    chat,
    noAvatarImage,
    onClick,
    isActive = false
}) {

    const itemClassName = "chat-item" + (isActive ? " active" : "");

    return (
        <>
            <div className={itemClassName} onClick={onClick}>
                <Avatar src={chat.avatar} width={44} />
                <div className="item-container">
                    <div className="header">
                        <div className="username">{chat.title}</div>
                        <div className="datetime">{chat?.lastMessage?.datetime}</div>
                    </div>
                    <div className="message">{chat?.lastMessage?.message}</div>
                </div>
            </div>
        </>
    );
}
