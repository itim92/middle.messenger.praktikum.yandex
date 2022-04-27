import {AbstractComponent} from "../AbstractComponent";
import template from "./template.hbs";

export class ChatTrack extends AbstractComponent {
    render() {
        return template(this.props);
    }
}