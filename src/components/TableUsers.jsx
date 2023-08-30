import "../App.scss";
import _, { debounce } from "lodash";
import { fetchAllUsers, searchUsers } from "../services/UserServices";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";
import AddNewModal from "./AddNewModal";
import EditUserModal from "./EditUserModal";
import ConfirmModal from "./ConfirmModal";

const TableUsers = () => {
  //---fetch Data Users---
  const [data, setData] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUsers(page);
  }, [page]);

  const getUsers = async (handlePage) => {
    let res = await fetchAllUsers(handlePage);
    if (res?.data) {
      setData(res.data);
      setListUsers(res.data);
    }
  };

  const handlePageClick = (e) => {
    // getUsers(+e.selected + 1);
    setPage(+e.selected + 1);
  };

  //---handle Add User---
  const [showAddNew, setShowAddNew] = useState(false);
  const handleCloseAddNew = () => setShowAddNew(false);
  const handleShowAddNew = () => setShowAddNew(true);

  const handleUpdateUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

  //---handle Edit User---
  const [showEditUser, setShowEditUser] = useState(false);
  const handleCloseEditUser = () => setShowEditUser(false);

  const handleShowEditUser = (user) => {
    setDataUser(user);
    setShowEditUser(true);
  };

  const handleEditUser = (user) => {
    let cloneListUsers = _.cloneDeep(data);
    let index = listUsers.findIndex((item) => {
      const abc = item.id === user.id;
      return abc;
    });
    cloneListUsers[index] = user;
    setListUsers(cloneListUsers);
  };

  //---handle Delete---
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDeleteUser = () => setShowDelete(false);
  const handleDelete = (user) => {
    setDataUser(user);
    setShowDelete(true);
  };

  const handleDataDelete = (user) => {
    let cloneListUsers = _.cloneDeep(data);
    cloneListUsers = cloneListUsers.filter((item) => {
      return item.id !== user.id;
    });
    setListUsers(cloneListUsers);
  };

  //---handle Sort---
  // const [sortBy, setSortBy] = useState("asc");
  // const [sortField, setSortField] = useState("id");
  const handleSort = (sortBy, sortField) => {
    // setSortBy(sortBy);
    // setSortField(sortField);
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  };

  //---handle search---
  const handleChangeSearch = debounce(async (value) => {
    // let cloneListUsers = _.cloneDeep(data);
    if (value) {
      // cloneListUsers = cloneListUsers.filter((item) =>
      //   item.email.includes(value));
      let res = await searchUsers(value);
      setListUsers(res.data);
    } else {
      getUsers(page);
    }
  }, 1000);

  //---handle Export---
  const [dataExport, setDataExport] = useState([]);
  const getExport = (event, done) => {
    console.log("done :", done);
    console.log("event :", event);
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  return (
    <>
      <div className="wrap-title">
        <div className="my-3">
          <h5>List Users:</h5>
          <input
            placeholder="Please enter keyword"
            onChange={(e) => handleChangeSearch(e?.target.value)}
          />
        </div>
        <div className="wrap-btn">
          <div className="import">
            <label htmlFor="test" className="btn btn-warning">
              <input type="file" id="test" hidden />
              <i className="fa-solid fa-file-import"></i>
              <span className="btn-content">Import</span>
            </label>
          </div>
          <div className="export">
            <CSVLink
              className="btn btn-primary"
              filename="list-users"
              data={dataExport}
              asyncOnClick={true}
              onClick={getExport}
            >
              <i className="fa-solid fa-file-export"></i>
              <span className="btn-content">Export</span>
            </CSVLink>
          </div>
          <div className="add-new">
            <button className="btn btn-success" onClick={handleShowAddNew}>
              <i className="fa-solid fa-circle-plus"></i>
              <span className="btn-content">Add new</span>
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
