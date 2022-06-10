import { Component } from "@/lib/templator";
import template from "./template.tpl";
import { MessageModel } from "./Message/model";

type TrackType = {
    date: string;
    messages: MessageModel[];
};

type PropsType = {
    track: TrackType[];
};

export class ChatTrack extends Component<PropsType> {
    render() {
        return template({ ...this.props });
    }
}
