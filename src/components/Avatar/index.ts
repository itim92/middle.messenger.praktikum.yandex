import { Component } from "@/lib/templator";
import template from "./template.tpl";
import noAvatarImage from "@/shared/img/user.svg";

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
