import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import API from "./API";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddClient = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [clientId, setClientId] = useState(null);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    refreshClients();
  }, []);

  const refreshClients = () => {
    API.get("/")
      .then((res) => {
        setClients(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, gender, job };
    API.post("/", item).then(() => refreshClients());
  };

  const onUpdate = (id) => {
    let item = { name,gender,job };
    API.patch(`/${id}/`, item).then((res) => refreshClients());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshClients());
  };

  function selectClient(id) {
    let item = clients.filter((client) => client.id === id)[0];
    setName(item.name);
    setGender(item.gender);
    setJob(item.job);
    setClientId(item.id);
  }

  return (
    <div className="container mt-5 mx-auto">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new Client</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{clientId}Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicJob">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(clientId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Client Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Job</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{client.id}</th>
                    <td> {client.name}</td>
                    <td>{client.gender}</td>
                    <td>{client.job}</td>
                    <td>
                      <button type="button" className="btn btn-warning m-2"
                        onClick={() => selectClient(client.id)}
                      >EDIT</button>
                      <button type="button" className="btn btn-danger m-2"
                        onClick={() => onDelete(client.id)}
                      >DELETE</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
