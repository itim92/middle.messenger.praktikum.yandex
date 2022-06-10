import { Route, RouterComponent } from "../Route";

export class Router {
    private static __instance: Router;

    private readonly root!: HTMLElement;
    private readonly history!: History;

    private routes: Route[] = [];
    private _currentRoute?: Route;

    private defaultRoute: Route | null = null;

    constructor(root: HTMLElement) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.root = root;
        this.history = window.history;
        this.routes = [];

        Router.__instance = this;
    }

    useAsDefault(view: RouterComponent) {
        this.defaultRoute = new Route({
            pathname: "*",
            view,
            root: this.root,
        });
    }

    use(pathname: string, view: RouterComponent) {
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
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
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
