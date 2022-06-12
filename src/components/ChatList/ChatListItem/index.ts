import { Component } from "@/lib/templator";
import template from "./template.tpl";
import noAvatarImage from "../../../shared/img/user.svg";
import { Chat } from "@/shared/types/Chat";

type PropsType = {
    onCLick?: (event: MouseEvent, chat: Chat) => void;
    chat: Chat;
    isActive: boolean;
};

export class ChatListItem extends Component<PropsType> {
    onClick(event: MouseEvent) {
        if (typeof this.props.onCLick === "function") {
            this.props.onCLick(event, this.props.chat);
        }
    }

    render() {
        return template({
            ...this.props,
            noAvatarImage,
            onClick: this.onClick.bind(this),
        });
    }
}
