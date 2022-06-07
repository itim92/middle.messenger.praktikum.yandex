import routes from "./routes";
import { Router } from "./router";

export function createRouter(selector: string) {
    const root = document.querySelector(selector);

    if (!root) {
        throw new Error(`Root selector for router not found (${selector})`);
    }

    const router = new Router(root as HTMLElement);

    for (const route of routes) {
        if (route.url === "*") {
            router.useAsDefault(route.component);
        } else {
            router.use(route.url, route.component);
        }
    }

    return router;
}

const router = createRouter("#app");
export { router };

// type RouteType = {
//     title: string;
//     url: string;
//     component?: Component;
//     controller?: IController;
// };
//
// const defaultRouteUrl = "/404";
//
// function findRouteByUrl(url: string): RouteType {
//     let route = routes.find((i) => i.url === url);
//
//     if (!route) {
//         route = findRouteByUrl(defaultRouteUrl);
//     }
//
//     return route;
// }
//
// function dispatchCurrenRouteByHash(callback: CallableFunction) {
//     const hash = location.hash.substring(1);
//     const route = findRouteByUrl(hash);
//
//     if (typeof callback === "function") {
//         callback(route);
//     }
// }
//
// export { routes, dispatchCurrenRouteByHash };
// export type { RouteType };
