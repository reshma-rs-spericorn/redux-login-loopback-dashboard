import React, { Component } from 'react';
import axios from 'axios';
import { Link, browserHistory, withRouter } from 'react-router-dom';

class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      details: ''
    }
  }

  onDelete() {
    let meetupId = this.state.item.id;
    axios.delete(`http://localhost:3000/api/projects/${meetupId}`)
      .then(response => {
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }
  render() {
    return (
      <div>

        <hr />
        <div className="row">
          <div className="col s3"><Link to={`/projects/${this.state.item.id}/tasks`}>{this.state.item.name}</Link>
          </div>
          <div className="col s3">{this.state.item.startdate}
          </div>
          <div className="col s3">{this.state.item.enddate}
          </div>
          <div className="col s3"><ul className="actions">
            <li><Link to={`/projects/edit/${this.state.item.id}`}><i className="fa fa-edit"></i></Link></li>
            <li onClick={this.onDelete.bind(this)}><a><i className="fa fa-trash"></i></a></li></ul>
          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(ProjectItem);
