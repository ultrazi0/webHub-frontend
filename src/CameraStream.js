import useWebSocket, { ReadyState } from "react-use-websocket";

export default function CameraStream( {image, altText} ) {
    const WS_URL = "ws://localhost:8080/image/topic";
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL);

    if ((readyState !== ReadyState.OPEN) || (!lastJsonMessage)) {
        return <img alt={altText} />;
    }

    let image0 = "data:image/jpg;base64, " + lastJsonMessage.image;

    return <img src={image0} alt={altText} />;
}