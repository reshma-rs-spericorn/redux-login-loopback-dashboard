import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      startdate: '',
      enddate: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentWillMount() {
    this.getMeetupDetails();
  }

  getMeetupDetails() {
    //get id from url
    let meetupId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/projects/${meetupId}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          startdate: response.data.startdate,
          enddate: response.data.enddate
        }, () => {
          console.log(this.state);
        });
      })
      .catch(err => console.log("error"));
  }
  editMeetup(newMeetup) {
    axios.request({
      method: 'put',
      url: `http://localhost:3000/api/projects/${this.state.id}`,
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
    this.editMeetup(newMeetup);
    e.preventDefault();
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <br />
        <Link to="/projects" className="btn grey">Back</Link>
        <h3>Edit project</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
            <label htmlFor="name"> Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="startdate" ref="startdate" value={this.state.startdate} onChange={this.handleInputChange} />
            <label htmlFor="startdate"> start date</label>
          </div>
          <div className="input-field">
            <input type="text" name="enddate" ref="enddate" value={this.state.enddate} onChange={this.handleInputChange} />
            <label htmlFor="enddate">end date</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div >

    )
  }
}

export default EditProject;