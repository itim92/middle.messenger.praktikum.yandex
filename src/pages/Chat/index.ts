import "./styles.less";
import template from "./template.hbs";
import { Component } from "../../templator";
import { Avatar } from "../../components/Avatar";
import { ChatList } from "../../components/ChatList";
import { ChatTrack } from "../../components/ChatTrack";

import chats from "./json/chats.json";
import track from "./json/track.json";
import { validatorService } from "../../services/Validator";

export class ChatPage extends Component {
    events = {
        "click .new-message-form .send": this.onNewMessageSubmit.bind(this),
    };

    get messageField() {
        return this.element.querySelector(
            "input[name='message']"
        ) as HTMLInputElement;
    }

    get errorMessageElement() {
        return this.element.querySelector(
            ".new-message-input-wrapper .new-message-input-error"
        ) as HTMLElement;
    }

    onNewMessageSubmit(event: PointerEvent) {
        event.preventDefault();
        const isValid = this.validateMessage();

        if (isValid) {
            this.hideError();
        } else {
            this.showError();
        }

        console.log({ message: this.messageField.value });
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

    inject() {
        return [
            {
                selector: "[data-component='Avatar']",
                component: new Avatar({ name: "Светлана" }),
            },
            {
                selector: "[data-component='ChatTrack']",
                component: new ChatTrack({ track }),
            },
            {
                selector: "[data-component='ChatList']",
                component: new ChatList({ chats }),
            },
        ];
    }

    render() {
        return template(this.props);
    }
}
