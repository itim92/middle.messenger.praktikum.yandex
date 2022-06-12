import { AuthService, authService } from "@/services/Api/AuthService";
import store from "@/store";
import { SignUpParams } from "@/services/Api/AuthService/types";
import { AbstractBaseController } from "@/controllers/AbstractBaseController";

type AuthControllerInitializeProperties = {
    authService: AuthService;
};

class AuthController extends AbstractBaseController {
    private authService: AuthService;

    constructor({ authService }: AuthControllerInitializeProperties) {
        super();

        this.authService = authService;
    }

    async getUser() {
        const userInfo = await this.authService.getUser();

        if ("id" in userInfo && userInfo.id > 0) {
            store.set("isLogged", true);
            store.set("user", userInfo);
            this.router.go(document.location.pathname);
        }

        return userInfo;
    }

    async signUp(userData: SignUpParams) {
        const response = await this.authService.signUp(userData);
        if (typeof response === "object" && "reason" in response) {
            return response.reason;
        }

        return await this.getUser();
    }

    async login({ login, password }) {
        const response = await authService.signIn({ login, password });
        if (typeof response === "object" && "reason" in response) {
            return response.reason;
        }

        return await this.getUser();
    }

    async logout() {
        const response = await this.authService.logout();
        store.set("isLogged", false);
        this.router.go(document.location.pathname);

        return response;
    }
}

const authController = new AuthController({ authService });
export { authController, AuthController };
