import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { postUsers } from "../services/UserServices";
import { toast } from "react-toastify";

function AddNewModal({ handleClose, handleShow, hanleUpdateUser }) {
  const [formData, setFormData] = useState({
    name: "",
    job: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await postUsers(formData);
      handleClose();
      setFormData({ name: "", job: "" });
      toast.success("A User is created succeed!");
      hanleUpdateUser({ id: res.id, first_name: res.name });
    } catch (e) {
      toast.error(e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal show={handleShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="job">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Job"
                name="job"
                value={formData.job}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewModal;
