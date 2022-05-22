import { Component } from "../../../templator";
import template from "./template.hbs";
import { Avatar } from "../../../components/Avatar";

export class BaseAccountPage extends Component {
    inject() {
        return [
            {
                selector: "[data-avatar]",
                component: new Avatar({ name: "Сергей" }),
            },
        ];
    }

    render() {
        return template(this.props);
    }
}
