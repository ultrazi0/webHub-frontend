import { Button, Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle, CloseButton } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../../css/RobotCard.css";

export default function RobotCard({ robot, setEditRobotId, setDeleteRobotId }) {
    const createdAt = new Date(robot.createdAt);

    return (
        <Link to={"control-panel/" + robot.name} className="link-underline link-underline-opacity-0">
            <Card style={{ width: "18rem" }} className="robotCard">
                    <CloseButton className="robotCard-closeButton p-3" onClick={(event) => {
                        event.preventDefault();
                        console.log("About to delete");
                        setDeleteRobotId(robot.id);
                    }}/>
                <CardImg variant="tip" src={"http://robohash.org/" + robot.name + "?size=280x160"} />
                <CardBody>
                    <CardTitle>{robot.name}</CardTitle>
                    <CardText>
                        Created at: {createdAt.toString()}
                    </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                    <Button onClick={(event) => {
                        event.preventDefault();
                        console.log("I have been Clicked");
                        setEditRobotId(robot.id);
                    }}>Edit</Button>
                </CardFooter>
            </Card>
        </Link>
    );
}