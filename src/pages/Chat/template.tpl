import { ChatList } from "../../components/ChatList";
import ChatCreate from "@/components/ChatCreate";
import Chat from "@/components/Chat";
import { Link } from "@/router";

export default function template({
    chats,
    currentChat,
    onFindedUserClick,
    currentChatUsers
}) {

    const trackWrapperData = {
        chat: currentChat,
        onFindedUserClick,
        currentChatUsers
    };

    const accountLink = {
        url: "/settings",
        title: "Профиль"
    };

    return (
        <>
            <div className="page-chat-wrapper">
                <Link to={accountLink.url} title={accountLink.title} />
                <div className="page-chat">
                    <div className="left-sidebar">
                        <ChatCreate fieldValue={""} />
                        <ChatList chats={chats} currentChat={currentChat} />
                    </div>
                    {drawTrackWrapper(trackWrapperData)}
                </div>
            </div>
        </>);
}

function drawTrackWrapper({
    chat,
    onFindedUserClick,
    currentChatUsers
}) {
    return [1].map(() => chat ? messageTrack({
        chat,
        onFindedUserClick,
        currentChatUsers
    }) : noActiveChat());
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

function messageTrack({
    chat,
    onFindedUserClick,
    currentChatUsers
}) {
    return (
        <>
            <Chat className="content" chat={chat} currentChatUsers={currentChatUsers}
                  onFindedUserClick={onFindedUserClick} />
        </>
    );
}
