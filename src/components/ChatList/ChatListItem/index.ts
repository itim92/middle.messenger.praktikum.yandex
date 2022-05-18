import { Component } from "../../../templator";
import template from "./template.hbs";
import noAvatarImage from "../../../shared/img/user.svg";

export class ChatListItem extends Component {
    render() {
        return template({ ...this.props, noAvatarImage });
    }
}
