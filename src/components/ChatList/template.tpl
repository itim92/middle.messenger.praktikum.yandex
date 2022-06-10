import { ChatListItem } from "./ChatListItem";

export default function template({ chats }) {



    const getChatListItems = () => {
        return chats.map((chat) => {
            return (
                <>
                    <ChatListItem chat={chat} />
                </>
            )
        })
    }
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
