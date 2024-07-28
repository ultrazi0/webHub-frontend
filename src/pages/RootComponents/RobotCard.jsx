import { Button, Card, CardBody, CardFooter, CardImg, CardText, CardTitle } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../../css/RobotCard.css";

export default function RobotCard({ robot, setRobotId }) {
    const createdAt = new Date(...robot.createdAt);

    return (
        <Link to={"control-panel/" + robot.name} className="link-underline link-underline-opacity-0">
            <Card style={{ width: "18rem" }} className="robotCard">
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
                        setRobotId(robot.id);
                    }}>Edit</Button>
                </CardFooter>
            </Card>
        </Link>
    );
}