import template from "./template.hbs";
import {AbstractComponent} from "../../../components/AbstractComponent";
import {Avatar} from "../../../components/Avatar";

export class BaseAccountPage extends AbstractComponent {
    get avatar() {
        return new Avatar({
            name: "Сергей"
        });
    }

    render() {
        let html = template(this.props);

        return html.replace("<Avatar />", this.avatar.render());
    }
}
