import "./styles.less";
import template from "./template.hbs";
import { Component } from "../../templator";

export class ErrorPage extends Component {
    render() {
        return template(this.props);
    }
}
