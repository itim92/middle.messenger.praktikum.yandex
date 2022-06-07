import "./styles.less";
import template from "./template.tpl";
import { Component } from "@/lib/templator";

export class ErrorPage extends Component {
    render() {
        return template(this.props);
    }
}
