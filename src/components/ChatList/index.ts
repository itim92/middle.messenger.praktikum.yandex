import { Component } from "@/lib/templator";
import template from "./template.tpl";
import { ChatListItemType } from "@/components/ChatList/types/ChatListItemType";
import { Chat } from "@/shared/types/Chat";
import { chatController } from "@/controllers/ChatController";
import withChat from "@/store/helpers/withChat";

type Props = {
    chats: ChatListItemType[];
    currentChat: Chat;
};

export class ChatList extends Component<Props> {
    onChatClick(_event, chat) {
        chatController.setCurrentChat(chat);
    }

    render() {
        return template({
            ...this.props,
            onChatClick: this.onChatClick.bind(this),
        });
    }
}

export default withChat(ChatList as typeof Component);
