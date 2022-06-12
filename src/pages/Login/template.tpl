import { Form } from "@/components/Form";
import { Link } from "@/router";

export default function template({
    elements,
    submit,
    onFieldBlur,
    onSubmit
}) {
    const link = "/sign-up";
    const title = `Зарегистрироваться`;
    return (
        <>
            <div className="page-login">
                <div className="header">
                    <div className="title">Вход</div>
                </div>
                <div className="content">
                    <Form elements={elements} submit={submit} onSubmit={onSubmit}
                          onFieldBlur={onFieldBlur} />
                    <div className="register-link">
                        <Link to={link} title={title} />
                    </div>
                </div>
            </div>
        </>
    );
}
