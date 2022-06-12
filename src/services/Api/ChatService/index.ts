import { httpTransportService } from "@/services/Api/HttpTransport";
import { BaseServiceAbstract } from "@/services/Api/BaseServiceAbstract";
import { queryStringify } from "@/shared/lib/query-stringify";
import {
    CreateChatParams,
    CreateChatResponse,
    DeleteChatByIdParams,
    DeleteChatByIdResponse,
    GetChatsParams,
    GetChatsResponse,
    GetChatTokenResponse,
} from "@/services/Api/ChatService/types";

class ChatService extends BaseServiceAbstract {
    readonly API_ENDPOINT = "https://ya-praktikum.tech/api/v2";
    readonly URL = {
        GET_CHATS: () => this.url("/chats"),
        CREATE_CHAT: () => this.url("/chats"),
        DELETE_CHAT: () => this.url("/chats"),
        GET_CHAT_USERS: (id) => this.url(`/chats/${id}/users`),
        GET_NEW_MESSAGES_COUNT: (id) => this.url(`/chats/new/${id}`),
        SET_CHAT_AVATAR: () => this.url("/chats/avatar"),
        ADD_USER_TO_CHAT: () => this.url("/chats/users"),
        DELETE_USER_FROM_CHAT: () => this.url("/chats/users"),
        GET_CHAT_TOKEN: (id) => this.url(`/chats/token/${id}`),
    };

    url(url: string) {
        return `${this.API_ENDPOINT}${url}`;
    }

    async getChats(
        queryParams?: GetChatsParams
    ): Promise<GetChatsResponse | never> {
        let url = this.URL.GET_CHATS();
        const params = queryParams ? queryStringify(queryParams) : null;

        url = params ? `${url}?${params}` : url;
        const response = await this.http.get(url);

        return response as GetChatsResponse;
    }

    async createChat({
        title,
    }: CreateChatParams): Promise<CreateChatResponse | never> {
        const url = this.URL.CREATE_CHAT();

        return this.http.post(url, {
            data: { title },
        });
    }

    async deleteChat({
        id,
    }: DeleteChatByIdParams): Promise<DeleteChatByIdResponse | never> {
        const url = this.URL.DELETE_CHAT();
        const response = await this.http.delete(url, {
            data: {
                chatId: id,
            },
        });

        return response as DeleteChatByIdResponse;
    }

    async getChatUsers({ id }) {
        const url = this.URL.GET_CHAT_USERS(id);

        return this.http.get(url);
    }

    async getNewMessagesCountForChat({ id }) {
        const url = this.URL.GET_NEW_MESSAGES_COUNT(id);

        return this.http.get(url);
    }

    async setChatAvatar(avatarData) {
        const url = this.URL.SET_CHAT_AVATAR();

        return this.http.put(url, {
            data: avatarData,
        });
    }

    async addUserToChat(userToChatData) {
        const url = this.URL.ADD_USER_TO_CHAT();

        return this.http.put(url, {
            data: userToChatData,
        });
    }

    async deleteUserFromChat() {
        const url = this.URL.DELETE_USER_FROM_CHAT();

        return this.http.delete(url);
    }

    async getChatToken(chatId) {
        const url = this.URL.GET_CHAT_TOKEN(chatId);
        const response = (await this.http.post(url)) as GetChatTokenResponse;

        if ("reason" in response) {
            throw new Error(response.reason);
        }

        if ("token" in response) {
            return response.token;
        }

        return false;
    }
}

const chatService = new ChatService(httpTransportService);

export { chatService, ChatService };
