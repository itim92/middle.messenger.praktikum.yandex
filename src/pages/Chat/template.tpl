import { Avatar } from "../../components/Avatar";
import { ChatTrack } from "../../components/ChatTrack";
import { ChatList } from "../../components/ChatList";

export default function template({
    activeChat,
    chats,
    track
}) {

    return (
        <>
            <div className="page-chat-wrapper">
                <div className="page-header">
                    <div className="profile-link"><a href="#">Профиль</a></div>
                    <div className="chat-search-wrapper">
                        <input type="text" placeholder="Поиск" />
                    </div>
                </div>
                <div className="page-chat">
                    <ChatList chats={chats} />
                    {drawTrackWrapper(track)}
                </div>
            </div>

        </>
    );
}

function drawTrackWrapper(track) {
    return [1].map(() => track ? messageTrack(track) : noActiveChat());
}

function noActiveChat() {
    return (
        <>
            <div className="content empty">
                <div className="message">Выберите чат, чтобы отправить свое сообщение</div>
            </div>
        </>
    );
}

function messageTrack(track) {
    const name = "Светлана";
    return (
        <>
            <div className="content">
                <div className="header"><Avatar name={name} /></div>
                <ChatTrack track={track} />
                <div className="new-message-form">
                    <span className="btn attach">Прикрепить</span>
                    <div className="new-message-input-wrapper">
                        <input className="new-message-input" type="text" name="message" />
                        <div className="new-message-input-error">
                            Поле для сообщения не может быть пустым
                        </div>
                    </div>
                    <span className="btn send">Отправить</span>
                </div>
            </div>
        </>
    );
}
