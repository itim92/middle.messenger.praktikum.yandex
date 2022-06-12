import { httpTransportService } from "@/services/api/HttpTransport";
import { BaseServiceAbstract } from "@/services/api/BaseServiceAbstract";

class UserService extends BaseServiceAbstract {
    readonly API_ENDPOINT = "https://ya-praktikum.tech/api/v2";
    readonly URL = {
        CHANGE_PROFILE: () => this.url("/user/profile"),
        CHANGE_AVATAR: () => this.url("/user/profile/avatar"),
        CHANGE_PASSWORD: () => this.url("/user/password"),
        GET_BY_ID: (id: number) => this.url(`/user/${id}`),
        SEARCH_USER: () => this.url("/user/search"),
    };

    url(url: string) {
        return `${this.API_ENDPOINT}${url}`;
    }

    async changeProfile(profileData) {
        const url = this.URL.CHANGE_PROFILE();

        return this.http.put(url, {
            data: profileData,
        });
    }

    async changeAvatar(avatarData) {
        const url = this.URL.CHANGE_AVATAR();

        return this.http.put(url, {
            data: avatarData,
        });
    }

    async changePassword(passwordData) {
        const url = this.URL.CHANGE_PASSWORD();

        return this.http.put(url, {
            data: passwordData,
        });
    }

    async getUser({ id }) {
        const url = this.URL.GET_BY_ID(id);

        return this.http.get(url);
    }

    async searchUser({ login }) {
        const url = this.URL.SEARCH_USER();

        return this.http.post(url, {
            data: {
                login,
            },
        });
    }
}

const userService = new UserService(httpTransportService);

export { userService, UserService };
