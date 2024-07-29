import { useFetcher } from "react-router-dom";
import { Modal, ModalHeader, ModalTitle, ModalBody, FormGroup, FormLabel, FormControl, ModalFooter, Button, FormText } from "react-bootstrap";
import useFetcherWithReset from "../../useFetcherWithReset";

export default function AddRobotModal({ fetcher, showModal, setShowModal }) {

    const handleCloseModal = () => {
        setShowModal(false);
        fetcher.reset();
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={true}>
            <ModalHeader closeButton>
                <ModalTitle>Add robot</ModalTitle>
            </ModalHeader>
            <fetcher.Form method="post">
                <ModalBody>
                    <FormGroup className="mb-3" controlId="fromName">
                        <FormLabel>Robot name</FormLabel>
                        <FormControl type="text" placeholder="Enter robot name" name="name" />
                        {fetcher.data === false && <FormText className="text-danger-emphasis">This name is already taken</FormText>}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button type="submit" variant="primary">Add</Button>
                </ModalFooter>
            </fetcher.Form>
        </Modal>
    );
}