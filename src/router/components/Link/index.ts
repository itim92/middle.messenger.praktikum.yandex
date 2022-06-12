import template from "./template.tpl";
import { Component } from "@/lib/templator";
import { Router } from "@/router";

type Props = {
    to: string;
    title: string;
};

export class Link extends Component<Props> {
    getDefaultTagName(): string {
        return "span";
    }

    onClick(event: MouseEvent) {
        event.preventDefault();
        new Router().go(this.props.to);
    }

    render() {
        return template({ ...this.props, onClick: this.onClick.bind(this) });
    }
}
