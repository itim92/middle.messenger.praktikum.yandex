import Edit from "@/pages/Account/Edit";
import Base from "@/pages/Account/Base";
import { Link } from "@/router";

/**
 * <Base/> такой синтаксис вызывает бесконечный цикл, нужно использовать <Base />
 */


export default function template({
    isEdit,
    name,
    profileFormElements,
    avatarFormElements,
    passwordFormElements,
    submit,
    onSubmitChangeProfile,
    onSubmitChangePassword,
    onSubmitChangeAvatar,
    onFieldBlur,
    onFieldChange,
    goToEdit,
    cancelEdit
}) {
    const renderInfo = () => {
        return [1].map(() => isEdit ? renderEdit() : renderBase());
    };

    const messengerLink = {
        url: "/messenger",
        title: "Мессенджер"
    };

    const renderBase = () => {
        return (
            <>
                <Base goToEdit={goToEdit} />
            </>
        );
    };

    const renderEdit = () => {
        return (
            <>
                <Edit submit={submit}
                      profileFormElements={profileFormElements}
                      avatarFormElements={avatarFormElements}
                      passwordFormElements={passwordFormElements}
                      onSubmitChangeProfile={onSubmitChangeProfile}
                      onSubmitChangePassword={onSubmitChangePassword}
                      onSubmitChangeAvatar={onSubmitChangeAvatar}
                      onFieldBlur={onFieldBlur}
                      onFieldChange={onFieldChange} cancelEdit={cancelEdit} />
            </>
        );
    };
    return (
        <>
            <div className="page-account-wrapper">
                <Link to={messengerLink.url} title={messengerLink.title} />
                <div className="page-account is-edited">
                    <div className="content">
                        {renderInfo()}
                    </div>
                </div>
            </div>
        </>
    );
}
