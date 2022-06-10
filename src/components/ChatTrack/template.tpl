import { MessageDateSeparator } from "./MessageDateSeparator";
import { Message } from "./Message";

export default function template({ track }) {
    return (
        <>
            <div className="messages">
                <div className="messages-track">
                    {messageTrack(track)}
                </div>
            </div>
        </>
    );
}

function messageTrack(track) {
    const children = [];
    track.forEach((track) => {
        children.push(
            <>
                <MessageDateSeparator date={track.date} />
            </>
        );

        track.messages.forEach((message) => {
            children.push(
                <>
                    <Message message={message} />
                </>
            );
        });
    });

    return children;
}
