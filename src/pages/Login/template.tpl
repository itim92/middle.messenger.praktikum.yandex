import { Form } from "@/components/Form";

export default function template({
    elements,
    submit,
    onFieldBlur,
    onSubmit
}) {
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
                        <a href="#">Нет аккаунта?</a>
                    </div>
                </div>
            </div>
        </>
    );
}
