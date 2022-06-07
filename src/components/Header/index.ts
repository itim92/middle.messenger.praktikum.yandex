import { Component } from "@/lib/templator";
import template from "./template.tpl";
import routes from "@/router/routes";

export class Header extends Component {
    render() {
        return template({ routes });
    }
}
