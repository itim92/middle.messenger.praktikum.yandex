import { Component } from "@/lib/templator";
import template from "./template.tpl";
import { chatController } from "@/controllers/ChatController";

type Props = {
    fieldValue: string;
};

class ChatCreate extends Component<Props> {
    createChat() {
        const title = this.props.fieldValue;

        chatController.createChat(title);
    }

    onFieldBlur(event) {
        const fieldValue = event.target.value.trim();

        this.setProps({
            fieldValue,
        });
    }

    render() {
        return template({
            ...this.props,
            onCreateChat: this.createChat.bind(this),
            onFieldBlur: this.onFieldBlur.bind(this),
        });
    }
}

export default ChatCreate;
