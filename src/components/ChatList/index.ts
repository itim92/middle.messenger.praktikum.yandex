import { Component } from "../../templator";
import template from "./template.hbs";
import chats from "../../pages/Chat/json/chats.json";
import { ChatListItem } from "./ChatListItem";

export class ChatList extends Component {
    get chatListItems() {
        const chatListItems = [];
        for (const item of chats) {
            chatListItems.push(new ChatListItem(item));
        }

        return chatListItems;
    }

    inject() {
        return [
            {
                selector: "[data-chat-list-items]",
                component: this.chatListItems,
            },
        ];
    }

    render() {
        return template({ ...this.props });
    }
}
