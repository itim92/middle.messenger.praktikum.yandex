import { httpTransportService } from "@/services/Api/HttpTransport";
import { BaseServiceAbstract } from "@/services/Api/BaseServiceAbstract";
import {
    SignInParams,
    SignInResponse,
    SignUpParams,
    SignUpResponse,
    UserResponse,
} from "@/services/Api/AuthService/types";

class AuthService extends BaseServiceAbstract {
    readonly API_ENDPOINT = "https://ya-praktikum.tech/api/v2";
    readonly URL = {
        SIGN_UP: () => this.url("/auth/signup"),
        SIGN_IN: () => this.url("/auth/signin"),
        USER_INFO: () => this.url("/auth/user"),
        LOGOUT: () => this.url("/auth/logout"),
    };

    url(url: string) {
        return `${this.API_ENDPOINT}${url}`;
    }

    async signUp(userData: SignUpParams): Promise<SignUpResponse | never> {
        const url = this.URL.SIGN_UP();

        return this.http.post(url, {
            data: userData,
        });
    }

    async signIn(loginData: SignInParams): Promise<SignInResponse | never> {
        const url = this.URL.SIGN_IN();

        return this.http.post(url, {
            data: loginData,
        });
    }

    async getUser(): Promise<UserResponse> {
        const url = this.URL.USER_INFO();

        return this.http.get(url);
    }

    async logout() {
        const url = this.URL.LOGOUT();

        return this.http.post(url, {
            data: {},
        });
    }
}

const u26696 = {
    id: 26696,
    first_name: "John",
    second_name: "Doe",
    display_name: null,
    login: "qwerty",
    avatar: null,
    email: "qwerty@qwerty.qwe",
    phone: "+78901234567",
};

const authService = new AuthService(httpTransportService);

export { authService, AuthService };
