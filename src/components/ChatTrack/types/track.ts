import { MessageModel } from "../Message/model";

export type TrackType = {
    date: string;
    messages: MessageModel[];
};
