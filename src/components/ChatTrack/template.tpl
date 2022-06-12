import { MessageDateSeparator } from "./MessageDateSeparator";
import { Message } from "./Message";

export default function template({ messages }) {
    return (
        <>
            <div className="messages">
                <div className="messages-track">
                    {messageTrack(messages)}
                </div>
            </div>
        </>
    );
}

function messageTrack(messages) {
    messages = messages ?? [];
    const children = [];
    messages.forEach((message) => {
        children.push(
            <>
                <Message message={message} />
            </>
        );
    });

    return children;
}
