import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import NavTask from '../Dashboard/NavTask.jsx';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import $ from 'jquery';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'xdbilvan';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dnlk126yf/upload';


class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadedFileCloudinaryUrl: {},
      messages: []
    }
    this.submitMessage = this.submitMessage.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
  }

  componentDidMount() {
    this.socket = io('/');
    this.socket.on('message', message => {
      let newMessage = {
        body: message.body.body,
        username: message.body.username.nickname,
        picture: message.body.username.image,
      }
      this.state.messages.push(newMessage)
      this.forceUpdate();
    });
    $(".chatInputButton").click(function() {
      $(".messagesContainer").animate({ scrollTop: $(".messagesContainer").height() + 500 }, "slow");
    });
    $(document).keypress(function(e) {
      if(e.which == 13) {
        $(".messagesContainer").animate({ scrollTop: $(".messagesContainer").height() + 500 }, "slow");
      }
    });
  }

   onImageDrop(files) {
        this.submitMessage(files[0].name);
        this.handleImageUpload(files[0]);
    }

  handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                let temp = {};
                temp[file.name] = response.body.secure_url;
                this.setState({
                    uploadedFileCloudinaryUrl: Object.assign({}, temp, this.state.uploadedFileCloudinaryUrl)      
                });

                 console.log(response.body);
            }
        });
        
    }

  submitMessage(draganddrop) {
    const body = $('.chatInput').val() || draganddrop;
    if (body) {
      const message = {
        body,
        username: 'Me',
        picture: this.props.profile.image,
      }
      this.state.messages.push(message)
      this.forceUpdate();
      this.socket.emit('message', {body, username: this.props.profile})
      $('.chatInput').val('');
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      console.log('message', message)
      return (<ul className="chatMessageContainer" key={index}>
        <div className="chatImageContainer"><img className="chatImageContainerImage" src={message.picture}></img></div>
        { (message.body in this.state.uploadedFileCloudinaryUrl) ?
        <div className="message"><b>{message.username + ' : '}</b><a href={this.state.uploadedFileCloudinaryUrl[message.body]} download>{message.body}</a></div> :
        <div className="message"><b>{message.username + ' : '}</b>{message.body}</div>
        }
        </ul>
        
        )
    })
    return(
      <div className="dashboard-container">
        <div className="left-col">
					<div className="app-title">
						<h1>Task Mon</h1>
					</div>
          <NavTask />
        </div>
        <div className="chatContainer">
					<div className="dashboard-title">
						<h1 className="pull-left">Chat</h1>
					</div>
          <div className="chatListContainer">    
                <div className="messagesContainer">
                  {messages}
                </div>        
            <div>
              <input className="chatInput" type="text" placeholder='Enter a message...' onKeyPress={(e) => {if(e.key === 'Enter') {this.submitMessage()}}}></input>
              <button className="chatInputButton btn btn-success" onClick={this.submitMessage}>Send Message</button>
              <Dropzone onDrop={this.onImageDrop}>
                  <p>Try dropping some files here</p>
              </Dropzone>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      profile: state.tasks.profile
    }
}

export default connect(mapStateToProps)(Chat);
