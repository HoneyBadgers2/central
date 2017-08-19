import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTasks} from '../../../Actions/index.js';
import NavTask from '../Dashboard/NavTask.jsx';
import UserComponent from './UserComponent.jsx';
import { Button, Modal } from 'react-bootstrap';


class UserList extends Component{
  constructor(props) {
    super(props);
  }
 
  render() {
    return(
      <div className="dashboard-container">
        <div className="left-col">
					<div className="app-title">
						<h1>Task Mon</h1>
					</div>
          <NavTask />
        </div>
        <div className="right-col">
					<div className="dashboard-title">
						<h1 className="pull-left">Users</h1>
            <Button bsStyle="success" onClick={() => {alert('You are using the basic version. Please upgrade in order to use this feature!')}}>Add/Update User</Button>
					</div>
          <div className="tasksListContainer">
            <div>
               {
                this.props.users.map((user, index) =>
                  <UserComponent user={user} profile={this.props.profile} key={index}/>
                )
              } 
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return { 
    users: state.tasks.allUsers,
    profile: state.tasks.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
