import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar1 extends Component {
  render() {
    return (
      <div>
        <nav className="blue darken-3">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo center">Dashboard</a>
            {/* <a data-activates="main-menu" className="button-collapse show-on-large">
              <i className="fa fa-bars"></i>
            </a>
             <ul className="right hide-on-small-only">
                <li><Link to="/projects"><i className="fa fa-users"></i> Projects</Link></li>

            </ul>
            <ul className="side-nav" id="main-menu">
              <li><Link to="/meetups"><i className="fa fa-users"></i> MEETUPS</Link></li>-->
              <li><Link to="/meetups/add"><i className="fa fa-plus"></i> Add MEETUP</Link></li>
              <li><Link to="/projects"><i className="fa fa-users"></i> Projects</Link></li>
              <li><Link to="/projects/add"><i className="fa fa-plus"></i> Add Project</Link></li>
              <li><Link to="/card"><i className="fa fa-tasks"></i> Cards</Link></li>
              <li><Link to="/files"><i className="fa fa-file"></i> Files</Link></li>
              <li><Link to="/about"><i className="fa fa-question-circle"></i> About</Link></li>
              <li><Link to="/tasks"><i className="fa fa-question-circle"></i> tasks</Link></li>
            </ul>*/}
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar1;