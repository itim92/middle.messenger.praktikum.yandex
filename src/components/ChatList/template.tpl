import { ChatListItem } from "./ChatListItem";

export default function template({ chats, currentChat, onChatClick }) {
    const getChatListItems = () => {
        chats = chats ?? [];
        return chats.map((chat) => {
            const isActive = chat.id === currentChat?.id;

            return (
                <>
                    <ChatListItem chat={chat} isActive={isActive} onCLick={onChatClick} />
                </>
            );
        });
    };

    return (
        <>
            <div className="chat-list-wrapper">
                <div className="inner">
                    {getChatListItems()}
                </div>
            </div>
        </>
    );
}
