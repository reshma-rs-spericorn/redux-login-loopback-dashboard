import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AddProject extends Component {
  addMeetup(newMeetup) {
    axios.request({
      method: 'post',
      url: "http://localhost:3000/api/projects",
      data: newMeetup
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }
  onSubmit(e) {
    const newMeetup = {
      name: this.refs.name.value,
      startdate: this.refs.startdate.value,
      enddate: this.refs.enddate.value
    }
    this.addMeetup(newMeetup);
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <br />
        <Link to="/projects" className="btn grey">Back</Link>
        <h3>Add project</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" />
            <label htmlFor="name"> Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="startdate" ref="startdate" />
            <label htmlFor="startdate"> start date</label>
          </div>
          <div className="input-field">
            <input type="text" name="enddate" ref="enddate" />
            <label htmlFor="enddate"> end date</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
        <div className="fixed-action-btn">
          <Link to="/projects/add" className="btn-floating btn-large red">
            <i className="fa fa-plus"></i></Link>
        </div>
      </div >

    )
  }
}

export default AddProject;