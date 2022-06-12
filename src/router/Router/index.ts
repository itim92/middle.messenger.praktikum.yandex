import { Route } from "../Route";
import { RouteComponent, RouterMiddleware } from "../types";

export class Router {
    private static __instance: Router;

    private readonly root!: HTMLElement;
    private readonly history!: History;

    private routes: Route[] = [];
    private _currentRoute?: Route;

    private defaultRoute: Route | null = null;

    private routeMiddlewares: RouterMiddleware[] = [];

    constructor(root?: HTMLElement) {
        if (Router.__instance) {
            return Router.__instance;
        }

        if (!root) {
            throw Error("Первая инициализация должна быть с root элементом");
        }

        this.root = root;
        this.history = window.history;
        this.routes = [];

        Router.__instance = this;
    }

    addMiddleware(middleware: RouterMiddleware) {
        this.routeMiddlewares.push(middleware);
    }

    useAsDefault(view: RouteComponent) {
        this.defaultRoute = new Route({
            pathname: "*",
            view,
            root: this.root,
        });
    }

    use(pathname: string, view: RouteComponent) {
        const route = new Route({
            pathname,
            view,
            root: this.root,
        });
        this.routes.push(route);

        return this;
    }

    start() {
        window.addEventListener("popstate", () => {
            this._onRoute(window.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        const middlewaresResult = this.routeMiddlewares.every((m) =>
            m({ pathname, router: this })
        );

        if (!route || !middlewaresResult) {
            return;
        }

        setTimeout(() => {
            if (this._currentRoute) {
                this._currentRoute.leave();
            }

            this._currentRoute = route;
            route.render();
        });
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return (
            this.routes.find((route) => route.match(pathname)) ??
            this.defaultRoute
        );
    }
}
