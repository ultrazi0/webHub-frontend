import { useParams } from "react-router-dom";
import ControlRow from "./ControlPanelComponents/ControlRow";
import ImageRow from "./ControlPanelComponents/ImageRow";

export default function ControlPanel() {
    const { robotName } = useParams()

    return (
        <>
            <h1>
                Contorl Panel
            </h1>
            <div className="container text-center">
                <ImageRow robotName={robotName} />
                <ControlRow robotName={robotName} />
            </div>
        </>
    )
}
