import { Header } from "./components/Header";
import { renderComponent } from "@/lib/templator";
import routes from "@/router/routes";
import { router } from "@/router";

router.start();

const headerElement = document.getElementById("header");
if (headerElement) {
    renderComponent(headerElement, new Header({ routes }));
}
// const appElement = document.getElementById("app");
//
// function onRouteChange(Route: RouteType) {
//     if (!appElement) {
//         return false;
//     }
//     let component;
//
//     if (Route.controller) {
//         component = Route.controller.view;
//     } else {
//         component = Route.component;
//     }
//
//     if (!component) {
//         return;
//     }
//
//     render(appElement, component);
//
//     return true;
// }
//
// window.addEventListener("hashchange", (e) => {
//     e.preventDefault();
//     dispatchCurrenRouteByHash(onRouteChange);
// });
//
// const headerElement = document.getElementById("header");
// if (headerElement) {
//     render(headerElement, new Header({ routes }));
// }
//
// dispatchCurrenRouteByHash(onRouteChange);
