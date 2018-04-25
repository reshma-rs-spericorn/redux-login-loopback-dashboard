import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ProjectDetails extends Component {
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
    axios.get(`http://localhost:3000/api/projects/${meetupId}`)
      .then(response => {
        this.setState({ details: response.data }, () => {
          //console.log(this.state);
        })
      })
      .catch(err => console.log("error"));
  }

  onDelete() {
    let meetupId = this.state.details.id;
    axios.delete(`http://localhost:3000/api/projects/${meetupId}`)
      .then(response => {
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <br />
        <Link to="/projects" className="btn grey">Back</Link>


        <Table responsive striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start</th>
              <th>End </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Link to={`${this.state.details.id}/tasks`}>{this.state.details.name}</Link></td>
              <td>{this.state.details.startdate}</td>
              <td>{this.state.details.enddate}</td>
              <td>
                <ul className="actions">
                  <li><Link to={`/projects/edit/${this.state.details.id}`}><i className="fa fa-edit"></i></Link></li>
                  <li onClick={this.onDelete.bind(this)} ><a><i className="fa fa-trash"></i></a></li></ul></td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default ProjectDetails;



