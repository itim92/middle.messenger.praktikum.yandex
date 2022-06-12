import "./styles.less";
import template from "./template.tpl";
import { Component } from "@/lib/templator";
import { validatorService } from "@/services/Validator";
import { ChatListItemType } from "@/components/ChatList/types/ChatListItemType";
import { chatController } from "@/controllers/ChatController";
import { Chat } from "@/shared/types/Chat";
import { User } from "@/shared/types/User";
import withChat from "@/store/helpers/withChat";
import { Message } from "@/shared/types/Message";

type Props = {
    currentChatUsers?: User[];
    currentChat?: Chat;
    chats?: ChatListItemType[];
    messages?: Message[];
};

class ChatPage extends Component<Props> {
    componentDidMount(_oldProps: Props) {
        super.componentDidMount(_oldProps);

        chatController.loadChats();
    }


    onFindedUserClick(_event, user) {
        chatController.addUserToCurrentChat(user);
    }

    render() {
        return template({
            ...this.props,
            onFindedUserClick: this.onFindedUserClick.bind(this),
        });
    }
}

export default withChat(ChatPage as typeof Component);
