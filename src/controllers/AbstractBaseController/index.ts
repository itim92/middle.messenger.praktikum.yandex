import { Router } from "@/router";

export abstract class AbstractBaseController {
    private _router?: Router;
    get router() {
        if (!this._router) {
            this._router = new Router();
        }

        return this._router;
    }
}
