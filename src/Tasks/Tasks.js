import React, { Component } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { Link } from 'react-router-dom';

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      meetups: []
    }
  }

  componentWillMount() {

    this.getMeetups();
  }
  getMeetups() {
    let meetupId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/projects/${meetupId}/tasks`)
      .then(response => {
        this.setState({ meetups: response.data }, () => {
          //console.log(this.state);
        })
      })
      .catch(err => console.log("error"));
  }
  render() {
    let meetupId = this.props.match.params.id;
    const meetupItems = this.state.meetups.map((meetup, i) => {
      return (
        <TaskItem key={meetup.id} item={meetup} />
      )
    })
    return (
      <div>
        <br />
        <Link to={`/projects`} className="btn grey">Back</Link>
        <h3>Tasks</h3>
        <ul className="collection">
          {meetupItems}
        </ul>
        <div className="fixed-action-btn">
          <Link to={`/projects/${meetupId}/tasks/add`} className="btn-floating btn-large red">
            <i className="fa fa-plus"></i></Link>
        </div>
      </div>
    )
  }
}

export default Tasks;