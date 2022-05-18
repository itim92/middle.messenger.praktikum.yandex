import { ErrorPage } from "../pages/Error";
import { ChatPage } from "../pages/Chat";
import { Component } from "../templator";
import { LoginController } from "../controllers";
import { IController } from "../controllers/IController";
import { RegisterController } from "../controllers/Register";
import { AccountController } from "../controllers/Account";

type RouteType = {
    title: string;
    url: string;
    component?: Component;
    controller?: IController;
};

const defaultRouteUrl = "/404";

function findRouteByUrl(url: string): RouteType {
    let route = routes.find((i) => i.url === url);

    if (!route) {
        route = findRouteByUrl(defaultRouteUrl);
    }

    return route;
}

function dispatchCurrenRouteByHash(callback: CallableFunction) {
    const hash = location.hash.substring(1);
    const route = findRouteByUrl(hash);

    if (typeof callback === "function") {
        callback(route);
    }
}

const routes: RouteType[] = [
    {
        title: "Регистрация",
        url: "/register",
        controller: new RegisterController(),
    },
    {
        title: "Вход",
        url: "/login",
        controller: new LoginController(),
    },
    {
        title: "Профиль",
        url: "/account",
        controller: new AccountController(),
    },
    {
        title: "Профиль (редактирование)",
        url: "/account-edited",
        controller: new AccountController(true),
    },
    {
        title: "Чат",
        url: "/chat",
        component: new ChatPage({ activeChat: 1 }, "div", "container fluid"),
    },
    {
        title: "Чат (без активного диалога)",
        url: "/chat-no-active",
        component: new ChatPage({ activeChat: 0 }, "div", "container fluid"),
    },
    {
        title: "500 ошибка",
        url: "/500",
        component: new ErrorPage(
            {
                title: "500",
                subtitle: "Не беспокойтесь, мы уже чиним",
            },
            "div",
            "container fluid"
        ),
    },
    {
        title: "404 ошибка",
        url: "/404",
        component: new ErrorPage(
            {
                title: "404",
                subtitle: "Не туда попали",
            },
            "div",
            "container fluid"
        ),
    },
];

export { routes, dispatchCurrenRouteByHash };
export type { RouteType };
