import "./styles.less";
import template from "./template.hbs";
import {AbstractComponent} from "../../components/AbstractComponent";
import {Form} from "../../components/Form";

export class RegisterPage extends AbstractComponent {

    get form() {
        return new Form({
            elements: [
                {
                    label: "E-mail",
                    name: "email"
                },
                {
                    label: "Логин",
                    name: "login"
                },
                {
                    label: "Имя",
                    name: "first_name"
                },
                {
                    label: "Фамилия",
                    name: "second_name"
                },
                {
                    label: "Телефон",
                    name: "phone"
                },
                {
                    label: "Пароль",
                    name: "password"
                },
                {
                    label: "Повторите пароль",
                    name: "password_repeat"
                },
            ],
            submit: {
                value: "Зарегистрироваться"
            }
        });
    }

    render() {
        let html = template(this.props);
        return html.replace("<Form />", this.form.render());
    }
}
