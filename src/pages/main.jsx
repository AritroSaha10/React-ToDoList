import React, { Component, useState } from "react";
import ToDoItem from "../components/ToDoItem";
import moment from "moment";

// React Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class Main extends Component {
  state = {};

  render() {
    return (
      <div className="container text-center">
        <br />

        <div>
          <h2 className="d-inline-block align-middle">Tasks</h2>
          &nbsp;&nbsp;&nbsp;
          {/*
          TODO: Create new task functionality
          */}
          <this.addNewTaskButton />
        </div>

        <div>
          {this.props.toDoItems
            .filter((toDoItem) => toDoItem.completed === false)
            .map((toDoItem) => (
              <ToDoItem
                key={toDoItem.id}
                data={toDoItem}
                onCompletionChange={this.props.onCompletionChange}
              />
            ))}
        </div>

        <br />
        <br />

        <div>
          <h2>Completed</h2>
          {this.props.toDoItems
            .filter((toDoItem) => toDoItem.completed === true)
            .map((toDoItem) => (
              <ToDoItem
                key={toDoItem.id}
                data={toDoItem}
                onCompletionChange={this.props.onCompletionChange}
              />
            ))}
        </div>
      </div>
    );
  }

  validateForm = (data) => {
    let date = moment(
      data.dateMs + " " + data.timeMs,
      "YYYY-MM-DD hh:mm"
    ).valueOf();

    if (String(data.newTaskDescription) === "") {
      return -1;
    }

    if (isNaN(date)) date = 0;
    if (date < 0) date = 0;

    // Submit data
    this.props.addToDoItem({
      completed: false,
      description: data.newTaskDescription,
      dueDate: date,
      id:
        this.props.toDoItems.sort((a, b) => a.id - b.id)[
          this.props.toDoItems.length - 1
        ].id + 1,
    });

    return 1;
  };

  addNewTaskButton = (newTaskFunction) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let newTaskDescription = "";
    let dateMs = "";
    let timeMs = "";

    return (
      <>
        <button
          className="btn btn-primary btn-sm align-middle"
          onClick={handleShow}
        >
          Add New Task
        </button>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              className="form-control"
              placeholder="New task"
              id="newTaskInputField"
              onChange={(e) => (newTaskDescription = e.target.value)}
            />
            <div class="input-group">
              <input
                type="time"
                className="form-control"
                onChange={(e) => {
                  console.log(e.target.value);
                  timeMs = e.target.value;
                }}
              />
              <input
                type="date"
                className="form-control"
                min={"2000-01-01"}
                onChange={(e) => {
                  console.log(e.target.value);
                  dateMs = e.target.value;
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/*
            TODO: Make sure that required fields (ie. task name) are filled out, and dates are normal
            */}
            <Button
              variant="primary"
              onClick={() => {
                if (this.validateForm({ newTaskDescription, dateMs, timeMs }) === 1) handleClose();
                else ; // Handle errors
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
}

export default Main;
