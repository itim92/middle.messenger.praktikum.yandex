import { Component } from "@/lib/templator";
import template from "./template.tpl";
import { User } from "@/shared/types/User";
import { Chat as ChatType } from "@/shared/types/Chat";
import withChat from "@/store/helpers/withChat";
import { Message } from "@/shared/types/Message";
import { validatorService } from "@/services/Validator";
import { chatController } from "@/controllers/ChatController";
import { Nullable } from "@/shared/types/Nullable";

type Props = {
    currentChatUsers?: User[];
    currentChat: ChatType;
    messages: Message[];
    onFindedUserClick?: (event: MouseEvent, chat: Chat) => void;
};

export class Chat extends Component<Props> {
    get messageField() {
        return this.element.querySelector(
            "input[name='message']"
        ) as Nullable<HTMLInputElement>;
    }

    get errorMessageElement() {
        return this.element.querySelector(
            ".new-message-input-wrapper .new-message-input-error"
        ) as Nullable<HTMLElement>;
    }

    onMessageSend(event: PointerEvent) {
        event.preventDefault();
        const isValid = this.validateMessage();

        if (isValid) {
            this.hideError();
        } else {
            this.showError();
        }

        const message = this.messageField?.value;
        if (!message) {
            return;
        }

        chatController.sendMessage(message);
    }

    hideError() {
        const errorMessageElement = this.errorMessageElement;
        const messageField = this.messageField;

        if (!errorMessageElement || !messageField) {
            console.error(
                "Проблема в верстке приложения, обратитесь к разработчикам"
            );
        }

        messageField.classList.remove("with-error");
        errorMessageElement.style.display = "none";
    }

    showError() {
        const errorMessageElement = this.errorMessageElement;
        const messageField = this.messageField;

        if (!errorMessageElement || !messageField) {
            console.error(
                "Проблема в верстке приложения, обратитесь к разработчикам"
            );
        }

        messageField.classList.add("with-error");
        errorMessageElement.style.display = "block";
    }

    validateMessage() {
        const messageField = this.messageField;

        if (!messageField) {
            console.error(
                "Проблема в верстке приложения, обратитесь к разработчикам"
            );
        }

        const message = messageField.value;
        return validatorService.isValidMessage(message);
    }

    render() {
        let { currentChatUsers } = this.props;
        currentChatUsers = currentChatUsers ?? [];

        return template({
            ...this.props,
            currentChatUsers,
            onMessageSend: this.onMessageSend.bind(this),
        });
    }
}

export default withChat(Chat as typeof Component);
