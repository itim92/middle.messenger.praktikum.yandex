import { Component } from "../../../templator";
import template from "./template.hbs";

type PropsType = {
    date: string;
};

export class MessageDateSeparator extends Component<PropsType> {
    render() {
        return template(this.props);
    }
}
