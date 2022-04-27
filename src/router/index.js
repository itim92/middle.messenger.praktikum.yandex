import {RegisterPage} from "../pages/Register";
import {ErrorPage} from "../pages/Error";
import {LoginPage} from "../pages/Login";
import {BaseAccountPage, EditedAccountPage} from "../pages/Account";
import {ChatPage} from "../pages/Chat";

function findRouteByUrl(url) {
    let route = routes.filter((i) => i.url === url);
    route = route[0];

    if (!route) {
        route = findRouteByUrl("/404");
    }

    return route;
}

function dispatchCurrenRouteByHash(callback) {
    const hash = location.hash.substring(1);
    const route = findRouteByUrl(hash);

    if (typeof callback === "function") {
        callback(route);
    }
}

const routes = [
    {
        "title": "Регистрация",
        "url": "/register",
        "component": (new RegisterPage()),
    },
    {
        "title": "Вход",
        "url": "/login",
        "component": (new LoginPage()),
    },
    {
        "title": "Профиль",
        "url": "/account",
        "component": (new BaseAccountPage()),
    },
    {
        "title": "Профиль (редактирование)",
        "url": "/account-edited",
        "component": (new EditedAccountPage()),
    },
    {
        "title": "Чат",
        "url": "/chat",
        "component": (new ChatPage({
            activeChat: 1
        })),
    },
    {
        "title": "Чат (без активного диалога)",
        "url": "/chat-no-active",
        "component": (new ChatPage({
            activeChat: 0
        })),
    },
    {
        "title": "500 ошибка",
        "url": "/500",
        "component": (new ErrorPage({
            title: "500",
            subtitle: "Не беспокойтесь, мы уже чиним"
        })),
    },
    {
        "title": "404 ошибка",
        "url": "/404",
        "component": (new ErrorPage({
            title: "404",
            subtitle: "Не туда попали"
        })),
    },
];

export {routes, dispatchCurrenRouteByHash};
