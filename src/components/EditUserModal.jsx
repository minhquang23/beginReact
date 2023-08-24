import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { editUser } from "../services/UserServices";

function EditUserModal({ handleClose, handleShow, handleEditUser, dataUser }) {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    job: "",
  });
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      let res = await editUser(dataUser.id, formData);
      handleClose();
      toast.success("A User is edited succeed!");
      handleEditUser(res.data);
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    if (handleShow) {
      setFormData({
        email: dataUser.email,
        first_name: dataUser.first_name,
        last_name: dataUser.last_name,
        job: dataUser.job,
      });
    }
  }, [dataUser, handleShow]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal
        show={handleShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
          <Button onClick={handleEdit} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUserModal;
