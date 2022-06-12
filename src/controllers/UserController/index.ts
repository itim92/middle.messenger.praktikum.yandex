import store from "@/store";
import { AbstractBaseController } from "@/controllers/AbstractBaseController";
import { UserService, userService } from "@/services/Api/UserService";
import {
    ProfileParams,
    ProfileResponse,
} from "@/services/Api/UserService/types";
import { User } from "@/shared/types/User";

type UserControllerInitializeProperties = {
    userService: UserService;
};

class UserController extends AbstractBaseController {
    private userService: UserService;

    constructor({ userService }: UserControllerInitializeProperties) {
        super();
        this.userService = userService;
    }

    async findUsers(searchRequest) {
        if (searchRequest.length < 3) {
            store.set("searchedUsers", []);

            return;
        }

        const response = (await this.userService.searchUser({
            login: searchRequest,
        })) as User[];

        store.set("searchedUsers", response);
    }

    async updatePassword(passwordData): Promise<ProfileResponse | unknown> {
        const response = (await this.userService.changePassword(
            passwordData
        )) as ProfileResponse;

        if (typeof response === "object" && "reason" in response) {
            return response.reason;
        }

        return response;
    }

    async updateAvatar(avatarFormData): Promise<ProfileResponse | unknown> {
        const userInfo = (await this.userService.changeAvatar(
            avatarFormData
        )) as ProfileResponse;

        if ("id" in userInfo && userInfo.id > 0) {
            store.set("user", userInfo);
        }

        return userInfo;
    }

    async updateProfile(
        profileData: ProfileParams
    ): Promise<ProfileResponse | unknown> {
        const userInfo = (await this.userService.changeProfile(
            profileData
        )) as ProfileResponse;

        if ("id" in userInfo && userInfo.id > 0) {
            store.set("user", userInfo);
        }

        return userInfo;
    }
}

const userController = new UserController({ userService });
export { userController, UserController };
