import {AbstractComponent} from "../AbstractComponent";
import template from "./template.hbs";

export class Form extends AbstractComponent {
    render() {
        return template(this.props);
    }
}
