import { Component } from "../../templator";
import template from "./template.hbs";

export class Header extends Component {
    render() {
        return template(this.props);
    }
}
