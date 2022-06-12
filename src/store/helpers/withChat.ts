import { connect } from "@/store";

export default connect((state) => {
    return {
        chats: state["chats"],
        currentChat: state["currentChat"],
        currentChatUsers: state["currentChatUsers"],
        messages: state["messages"],
    };
});
