import "./App.scss";
import TableUsers from "./components/TableUsers";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import AddNewModal from "./components/AddNewModal";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="wrap-title">
          <div className="my-3">
            <h5>List Users:</h5>
          </div>
          <div className="wrap-btn">
            <div className="import">
              <button className="btn btn-warning">Import</button>
            </div>
            <div className="export">
              <button className="btn btn-primary">Export</button>
            </div>
            <div className="add-new">
              <button className="btn btn-success" onClick={handleShow}>
                Add new
              </button>
            </div>
          </div>
        </div>
        <TableUsers />
      </Container>

      <AddNewModal handleClose={handleClose} handleShow={show} />
    </div>
  );
}

export default App;
