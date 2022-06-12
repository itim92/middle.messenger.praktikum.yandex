import { userController } from "@/controllers/UserController";
import { Avatar } from "@/components/Avatar";

const labels = {
    id: "Идентификатор",
    first_name: "Имя",
    second_name: "Фамилия",
    display_name: "Никнейм",
    login: "Логин",
    avatar: "Аватар",
    email: "E-mail",
    phone: "Телефон",
}

export default function template({goToEdit, user}) {
    const logout = () => userController.logout();

    return (
        <>

            <div className="info">
                <ul className="fields">
                    <li>
                        <Avatar src={user.avatar} width={"200"} />
                    </li>
                    <li>
                        <span className="label">Имя</span>
                        <span className="value">{user.first_name}</span>
                    </li>
                    <li>
                        <span className="label">Фамилия</span>
                        <span className="value">{user.second_name}</span>
                    </li>
                    <li>
                        <span className="label">Никнейм</span>
                        <span className="value">{user.display_name ?? ""}</span>
                    </li>
                    <li>
                        <span className="label">Логин</span>
                        <span className="value">{user.login}</span>
                    </li>
                    <li>
                        <span className="label">Email</span>
                        <span className="value">{user.email}</span>
                    </li>
                    <li>
                        <span className="label">Телефон</span>
                        <span className="value">{user.phone}</span>
                    </li>
                </ul>
                <ul className="links">
                    <li><a onClick={goToEdit}>Изменить данные</a></li>
                    <li><a onClick={logout} className="red">Выйти</a></li>
                </ul>
            </div>
        </>
    )
}
