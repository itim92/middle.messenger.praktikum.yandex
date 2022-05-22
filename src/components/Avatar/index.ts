import { Component } from "../../templator";
import template from "./template.hbs";
import noAvatarImage from "./../../shared/img/user.svg";

type PropsType = {
    name: string;
};

export class Avatar extends Component<PropsType> {
    render() {
        return template({
            ...this.props,
            noAvatarImage,
        });
    }
}
