import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { editUser } from "../services/UserServices";

function EditUserModal({ handleClose, handleShow, handleEditUser, dataUser }) {
  const [formData, setFormData] = useState({
    name: "",
    job: "",
  });
  console.log("formData :", formData);
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      let res = await editUser(formData);
      console.log("res :", res);
      handleClose();
      toast.success("A User is edited succeed!");
      handleEditUser({ first_name: res.name, id: dataUser.id });
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    if (handleShow) {
      setFormData({ name: dataUser.first_name });
    }
  }, [dataUser]);

  const handleInputChange = (e) => {
    console.log("e :", e);
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
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData?.name || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="job">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Job"
                name="job"
                value={formData?.job || ""}
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
