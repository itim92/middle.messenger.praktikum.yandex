import { Router } from "@/router/Router";
import routes from "./routes";
import store, { Store } from "@/store";
import { authController } from "@/controllers/AuthController";

class App {
    private readonly store: Store;
    private router: Router;

    private static notGuardedByAuthLinks = ["/", "/sign-up"];

    constructor(store: Store) {
        this.store = store;
    }

    run(selector) {
        this.router = this.createRouter(selector);
        this.addNotLoggedMiddleware(this.router);
        this.addLoggedMiddleware(this.router);

        authController.getUser().then(() => {
            this.router.start();
        });
    }

    createRouter(selector: string) {
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

    addNotLoggedMiddleware(router: Router) {
        router.addMiddleware(({ pathname, router }) => {
            const isGuardedLink =
                App.notGuardedByAuthLinks.indexOf(pathname) === -1;
            const state = this.store.getState();
            const isLogged = state?.isLogged ?? false;

            if (isGuardedLink && !isLogged) {
                setTimeout(() => router.go("/"), 0);
            }

            return true;
        });
    }

    addLoggedMiddleware(router: Router) {
        router.addMiddleware(({ pathname, router }) => {
            const isNotGuardedLink =
                App.notGuardedByAuthLinks.indexOf(pathname) !== -1;
            const state = this.store.getState();
            const isLogged = state?.isLogged ?? false;

            if (isNotGuardedLink && isLogged) {
                setTimeout(() => router.go("/messenger"), 0);
            }

            return true;
        });
    }
}

const app = new App(store);

export { app };
