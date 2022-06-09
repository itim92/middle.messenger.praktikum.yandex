import data from "./../data";

export default function template({goToEdit}) {
    const renderField = ([key, value]) => {
        return (
            <>
                <li>
                    <span className="label">{key}</span>
                    <span className="value">{value}</span>
                </li>
            </>
        )
    }
    return (
        <>

            <div className="info">
                <ul className="fields">
                    {Object.entries(data).map(renderField)}
                </ul>
                <ul className="links">
                    <li><a onClick={goToEdit}>Изменить данные</a></li>
                    <li><a href="#">Изменить пароль</a></li>
                    <li><a href="#" className="red">Выйти</a></li>
                </ul>
            </div>
        </>
    )
}
