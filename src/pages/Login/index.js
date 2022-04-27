import "./styles.less";
import template from "./template.hbs";
import {AbstractComponent} from "../../components/AbstractComponent";
import {Form} from "../../components/Form";

export class LoginPage extends AbstractComponent {

    get form() {
        return new Form({
            elements: [
                {
                    label: "Логин",
                    name: "login"
                },
                {
                    label: "Пароль",
                    name: "password"
                },
            ],
            submit: {
                value: "Авторизоваться"
            }
        });
    }

    render() {
        let html = template(this.props);
        return html.replace("<Form />", this.form.render());
    }
}
