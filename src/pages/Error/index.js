import "./styles.less";
import template from "./template.hbs";
import {AbstractComponent} from "../../components/AbstractComponent";

export class ErrorPage extends AbstractComponent {
    render() {
        return template(this.props);
    }
}
