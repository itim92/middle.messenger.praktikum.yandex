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
// function onRouteChange(route: RouteType) {
//     if (!appElement) {
//         return false;
//     }
//     let component;
//
//     if (route.controller) {
//         component = route.controller.view;
//     } else {
//         component = route.component;
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
