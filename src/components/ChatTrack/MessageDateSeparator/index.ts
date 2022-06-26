import { Component } from "@/lib/templator";
import template from "./template.tpl";

type PropsType = {
    date: string;
};

export class MessageDateSeparator extends Component<PropsType> {
    render() {
        return template({ ...this.props });
    }
}
