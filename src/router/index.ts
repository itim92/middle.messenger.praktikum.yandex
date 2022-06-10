import routes from "./routes";
import { Router } from "./Router";

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
//     let Route = routes.find((i) => i.url === url);
//
//     if (!Route) {
//         Route = findRouteByUrl(defaultRouteUrl);
//     }
//
//     return Route;
// }
//
// function dispatchCurrenRouteByHash(callback: CallableFunction) {
//     const hash = location.hash.substring(1);
//     const Route = findRouteByUrl(hash);
//
//     if (typeof callback === "function") {
//         callback(Route);
//     }
// }
//
// export { routes, dispatchCurrenRouteByHash };
// export type { RouteType };
