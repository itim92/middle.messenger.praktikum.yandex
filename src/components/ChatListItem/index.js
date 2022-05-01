import {AbstractComponent} from "../AbstractComponent";
import template from "./template.hbs";
import noAvatarImage from "../../shared/img/user.svg";

export class ChatListItem extends AbstractComponent {
    render() {
        return template(Object.assign(this.props, {
            noAvatarImage
        }));
    }
}
