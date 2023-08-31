import TableUsers from "./components/TableUsers";
import Header from "./components/Header";
import Home from "./components/Home";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app-container">
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
