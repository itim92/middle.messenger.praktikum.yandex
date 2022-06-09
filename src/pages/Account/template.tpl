import {Avatar} from "@/components/Avatar";
import {Edit} from "@/pages/Account/Edit";
import {Base} from "@/pages/Account/Base";


/**
 * <Base/> такой синтаксис вызывает бесконечный цикл, нужно использовать <Base />
 */


export default function template({isEdit, name, elements, submit, onSubmit, onFieldBlur, onFieldChange, goToEdit, cancelEdit}) {
    const renderInfo = () => {
        return [1].map(() => isEdit ? renderEdit() : renderBase());
    }

    const renderBase = () => {
        return (
            <>
                <Base goToEdit={goToEdit} />
            </>
        )
    }

    const renderEdit = () => {
        return (
            <>
                <Edit submit={submit} elements={elements} onSubmit={onSubmit} onFieldBlur={onFieldBlur}
                      onFieldChange={onFieldChange} cancelEdit={cancelEdit} />
            </>
        )
    }
    return (
        <>
            <div className="page-account-wrapper">
                <div className="page-title">Профиль</div>
                <div className="page-account is-edited">
                    <div className="content">
                        <Avatar name={name}/>
                        {renderInfo()}
                    </div>
                    <a href="#" className="back-button"><span>Назад</span></a>
                </div>
            </div>
        </>
    )
}
