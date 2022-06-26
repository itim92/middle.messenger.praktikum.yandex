import { Avatar } from "../Avatar";
import { ChatTrack } from "../ChatTrack";
import { SearchUser } from "../SearchUser";

export default function template({
    onMessageSend,
    chat,
    onFindedUserClick,
    currentChatUsers,
    messages
}) {
    const currentChatUsersList = () => {
        return currentChatUsers.map((user) => {
            return (
                <>
                    <span className="chat-user-item">{user.login}</span>
                </>
            );
        });
    };

    return (
        <>
            <div className="header">
                <div className="chat-info">
                    <Avatar src={chat.avatar} width={"44"} />
                    <div className="title">{chat.title}</div>
                </div>
                <div className="chat-users">
                    <div className="title">Пользователи в чате:</div>
                    <div className="users">{currentChatUsersList()}</div>
                </div>
                <div className="add-user-to-chat">
                    <SearchUser onFindedUserClick={onFindedUserClick} />
                </div>
            </div>
            <ChatTrack messages={messages} />
            <div className="new-message-form">
                <div className="new-message-input-wrapper">
                    <input className="new-message-input" type="text" name="message"  />
                    <div className="new-message-input-error hidden">
                        Поле для сообщения не может быть пустым
                    </div>
                </div>
                <span className="btn send" onClick={onMessageSend}>Отправить</span>
            </div>
        </>
    );
}
