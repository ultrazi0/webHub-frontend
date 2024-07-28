import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import RootAlert from "./RootComponents/RootAlert";
import AddRobotModal from "./RootComponents/AddRobotModel";
import useFetcherWithReset from "../useFetcherWithReset";


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

export async function addRobotAction({ request, params }) {
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

    if (formData.get("name").length) {
        return true;
    } else {
        return false;
    }

    return success;
}

export default function Root() {
    const { robots } = useLoaderData();
    const [showAddModal, setShowAddModal] = useState(false);
    const fetcher = useFetcherWithReset({ key: "add-robot" });

    const [messages, setMessages] = useState([]);

    if (fetcher.data === true) {
        setShowAddModal(false);
        setMessages([
            ...messages,
            {
                variant: "success",
                message: "New robot has been created!",
                createdAt: Date.now()
            }
        ]);
        fetcher.reset();
    }

    console.log("I have just been rendered!")

    return (
        <>
            <div>
                {
                    messages.map(message => (
                        <RootAlert key={message.createdAt} variant={message.variant} message={message.message} />
                    ))
                }
            </div>
            <AddRobotModal showModal={showAddModal} setShowModal={setShowAddModal} />
            <h1>Home</h1>
            <Button onClick={() => setShowAddModal(true)}>Add robot</Button>
            <Link to={"control-panel"}>If you want to play</Link>
            <ul>
                {robots.length ? robots.map((robot) => (
                    <li key={robot.id}>
                        <Link to={"control-panel/" + robot.name}>{robot.name}</Link>
                    </li>
                )) : <li><p><i>No robots</i></p></li>}
            </ul>
        </>
    );
}
