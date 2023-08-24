import "../App.scss";
import _ from "lodash";
import { fetchAllUsers } from "../services/UserServices";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AddNewModal from "./AddNewModal";
import EditUserModal from "./EditUserModal";
import ConfirmModal from "./ConfirmModal";

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [dataUser, setDataUser] = useState({});

  const [showAddNew, setShowAddNew] = useState(false);
  const handleCloseAddNew = () => setShowAddNew(false);
  const handleShowAddNew = () => setShowAddNew(true);

  const [showEditUser, setShowEditUser] = useState(false);
  const handleCloseEditUser = () => setShowEditUser(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDeleteUser = () => setShowDelete(false);

  const [sortBy, setSortBy] = useState("asc");
  console.log("sortBy :", sortBy);
  const [sortField, setSortField] = useState("id");
  console.log("sortField :", sortField);
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
  };

  const handleShowEditUser = (user) => {
    setDataUser(user);
    setShowEditUser(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (handlePage) => {
    let res = await fetchAllUsers(handlePage);
    if (res?.data) {
      setListUsers(res.data);
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
    let index = listUsers.findIndex((item) => {
      const abc = item.id === user.id;
      return abc;
    });
    cloneListUsers[index] = user;
    setListUsers(cloneListUsers);
  };

  const handleDelete = (user) => {
    setDataUser(user);
    setShowDelete(true);
  };

  const handleDataDelete = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => {
      return item.id !== user.id;
    });
    setListUsers(cloneListUsers);
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
            <button className="btn btn-success" onClick={handleShowAddNew}>
              Add new
            </button>
          </div>
        </div>
      </div>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr className="align-center">
            <th>
              <div className="sort-wrap">
                <span>ID</span>
                <span className="sort-icon">
                  <i
                    className="fa-solid fa-sort-up"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-sort-down"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <span>Email</span>
            </th>
            <th>
              <div className="sort-wrap">
                <span>First Name</span>{" "}
                <span className="sort-icon">
                  <i
                    className="fa-solid fa-sort-up"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-sort-down"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <div className="sort-wrap">
                <span>Last Name</span>{" "}
                <span className="sort-icon">
                  <i
                    className="fa-solid fa-sort-up"
                    onClick={() => handleSort("asc", "last_name")}
                  ></i>
                  <i
                    className="fa-solid fa-sort-down"
                    onClick={() => handleSort("desc", "last_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <div className="sort-wrap">
                <span>Job</span>
                <span className="sort-icon">
                  <i
                    className="fa-solid fa-sort-up"
                    onClick={() => handleSort("asc", "job")}
                  ></i>
                  <i
                    className="fa-solid fa-sort-down"
                    onClick={() => handleSort("desc", "job")}
                  ></i>
                </span>
              </div>
            </th>
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

      <ConfirmModal
        handleClose={handleCloseDeleteUser}
        handleShow={showDelete}
        dataUser={dataUser}
        handleDataDelete={handleDataDelete}
      />
    </>
  );
};

export default TableUsers;
