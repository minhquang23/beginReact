import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { postUsers } from "../services/UserServices";
import { toast } from "react-toastify";

function AddNewModal({ handleClose, handleShow, hanleUpdateUser }) {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    job: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await postUsers(formData);
      console.log("res :", res);
      handleClose();
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        job: "",
      });
      toast.success("A User is created succeed!");
      hanleUpdateUser({
        id: res.data.id,
        email: res.data.email,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        job: res.data.job,
      });
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
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="first_name"
                value={formData.first_name || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="last_name"
                value={formData.last_name || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="job">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Job"
                name="job"
                value={formData.job || ""}
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
            Create New
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewModal;
