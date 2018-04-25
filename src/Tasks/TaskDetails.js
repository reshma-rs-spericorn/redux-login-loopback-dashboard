import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: ''
    }
  }
  componentWillMount() {
    this.getMeetup();
  }
  getMeetup() {
    let meetupId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/tasks/${meetupId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          console.log("sda")
          console.log(this.state);
        })
      })
      .catch(err => console.log("error"));
  }

  onDelete() {
    let meetupId = this.state.details.id;
    axios.delete(`http://localhost:3000/api/tasks/${meetupId}`)
      .then(response => {
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <br />
        <Link to={`/projects/${this.state.details.projectsId}/tasks`} className="btn grey">Back</Link>
        <h3> {this.state.details.name}</h3>
        <ul className="collection">
          <li className="collection-item">Start Date: {this.state.details.startdate}</li>
          <li className="collection-item">End Date: {this.state.details.enddate}</li>
          <li className="collection-item">Comment: {this.state.details.comment}</li>
          <li className="collection-item">Description: {this.state.details.description}</li>
          <li className="collection-item">Log Time: {this.state.details.logtime}</li>
          <li className="collection-item">Priority: {this.state.details.priority}</li>
          <li className="collection-item">Status: {this.state.details.status}</li>
          <li className="collection-item">Task Assigned: {this.state.details.taskassigned}</li>
          <li className="collection-item">File: {this.state.details.file}</li>
        </ul>
        <Link className="btn" to={`/tasks/edit/${this.state.details.id}`}>Edit</Link>
        <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
      </div >

    )
  }
}

export default TaskDetails;