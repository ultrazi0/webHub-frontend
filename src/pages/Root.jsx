import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import RootAlert from "./RootComponents/RootAlert";
import AddRobotModal from "./RootComponents/AddRobotModal";
import useFetcherWithReset from "../useFetcherWithReset";
import RobotCard from "./RootComponents/RobotCard";
import EditRobotModal from "./RootComponents/EditRobotModal";


export async function allRobotsLoader() {
    const robots = await fetch("/api/getAllRobots").then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .catch(error => {
        console.log(error);
        return [];
    });
    return { robots };
}

export async function addRobotAction({ request }) {
    const formData = await request.formData();

    const success = await fetch("/api/insertNewRobot", {
        method: "post",
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }).catch(error => {
        console.log(error);
        return false;
    });

    // if (formData.get("name").length) {
    //     return true;
    // } else {
    //     return false;
    // }

    return success;
}

export async function editRobotAction({ request, params }) {
    const formData = await request.formData();
    formData.append("id", params.robotId);

    const success = await fetch("/api/updateRobot", {
        method: "post",
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }).catch(error => {
        console.log(error);
        return false;
    });

    return success;
}

export default function Root() {
    const { robots } = useLoaderData();
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [editRobotId, setEditRobotId] = useState(null);

    const addRobotFetcher = useFetcherWithReset({ key: "add-robot" });
    const editRobotFetcher = useFetcherWithReset({ key: "edit-robot" });

    const [messages, setMessages] = useState([]);

    if (addRobotFetcher.data === true) {
        setShowAddModal(false);
        setMessages([
            ...messages,
            {
                variant: "success",
                message: "New robot has been created!",
                createdAt: Date.now()
            }
        ]);
        addRobotFetcher.reset();
    }

    if (editRobotFetcher.data === true) {
        setEditRobotId(null);
        setMessages([
            ...messages,
            {
                variant: "success",
                message: "Robot has been updated!",
                createdAt: Date.now()
            }
        ]);
        editRobotFetcher.reset();
    }

    console.log("I have just been rendered!")

    return (
        <>
            <AddRobotModal showModal={showAddModal} setShowModal={setShowAddModal} />
            <EditRobotModal robotId={editRobotId} setRobotId={setEditRobotId} />
            <Container>
                {
                    messages.map(message => (
                        <Row key={message.createdAt}>
                            <Col>
                                <RootAlert variant={message.variant} message={message.message} />
                            </Col>
                        </Row>
                    ))
                }
                <Row>
                    <Col>
                        <h1>Home</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => setShowAddModal(true)}>Add robot</Button>
                    </Col>
                </Row>
                <Row className="g-4 my-1" xs={1} sm={2} md={3} lg={3} xl={4} xxl={4}>
                    {robots.length ? robots.map((robot) => (
                        <Col key={robot.id}>
                            <RobotCard robot={robot} setRobotId={setEditRobotId} />
                        </Col>
                    )) : <Col><p><i>No robots</i></p></Col>}
                </Row>
            </Container>
        </>
    );
}
