import { ErrorPage } from "@/pages/Error";
import { RouteComponent } from "@/router/types";
import { Component } from "@/lib/templator";
import { LoginPage } from "@/pages/Login";
import { RegisterPage } from "@/pages/Register";
import { AccountPage } from "@/pages/Account";
import ChatPage from "@/pages/Chat";

export type RouteObjectType = {
    title: string;
    url: string;
    component: RouteComponent;
};

const routes: RouteObjectType[] = [
    {
        title: "Авторизоваться",
        url: "/",
        component: {
            component: LoginPage as typeof Component,
            props: {
                className: "container",
            },
        },
    },
    {
        title: "Зарегистрироваться",
        url: "/sign-up",
        component: {
            component: RegisterPage as typeof Component,
            props: {
                className: "container",
            },
        },
    },
    {
        title: "Аккаунт",
        url: "/settings",
        component: {
            component: AccountPage as typeof Component,
            props: {
                className: "container fluid",
            },
        },
    },
    {
        title: "Чат",
        url: "/messenger",
        component: {
            component: ChatPage as typeof Component,
            props: {
                // isEdit: false,
                className: "container fluid",
            },
        },
    },
    {
        title: "500 ошибка",
        url: "/500",
        component: {
            component: ErrorPage as typeof Component,
            props: {
                title: "500",
                subtitle: "Не беспокойтесь, мы уже чиним",
                className: "container fluid",
            },
        },
    },
    {
        title: "404 ошибка",
        url: "*",
        component: {
            component: ErrorPage as typeof Component,
            props: {
                title: "404",
                subtitle: "Не туда попали",
                className: "container fluid",
            },
        },
    },
];
export default routes;
