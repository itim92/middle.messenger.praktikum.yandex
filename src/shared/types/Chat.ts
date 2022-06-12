import { Message } from "@/shared/types/Message";

export type Chat = {
    id: number;
    created_by: number;
    avatar?: string;
    last_message?: Message;
    title: string;
    unread_count: number;
};
