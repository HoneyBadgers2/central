import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom'

const UserComponent = (props) => {


  return(
    <div className="tasksListItemContainer">
      <div className="tasksListItemCircle">
        <img className="tasksListItemCircleImage" src={props.user.image}/>
      </div>
      <div className="tasksListItemTitle">{props.user.username}<br></br>{props.user.title} - <strong>{props.user.status}</strong></div>
      <Link to={"/videoChat/" + props.profile.nickname + '/' + props.user.username}><button className="chatInputButton btn btn-success" style={{float: "right"}}>Video Chat</button></Link>
    </div>
  )
}

export default withRouter(UserComponent);
