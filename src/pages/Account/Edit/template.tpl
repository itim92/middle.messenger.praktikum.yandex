import { Form } from "@/components/Form";

export default function template({
    profileFormElements,
    avatarFormElements,
    passwordFormElements,
    onSubmitChangeProfile,
    onSubmitChangePassword,
    onSubmitChangeAvatar,
    onFieldBlur,
    onFieldChange,
    cancelEdit
}) {
    const profileSubmit = "Сохранить профиль";
    const avatarSubmit = "Сохранить аватар";
    const passwordSubmit = "Обновить пароль";
    return (
        <>
            <div className="info">
                <div className="block-title">Данные пользователя</div>
                <Form className="account-form" elements={profileFormElements}
                      submit={profileSubmit} onSubmit={onSubmitChangeProfile}
                      onFieldBlur={onFieldBlur} onFieldChange={onFieldChange} />

                <hr />
                <div className="block-title">Изменить аватар</div>
                <Form className="account-form" elements={avatarFormElements} submit={avatarSubmit}
                      onSubmit={onSubmitChangeAvatar}
                      onFieldBlur={onFieldBlur} onFieldChange={onFieldChange} />

                <hr />
                <div className="block-title">Изменить пароль</div>
                <Form className="account-form" elements={passwordFormElements}
                      submit={passwordSubmit} onSubmit={onSubmitChangePassword}
                      onFieldBlur={onFieldBlur} onFieldChange={onFieldChange} />
                <ul className="links">
                    <li><a href="#" onClick={cancelEdit} className="red">Назад</a></li>
                </ul>
            </div>
        </>
    );
}
