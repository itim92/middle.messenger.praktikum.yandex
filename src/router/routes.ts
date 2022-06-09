import { ErrorPage } from "@/pages/Error";
import { RouterComponent } from "./route";
import { Component } from "@/lib/templator";
import { LoginPage } from "@/pages/Login";
import { RegisterPage } from "@/pages/Register";
import { AccountPage } from "@/pages/Account";

type RouteObjectType = {
    title: string;
    url: string;
    component: RouterComponent;
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
        url: "/account",
        component: {
            component: AccountPage as typeof Component,
            props: {
                // isEdit: false,
                className: "container",
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
        // component: new ErrorPage(
        //     {
        //         title: "500",
        //         subtitle: "Не беспокойтесь, мы уже чиним",
        //     },
        //     "div",
        //     "container fluid"
        // ),
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
        // component: new ErrorPage(
        //     {
        //         title: "404",
        //         subtitle: "Не туда попали",
        //     },
        //     "div",
        //     "container fluid"
        // ),
    },
];

//
// const routes: RouteType[] = [
//     {
//         title: "Регистрация",
//         url: "/register",
//         controller: new RegisterController(),
//     },
//     {
//         title: "Вход",
//         url: "/login",
//         controller: new LoginController(),
//     },
//     {
//         title: "Профиль",
//         url: "/account",
//         controller: new AccountController(),
//     },
//     {
//         title: "Профиль (редактирование)",
//         url: "/account-edited",
//         controller: new AccountController(true),
//     },
//     {
//         title: "Чат",
//         url: "/chat",
//         component: new ChatPage({ activeChat: 1 }, "div", "container fluid"),
//     },
//     {
//         title: "Чат (без активного диалога)",
//         url: "/chat-no-active",
//         component: new ChatPage({ activeChat: 0 }, "div", "container fluid"),
//     },
//     {
//         title: "500 ошибка",
//         url: "/500",
//         component: new ErrorPage(
//             {
//                 title: "500",
//                 subtitle: "Не беспокойтесь, мы уже чиним",
//             },
//             "div",
//             "container fluid"
//         ),
//     },
//     {
//         title: "404 ошибка",
//         url: "/404",
//         component: new ErrorPage(
//             {
//                 title: "404",
//                 subtitle: "Не туда попали",
//             },
//             "div",
//             "container fluid"
//         ),
//     },
// ];

export default routes;
