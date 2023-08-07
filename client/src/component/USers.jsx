import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function USers() {
  const [users, setUsers] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const loadData = () => {
    axios
      .get("http://localhost:3000/api/v1/users")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/users/${id}`, users)
      .then((res) => {
        console.log(`Xóa thành công`);
        loadData();
      })
      .catch((err) => console.log(err));
  };
  //   create
  const handleShowCreate = () => setShowCreate(true);
  const [newUser, setNewUser] = useState({
    name: "",
    description: "",
  });
  const handleCreat = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCloseCreate = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/v1/users`, newUser)
      .then((res) => {
        loadData();
        setShowCreate(false);
      })
      .catch((err) => console.log(err));
  };
  // Edit
  const [editUser, setEditUser] = useState({
    name: "",
    description: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = (id) => {
    const userEdit = users.find((user) => user.id == id);
    if (userEdit) {
      setEditUser(userEdit);
      setShowEdit(true);
    }
  };
  const handleEditUser = (e) => {
    const { name, value } = e.target;
    setEditUser({
      ...editUser,
      [name]: value,
    });
  };
  const handleCloseEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/v1/users/${editUser.id}`, editUser)
      .then((res) => {
        loadData();
        setShowEdit(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={handleShowCreate}
      >
        Create Student
      </button>
      {/* {form} */}
      <form>
        <Modal show={showCreate} onHide={handleCloseCreate}>
          <Modal.Header closeButton>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleCreat}
              />
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={handleCreat}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseCreate}>
              Success
            </Button>
          </Modal.Footer>
        </Modal>
      </form>

      <h1>Student List</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((element, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{element.name}</td>
              <td>{element.description}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleShowEdit(element.id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(element.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <Modal show={showEdit} onHide={() => setShowEdit(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Updata User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={editUser.name}
                onChange={handleEditUser}
              />
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={editUser.description}
                onChange={handleEditUser}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseEdit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
}
