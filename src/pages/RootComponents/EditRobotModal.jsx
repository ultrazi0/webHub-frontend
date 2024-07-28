import { Button, FormControl, FormGroup, FormLabel, FormText, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import useFetcherWithReset from "../../useFetcherWithReset";
import { useEffect, useState } from "react";

export default function EditRobotModal({ robotId, setRobotId }) {
    const fetcher = useFetcherWithReset({ key: "edit-robot" });
    const [robot, setRobot] = useState(null);

    const handleCloseModal = () => {
        setRobotId(null);
        setRobot(null);
        fetcher.reset();
    }

    useEffect(() => {
        let ignore = false;
        if (robotId != null) {
            fetch("/api/getRobotById?id=" + robotId)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("No robot with this ID or bad request");
            })
            .then(json => {
                if (!ignore) {
                    setRobot(json);
                }
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            if (robot != null) {
                setRobot(null);
            }
        }

        return () => {
            ignore = true;
        }
    }, [robotId]);

    console.log(robot);

    return (
        <Modal show={robot != null} onHide={handleCloseModal} backdrop="static" keyboard={true}>
            <ModalHeader closeButton>
                <ModalTitle>Edit robot</ModalTitle>
            </ModalHeader>
            <fetcher.Form method="post" action={"/edit/" + robotId}>
                <ModalBody>
                    <FormGroup className="mb-3" controlId="formName">
                        <FormLabel>Robot name</FormLabel>
                        <FormControl type="text" placeholder="Enter robot name" name="name" defaultValue={robot ? robot.name : ""} />
                        {fetcher.data === false && <FormText className="text-danger-emphasis">This name is already taken</FormText>}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button type="submit" variant="primary">Save</Button>
                </ModalFooter>
            </fetcher.Form>
        </Modal>
    );
} 