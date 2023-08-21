import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function EditUserModal({
  handleClose,
  handleShow,
  handleUpdateUser,
  dataUser,
}) {
  const [formData, setFormData] = useState({
    name: "",
    job: "",
  });
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      toast.success("A User is created succeed!");
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
    const { name, value } = e.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
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
