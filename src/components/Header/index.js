import {AbstractComponent} from "../AbstractComponent";
import template from "./template.hbs";

export class Header extends AbstractComponent {
    render() {
        return template(this.props);
    }
}
