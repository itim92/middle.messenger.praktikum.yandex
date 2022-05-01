import {AbstractComponent} from "../AbstractComponent";
import template from "./template.hbs";
import noAvatarImage from "../../shared/img/user.svg";

export class Avatar extends AbstractComponent {
    render() {
        return template({
            ...this.props,
            noAvatarImage
        });
    }
}
