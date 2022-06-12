import { Component } from "@/lib/templator";
import template from "./template.tpl";
import { MessageModel } from "./Message/model";
import { Message } from "@/shared/types/Message";

// export type TrackType = {
//     date: string;
//     messages: MessageModel[];
// };

type PropsType = {
    messages: Message[];
};

export class ChatTrack extends Component<PropsType> {
    render() {
        return template({ ...this.props });
    }
}
