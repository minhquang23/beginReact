import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserServices";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AddNewModal from "./AddNewModal";
import "../App.scss";
import { Button } from "react-bootstrap";
import EditUserModal from "./EditUserModal";
import _ from "lodash";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dataUser, setDataUser] = useState({});

  const [showAddNew, setShowAddNew] = useState(false);
  const handleCloseAddNew = () => setShowAddNew(false);
  const handleShowAddNew = () => setShowAddNew(true);

  const [showEditUser, setShowEditUser] = useState(false);
  const handleCloseEditUser = () => setShowEditUser(false);

  const handleShowEditUser = (user) => {
    setDataUser(user);
    setShowEditUser(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (handlePage) => {
    let res = await fetchAllUsers(handlePage);
    console.log("res :", res);
    if (res?.data) {
      setListUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (e) => {
    getUsers(+e.selected + 1);
  };

  const handleUpdateUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUser = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = cloneListUsers.findIndex((item) => {
      return item.id === user.id;
    });
    cloneListUsers[index].email = user.email;
    cloneListUsers[index].first_name = user.first_name;
    cloneListUsers[index].last_name = user.last_name;
    cloneListUsers[index].job = user.job;
    setListUsers(cloneListUsers);
  };

  const handleDelete = () => {};
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
            <button className="btn btn-success" onClick={handleShowAddNew}>
              Add new
            </button>
          </div>
        </div>
      </div>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr className="align-center">
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`user-${index}`} className="align-center">
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.job}</td>
                  <td>
                    <div className="action-btn">
                      <Button
                        className="btn btn-info"
                        onClick={() => handleShowEditUser(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
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
        pageCount={5}
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
        handleClose={handleCloseAddNew}
        handleShow={showAddNew}
        handleUpdateUser={handleUpdateUser}
      />

      <EditUserModal
        handleClose={handleCloseEditUser}
        handleShow={showEditUser}
        dataUser={dataUser}
        handleEditUser={handleEditUser}
      />
    </>
  );
};

export default TableUsers;
