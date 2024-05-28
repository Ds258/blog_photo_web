import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

export default function Popup(heading, body) {
    const [show, setShow] = useState(false);

    const handleModal = () => setShow(false);

    return (
        <Modal show={show} onHide={handleModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{body}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={setShow(false)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}