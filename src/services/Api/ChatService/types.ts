import { ErrorResponse } from "../BaseServiceAbstract/types";

export type GetChatsParams = {
    offset: number;
    limit: number;
    title: string;
};

export type GetChatsResponse = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    };
}[];

export type CreateChatParams = {
    title: string;
};

export type CreateChatResponse =
    | {
          id: number;
      }
    | ErrorResponse;

export type DeleteChatByIdParams = {
    id: number;
};

export type DeleteChatByIdResponse = {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string;
    };
};

export type GetChatTokenResponse =
    | {
          token: string;
      }
    | ErrorResponse;
