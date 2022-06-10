import { Component } from "@/lib/templator";
import template from "./template.tpl";
import { ChatListItemType } from "@/components/ChatList/types/ChatListItemType";

// {
//     "username": "Светлана",
//     "lastMessage": {
//     "datetime": "15:04",
//         "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At et obcaecati officia saepe veritatis? Ad, non, veritatis! Aspernatur consequatur doloribus id magnam officiis suscipit voluptate? Dolorem facere quas quasi voluptates."
// }
// },

type Props = {
    chats: ChatListItemType[];
};

export class ChatList extends Component<Props> {
    render() {
        return template({ ...this.props});
    }
}
