import CameraStream from "./CameraStream";
import useWebSocket from "react-use-websocket";

export default function ImageRow() {
    let image = "";

    const robotName = "puppy-loving pacifist";
    const WS_URL = "ws://localhost:8080/api/image/client/" + robotName;

    // Establishing WebSocket connection
    const { lastJsonMessage } = useWebSocket(WS_URL, {
        shouldReconnect: (closeEvent) => false,
        onError: (event) => console.error("Image-WebSocket error observed:", event),
        onOpen: () => console.log("Image-WebSocket connection opened"),
        onClose: (event) => console.log("Image-WebSocket connection closed:", event)
    });

    // If there is a json message, then change image variable
    if (lastJsonMessage) {
        if (Object.keys(lastJsonMessage).length) {
            if (lastJsonMessage.messageType === "image") {
                image = "data:image/jpg;base64, " + lastJsonMessage.image;
            } else if (lastJsonMessage.messageType === "regularMessage") {
                console.log("Message from /api/image/topic: " + lastJsonMessage.message);
            }
        }
    }

    return (
        <div className="row g-2 my-2">
            <div className="col">
                <CameraStream image={image} altText={"Stream from the robot's camera"} />
            </div>
            <div className="col">
                <CameraStream image={image} altText={"Still with a QR-code"} />
            </div>
        </div>
    );
}