import { Component } from "@/lib/templator";
import template from "./template.tpl";
import { Chat } from "@/shared/types/Chat";

type PropsType = {
    onCLick?: (event: MouseEvent, chat: Chat) => void;
    chat: Chat;
    isActive: boolean;
};

type TItemClass = "active" | "";

export class ChatListItem extends Component<PropsType> {
    onClick(event: MouseEvent) {
        if (typeof this.props.onCLick === "function") {
            this.props.onCLick(event, this.props.chat);
        }
    }

    render() {
        const { isActive } = this.props;
        const appendedClass: TItemClass = isActive ? "active" : "";
        const itemClassName = `chat-item ${appendedClass}`;

        return template({
            ...this.props,
            itemClassName,
            onClick: this.onClick.bind(this),
        });
    }
}
