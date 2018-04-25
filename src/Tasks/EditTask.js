import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      startdate: '',
      enddate: '',
      projectsId: '',
      taskassigned: '',
      status: '',
      logtime: '',
      priority: '',
      file: '',
      comment: '',
      description: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getMeetupDetails();
  }

  getMeetupDetails() {
    let meetupId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/tasks/${meetupId}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          startdate: response.data.startdate,
          enddate: response.data.enddate,
          taskassigned: response.data.taskassigned,
          status: response.data.status,
          logtime: response.data.logtime,
          file: response.data.file,
          comment: response.data.comment,
          priority: response.data.priority,
          description: response.data.description,
          projectsId: response.data.projectsId
        }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  editMeetup(newMeetup) {

    axios.request({
      method: 'put',
      url: `http://localhost:3000/api/projects/${this.state.projectsId}/tasks/${this.state.id}`,
      data: newMeetup
    }).then(response => {
      this.props.history.push(`/projects/${this.state.projectsId}/tasks`);
    }).catch(err => console.log(err));
  }

  onSubmit(e) {
    const newMeetup = {
      name: this.refs.name.value,
      startdate: this.refs.startdate.value,
      enddate: this.refs.enddate.value,
      taskassigned: this.refs.taskassigned.value,
      status: this.refs.status.value,
      file: this.refs.file.value,
      comment: this.refs.comment.value,
      priority: this.refs.priority.value,
      logtime: this.refs.logtime.value,
      description: this.refs.description.value
    }
    this.editMeetup(newMeetup);
    e.preventDefault();
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <br />
        <Link className="btn grey" to={`/projects/${this.state.projectsId}/tasks/${this.props.match.params.id}`}>Back</Link>
        <h1>Edit Task</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="name">Name</label>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
          </div>
          <label htmlFor="name">Start Date</label>
          <div className="input-field">
            <input placeholder="Start Date" type="text" name="startdate" ref="startdate" value={this.state.startdate} onChange={this.handleInputChange} />
          </div>
          <label htmlFor="name">End Date</label>
          <div className="input-field">
            <input placeholder="End Date" type="text" name="enddate" ref="enddate" value={this.state.enddate} onChange={this.handleInputChange} />
          </div>
          <label htmlFor="name">Description</label>
          <div className="input-field">
            <textarea type="text" name="description" ref="description" value={this.state.description} onChange={this.handleInputChange} className="materialize-textarea" />
          </div>
          <label htmlFor="name">Comment</label>
          <div className="input-field">
            <input type="text" name="comment" ref="comment" value={this.state.comment} onChange={this.handleInputChange} />
          </div>
          <label htmlFor="name">Log Time</label>
          <div className="input-field">
            <input type="text" name="logtime" ref="logtime" value={this.state.logtime} onChange={this.handleInputChange} />
          </div>
          <label htmlFor="name">Priority</label>
          <select name="priority" ref="priority" className="input-field browser-default" value={this.state.priority} onChange={this.handleInputChange}>
            <option value="" disabled="disabled" selected="selected" className="default">Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <br />
          <label htmlFor="name">Task Assigned</label>
          <select name="taskassigned" ref="taskassigned" className="input-field browser-default" value={this.state.taskassigned} onChange={this.handleInputChange}>
            <option value="" disabled="disabled" selected="selected">Task assigned</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
          <br />
          <label htmlFor="name">Status</label>
          <select name="status" ref="status" className="input-field browser-default" value={this.state.status} onChange={this.handleInputChange}>
            <option value="" disabled="disabled" selected="selected">Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <br />
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" name="file" ref="file" value={this.state.file} onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="input-field">
            <input placeholder="Meetup id" type="text" name="projectsId" ref="projectsId" value={this.state.projectsId} onChange={this.handleInputChange} hidden />
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default EditTask;