import template from "./template.tpl";
import { Component } from "@/lib/templator";

type PropsType = {
    goToEdit: CallableFunction;
};

export class Base extends Component<PropsType> {
    render() {
        return template({ ...this.props });
    }
}
