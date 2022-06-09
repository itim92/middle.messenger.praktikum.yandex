import {Form} from "@/components/Form";

export default function template({elements, submit, onSubmit, onFieldBlur, onFieldChange, cancelEdit}) {
    return (
        <>
            <div className="info">
                <Form elements={elements} submit={submit} onSubmit={onSubmit}
                      onFieldBlur={onFieldBlur} onFieldChange={onFieldChange}/>
                <ul className="links">
                    <li><a href="#" onClick={cancelEdit} className="red">Отменить</a></li>
                </ul>
            </div>
        </>
    )
}
