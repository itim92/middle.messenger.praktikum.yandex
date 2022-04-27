import "./styles.less";
import template from "./template.hbs";
import {AbstractComponent} from "../../components/AbstractComponent";
import {ChatListItem} from "../../components/ChatListItem";
import {Avatar} from "../../components/Avatar";
import {ChatTrack} from "../../components/ChatTrack";

import chats from "./json/chats.json";
import track from "./json/track.json";

export class ChatPage extends AbstractComponent {

    get chatTrack() {
        return (new ChatTrack({track})).render();
    }

    get chatList() {
        let html = '';
        for (let item of chats) {
            html += (new ChatListItem(item)).render();
        }

        return html;
    }

    get avatar() {
        return (new Avatar({
            name: "Светлана"
        })).render();
    }

    render() {
        let html = template(this.props);

        return html
            .replace("<Avatar />", this.avatar)
            .replace("<ChatTrack />", this.chatTrack)
            .replace("<ChatListItems />", this.chatList);
    }
}
