import { Component } from "@/lib/templator";
import template from "./template.tpl";
import { Message } from "@/shared/types/Message";

type PropsType = {
    messages: Message[];
};

export class ChatTrack extends Component<PropsType> {
    render() {
        return template({ ...this.props });
    }
}
