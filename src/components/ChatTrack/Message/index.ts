import { Component } from "../../../templator";
import { MessageModel } from "./model";
import template from "./template.hbs";

type Props = MessageModel;

export class Message extends Component<Props> {
    render() {
        return template(this.props);
    }
}
