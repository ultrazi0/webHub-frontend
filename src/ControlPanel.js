import CameraStream from "./CameraStream";
import Controls from "./Controls";

export default function ControlPanel() {
    const image0 = "";
    const image1 = "";

    return (
        <table className="table table-bordered text-center">
            <tbody>
                <tr>
                    <td>
                        <CameraStream image={image0} altText={"Stream from the robot's camera"} />
                    </td>
                    <td>
                        <CameraStream image={image1} altText={"Still with a QR-code"} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <textarea readOnly></textarea>
                    </td>
                    <td>
                        <Controls />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}