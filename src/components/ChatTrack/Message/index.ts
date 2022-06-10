import { Component } from "@/lib/templator";
import { MessageModel } from "./model";
import template from "./template.tpl";

type Props = {
    message: MessageModel;
};

export class Message extends Component<Props> {
    render() {
        return template({ ...this.props.message });
    }
}
