import { Component } from "../../templator";
import template from "./template.hbs";
import { MessageModel } from "./Message/model";
import { Message } from "./Message";
import { MessageDateSeparator } from "./MessageDateSeparator";

type TrackType = {
    date: string;
    messages: MessageModel[];
};

type PropsType = {
    track: TrackType[];
};

export class ChatTrack extends Component<PropsType> {
    inject() {
        const children: Array<MessageDateSeparator | Message> = [];
        this.props.track.forEach((track) => {
            children.push(
                new MessageDateSeparator({
                    date: track.date,
                })
            );

            track.messages.forEach((message) => {
                children.push(new Message(message));
            });
        });

        return [
            {
                selector: "[data-track]",
                component: children,
            },
        ];
    }

    render() {
        return template(this.props);
    }
}
