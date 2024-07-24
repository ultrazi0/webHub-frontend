import { useEffect, useRef } from "react";
import Controls from "./Controls";
import useWebSocket from "react-use-websocket";

export default function ControlRow() {
    const feedbackArea = useRef(null); // ref that controls textarea for feedback

    const robotId = 0;
    const WS_URL = "ws://localhost:8080/api/command/client/" + robotId;
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        shouldReconnect: (closeEvent) => true,
        onError: (event) => console.error("Command-WebSocket error observed:", event),
        onOpen: () => console.log("Command-WebSocket connection opened"),
        onClose: (event) => console.log("Command-WebSocket connection closed:", event)
    });

    // Handle updates to the textarea
    useEffect(() => {
        if (lastJsonMessage) {
            if (Object.keys(lastJsonMessage).length) {
                if ((lastJsonMessage.messageType === "feedback") || (lastJsonMessage.messageType === "regularMessage")) {
                    if (feedbackArea.current) {
                        // Add message depending on which field is present in the message
                        feedbackArea.current.value += lastJsonMessage.feedback ? lastJsonMessage.feedback + "\n" : "Message: \"" + lastJsonMessage.message + "\"\n";
                        feedbackArea.current.scrollTop = feedbackArea.current.scrollHeight; // Scroll down
                    } else {
                        console.log("Feedback: " + lastJsonMessage.feedback);
                        console.log("Message: " + lastJsonMessage.message);
                    }
                }
            }
        }
    }, [lastJsonMessage]);

    return (
        <div className="row g-2 my-2">
            <div className="col">
                <textarea className="form-control" ref={feedbackArea} readOnly={true} rows={10}></textarea>
            </div>
            <div className="col">
                <Controls sendCommand={sendJsonMessage} />
            </div>
        </div>
    );
}