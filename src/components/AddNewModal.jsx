import { Modal, Button, Form } from "react-bootstrap";

function AddNewModal({ handleClose, handleShow }) {
  const handleSave = (e) => {
    console.log(e);
  };
  const handleFormValues = (e) => {
    console.log("e :", e.target.value);
  };
  return (
    <>
      <Modal show={handleShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onChange={handleFormValues}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="job">
              <Form.Label>Job</Form.Label>
              <Form.Control type="text" placeholder="Enter Job" name="job" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewModal;
