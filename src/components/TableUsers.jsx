import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserServices";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AddNewModal from "./AddNewModal";
import "../App.scss";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res?.data) {
      setListUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (e) => {
    getUsers(+e.selected + 1);
  };

  const hanleUpdateUser = (user) => {
    setListUsers([user, ...listUsers]);
  };
  return (
    <>
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

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeClassName="active"
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
      />

      <AddNewModal
        handleClose={handleClose}
        handleShow={show}
        hanleUpdateUser={hanleUpdateUser}
      />
    </>
  );
};

export default TableUsers;
