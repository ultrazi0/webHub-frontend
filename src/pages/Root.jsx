import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import RootAlert from "./RootComponents/RootAlert";
import AddRobotModal from "./RootComponents/AddRobotModal";
import useFetcherWithReset from "../useFetcherWithReset";
import RobotCard from "./RootComponents/RobotCard";
import EditRobotModal from "./RootComponents/EditRobotModal";
import DeleteRobotModal from "./RootComponents/DeleteRobotModal";


export async function allRobotsLoader() {
    const robots = await fetch("/api/robots").then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .catch(error => {
        console.log(error);
        return {};
    });
    return { robots };
}

export async function addRobotAction({ request }) {
    const formData = await request.formData();

    const success = await fetch("/api/robots", {
        method: "post",
        body: formData
    }).then(response => {
        if (response.ok) {
            return true;
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

    const success = await fetch("/api/robots/" + params.robotId, {
        method: "put",
        body: formData
    }).then(response => {
        if (response.ok) {
            return true;
        }
        throw new Error(response.statusText);
    }).catch(error => {
        console.log(error);
        return false;
    });

    return success;
}

export async function deleteRobotAction({ params }) {

    const success = await fetch("/api/robots/" + params.robotId, {
        method: "delete"
    }).then(response => {
        if (response.ok) {
            return true;
        }
        throw new Error(response.statusText);
    }).catch(error => {
        console.log(error);
        return false;
    });

    return success;
}

let nextMessageId = 0;

export default function Root() {
    const { robots } = useLoaderData();

    const revalidator = useRevalidator();
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [editRobotId, setEditRobotId] = useState(null);
    const [deleteRobotId, setDeleteRobotId] = useState(null);

    const addRobotFetcher = useFetcherWithReset();
    const editRobotFetcher = useFetcherWithReset();
    const deleteRobotFetcher = useFetcherWithReset();

    const [messages, setMessages] = useState([]);

    if (addRobotFetcher.data === true) {
        setShowAddModal(false);
        setMessages([
            ...messages,
            {
                id: nextMessageId++,
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
                id: nextMessageId++,
                variant: "success",
                message: "Robot has been updated!",
                createdAt: Date.now()
            }
        ]);
        editRobotFetcher.reset();
    }

    if (deleteRobotFetcher.data === true) {
        setDeleteRobotId(null);
        setMessages([
            ...messages,
            {
                id: nextMessageId++,
                variant: "success",
                message: "Robot has been deleted",
                createdAt: Date.now()
            }
        ]);
        deleteRobotFetcher.reset();
    }
    
    if (deleteRobotFetcher.data === false) {
        setDeleteRobotId(null);
        setMessages([
            ...messages,
            {
                id: nextMessageId++,
                variant: "danger",
                message: "Something went wrong while deleting this robot...",
                createdAt: Date.now()
            }
        ]);
        deleteRobotFetcher.reset();
    }

    return (
        <>
            <AddRobotModal fetcher={addRobotFetcher} showModal={showAddModal} setShowModal={setShowAddModal} />
            <EditRobotModal fetcher={editRobotFetcher} robotId={editRobotId} setRobotId={setEditRobotId} />
            <DeleteRobotModal fetcher={deleteRobotFetcher} robotId={deleteRobotId} setRobotId={setDeleteRobotId} />
            <Container>
                {
                    messages.map(message => (
                        <Row key={message.id}>
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
                    <Col md="auto">
                        <Button onClick={() => setShowAddModal(true)}>Add robot</Button>
                    </Col>
                    <Col md="auto">
                        <Button onClick={() => revalidator.revalidate()}>
                            <div style={{rotate: "30deg"}}>
                                <i className="bi bi-arrow-repeat"></i>
                            </div>
                        </Button>
                    </Col>
                </Row>
                <Row className="g-4 my-1" xs={1} sm={1} md={2} lg={3} xl={3} xxl={4}>
                    {robots._embedded && robots._embedded.robotEntityList.length ? robots._embedded.robotEntityList.map((robot) => (
                        <Col key={robot.id}>
                            <RobotCard robot={robot} setEditRobotId={setEditRobotId} setDeleteRobotId={setDeleteRobotId} />
                        </Col>
                    )) : <Col><p><i>No robots</i></p></Col>}
                </Row>
            </Container>
        </>
    );
}
