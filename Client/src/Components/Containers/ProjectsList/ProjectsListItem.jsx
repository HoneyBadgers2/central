import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {projectTree} from '../../../Actions/index.js';

class ProjectsListItem extends Component {
  constructor(props){
    super(props);
    this.getTaskTree = this.getTaskTree.bind(this);
  }
  getTaskTree(){
    axios.get('/allChildTasks', {params: {taskid: this.props.projectsListItem.id}})
    .then(resp => {
      console.log('this is in the projectslistitem', resp)
      let totals = resp.data.pop();
      let tree = this.props.projectsListItem;
      console.log('this is the getTaskTree', tree)
      tree.children = resp.data;
      tree.timeAlloted = [tree.budget_hours + totals.budgetTotal, tree.actual_hours + totals.actualTotal];
      this.props.projectTree(tree);
    })
  }

  render(){
    return(
      
      <div className="tasksListItemContainer">
        <div className="tasksListItemCircle">
          <img className="tasksListItemCircleImage" src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"/>
        </div>
        <Link to='/tasksTree'><div className="tasksListItemTitle" onClick={this.getTaskTree}>{this.props.projectsListItem.name}</div></Link>
      </div>
    )
  }
  
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({projectTree}, dispatch);
}

export default connect(null, mapDispatchToProps)(ProjectsListItem);

