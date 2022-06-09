import { Form } from "@/components/Form";

export default function template({
    elements,
    submit,
    onFieldBlur,
    onSubmit
}) {
    return (
        <>
            <div className="page-register">
                <div className="header">
                    <div className="title">Регистрация</div>
                </div>
                <div className="content">
                    <Form elements={elements} submit={submit} onSubmit={onSubmit}
                          onFieldBlur={onFieldBlur} />
                    <div className="register-link">
                        <a href="#">Войти</a>
                    </div>
                </div>
            </div>
        </>
    );
}
