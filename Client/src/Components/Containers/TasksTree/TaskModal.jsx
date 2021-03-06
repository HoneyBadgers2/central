import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import io from 'socket.io-client';

export default (props) => {
  console.log('TaskModal:', props);
  return (
    <Modal show={props.showModal} onHide={props.toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="createTask">
            <h1>create a task</h1>
            <form onSubmit={(e) => {e.preventDefault(); props.handleTaskForm(taskForm.value, assigneeForm.value, budgetHours.value, description.value);}}>
              <div className="form-group">
                <label htmlFor="nameForm">Task</label>
                <input type="text" className="form-control" name="task" id="taskForm" placeholder="please enter a task" onChange={props.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="assignee">Assignee</label>
                {/* <input type="text" className="form-control" name="assignee" id="assigneeForm" placeholder="please enter a name" onChange={props.handleChange}/> */}
                <select id="assigneeForm" name="assignee" onChange={props.handleChange}>
                  {props.users.map((user, index) => {
                    if (user.status === 'Active') {
                      return (
                        <option value={"{ username: '" + user.username + "', image: '" + user.image +"'}"} key={index}>{user.username} - {user.title}</option>
                      )
                    } else {
                      return null;
                    }
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="budgetHours">Budget Hours</label>
                <input type="text" className="form-control" name="budgetHours" id="budgetHours" placeholder="please enter expected hours" onChange={props.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="description">Task description</label>
                <textarea className="form-control" rows="3" name="description" id="description" placeholder="please enter a description" onChange={props.handleChange}></textarea>
              </div>
            </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="info" onClick={(e)=> {e.preventDefault(); props.handleTaskForm(taskForm.value, assigneeForm.value, budgetHours.value, description.value);}}>Create Task</Button>
        <Button bsStyle="danger" onClick={props.toggleModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
