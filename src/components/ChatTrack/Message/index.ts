import { Component } from "@/lib/templator";
import { MessageModel } from "./model";
import template from "./template.tpl";
import store from "@/store";

type Props = {
    message: MessageModel;
};

export class Message extends Component<Props> {
    render() {
        const { user } = store.getState();
        return template({ ...this.props, user });
    }
}
