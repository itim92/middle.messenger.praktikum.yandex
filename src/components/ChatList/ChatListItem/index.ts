import { Component } from "@/lib/templator";
import template from "./template.tpl";
import noAvatarImage from "../../../shared/img/user.svg";
import { ChatListItemType } from "@/components/ChatList/types/ChatListItemType";

type PropsType = {
    chat: ChatListItemType;
};

export class ChatListItem extends Component<PropsType> {
    render() {
        return template({ ...this.props.chat, noAvatarImage });
    }
}
