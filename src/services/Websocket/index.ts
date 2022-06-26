import { chatService } from "@/services/Api/ChatService";
import store from "@/store";
import { User } from "@/shared/types/User";
import { chatController } from "@/controllers/ChatController";

class WebsocketService {
    private socket: WebSocket | null;
    private socketInterval;

    async open(chatId) {
        const token = await chatService.getChatToken(chatId);
        const user: User = store.getState()["user"] as User;

        if (this.socket) {
            this.socket.close();
        }
        if (this.socketInterval) {
            clearInterval(this.socketInterval);
        }

        const ws = `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`;
        this.socket = new WebSocket(ws);
        this.socketInterval = setInterval(this.ping.bind(this), 10000);

        this.socket.addEventListener("open", () => {
            chatController.clearMessages();
            this.loadOldMessage();
        });
        this.socket.addEventListener("close", this.onClose.bind(this));
        this.socket.addEventListener("message", this.onMessage.bind(this));
        this.socket.addEventListener("error", this.onError.bind(this));
    }

    loadOldMessage(offset = "") {
        this.socket.send(
            JSON.stringify({
                type: "get old",
                content: offset,
            })
        );
    }

    sendMessage(message) {
        this.socket.send(
            JSON.stringify({
                type: "message",
                content: message,
            })
        );
    }

    private ping() {
        this.socket.send(JSON.stringify({ type: "ping" }));
    }

    private onClose(event: CloseEvent) {
        if (event.wasClean) {
            console.log("Соединение закрыто чисто");
        } else {
            console.log("Обрыв соединения");
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    }

    private onMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);

        console.log("onMessage", data);

        if (Array.isArray(data)) {
            chatController.appendMessages(data);
        } else if (typeof data === "object" && data?.type === "message") {
            chatController.appendMessages([data]);
        }
    }

    private onError(event: Event) {
        console.log("Ошибка", event);
    }
}

const websocketService = new WebsocketService();
export { websocketService, WebsocketService };
