import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../services/UserServices";
import { toast } from "react-toastify";

function ConfirmModal({ handleClose, handleShow, dataUser, handleDataDelete }) {
  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(dataUser.id);
      handleClose();
      toast.success("A User is deleted succeed!");
      handleDataDelete(dataUser);
    } catch (e) {
      toast.error(e);
    }
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
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>
            Did you make sure to delete user{" "}
            <b>
              {dataUser.first_name} {dataUser.last_name}
            </b>
            ?
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleConfirm} variant="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
