import { Header } from "./components/Header";
import { routes, dispatchCurrenRouteByHash, RouteType } from "./router";
import { render } from "./templator";

const appElement = document.getElementById("app");

function onRouteChange(route: RouteType) {
    if (!appElement) {
        return false;
    }
    let component;

    if (route.controller) {
        component = route.controller.view;
    } else {
        component = route.component;
    }

    if (!component) {
        return;
    }

    render(appElement, component);

    return true;
}

window.addEventListener("hashchange", (e) => {
    e.preventDefault();
    dispatchCurrenRouteByHash(onRouteChange);
});

const headerElement = document.getElementById("header");
if (headerElement) {
    render(headerElement, new Header({ routes }));
}

dispatchCurrenRouteByHash(onRouteChange);
