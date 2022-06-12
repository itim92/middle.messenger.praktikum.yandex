import { AbstractBaseController } from "@/controllers/AbstractBaseController";
import { chatService, ChatService } from "@/services/Api/ChatService";
import store from "@/store";
import { Chat } from "@/shared/types/Chat";
import { Message } from "@/shared/types/Message";
import { websocketService } from "@/services/Websocket";

type ChatControllerInitializeProperties = {
    chatService: ChatService;
};

class ChatController extends AbstractBaseController {
    private chatService: ChatService;

    constructor({ chatService }: ChatControllerInitializeProperties) {
        super();
        this.chatService = chatService;
    }

    async loadChats() {
        const response = await this.chatService.getChats();

        store.set("chats", response);

        return response;
    }

    async createChat(title) {
        const response = await this.chatService.createChat({ title });

        if ("reason" in response) {
            alert(response.reason);
            return;
        }

        if (!("id" in response)) return;

        store.set("currentChatId", response.id);

        return await this.loadChats();
    }

    async loadCurrentChatUsers() {
        const state = store.getState();
        const currentChat = state["currentChat"] as Chat;
        const currentChatId = currentChat ? currentChat.id : 0;

        if (!currentChatId) {
            return;
        }

        const response = await this.chatService.getChatUsers({
            id: currentChatId,
        });
        store.set("currentChatUsers", response);

        return response;
    }

    async addUserToCurrentChat(user) {
        const currentChat = store.getState()["currentChat"] as Chat;

        if (!currentChat?.id) {
            return false;
        }

        const response = await this.chatService.addUserToChat({
            users: [user.id],
            chatId: currentChat.id,
        });

        return response;
    }

    async setCurrentChat(chat: Chat) {
        store.set("currentChat", chat);
        chatController.loadCurrentChatUsers();
        websocketService.open(chat.id);
    }

    sendMessage(message: string) {
        websocketService.sendMessage(message);
    }

    clearMessages() {
        store.set("messages", []);
    }

    appendMessages(messages) {
        const existedMessages = (store.getState()["messages"] ??
            []) as Array<Message>;
        store.set("messages", [...messages, ...existedMessages]);
    }
}

const chatController = new ChatController({ chatService });
export { chatController, ChatController };
