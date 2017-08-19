import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavTask from './Containers/Dashboard/NavTask.jsx'

class VideoChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authId: localStorage.idTokenPayload,
      username: '',
      number: '',
      user: this.props.match.params.userId,
      match: this.props.match.params.matchId
    }
    this.makeCall = this.makeCall.bind(this);
    this.endCall = this.endCall.bind(this);
  }

  componentDidMount() {
    var video_out = document.getElementById("vid-box");
    var phone = window.phone = PHONE({
        number        : this.state.user,
        publish_key   : 'pub-c-f2176993-288c-4e3b-b885-c7d2439409d3',
        subscribe_key : 'sub-c-5489ae3c-8375-11e7-9034-1e9edc6dd7f6',
    });    
    // phone.ready(function(){ form.username.style.background="#55ff5b"; });
    phone.receive(function(session){
        session.connected(function(session) { video_out.appendChild(session.video); });
        session.ended(function(session) { video_out.innerHTML=''; });
    });
  }

  componentWillUnmount() {
      this.endCall();
  }

  makeCall(e) {
    e.preventDefault();
    if (!window.phone) alert("Enter your name first!");
    else phone.dial(this.state.match);
  }

  endCall() {
    var ctrl = window.ctrl = CONTROLLER(phone);
    ctrl.hangup();
  }

  render() {
    return (
            <div className="videoContainer">
        <div className="left-col">
					<div className="app-title">
						<h1>Task Mon</h1>
					</div>
          <NavTask />
        </div>
        <div className="right-col">
        <div id="vid-box"></div>
        <div className="btn-holder center">
          <button className="chatInputButton btn btn-success" onClick={this.makeCall}>Start call</button>
          <Link to='/users'><button className="chatInputButton btn btn-success" onClick={this.endCall}>End call</button></Link>
        </div>
        </div>
      </div>
    );
  }
}

export default VideoChat;