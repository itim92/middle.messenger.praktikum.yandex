import { Component } from "@/lib/templator";
import template from "./template.tpl";
import noAvatarImage from "@/shared/img/user.svg";

type PropsType = {
    src: string;
    width: string;
};

export class Avatar extends Component<PropsType> {
    render() {
        const { src } = this.props;
        const avatarUrl = src
            ? `https://ya-praktikum.tech/api/v2/resources${src}`
            : noAvatarImage;

        return template({
            ...this.props,
            avatarUrl,
        });
    }
}
