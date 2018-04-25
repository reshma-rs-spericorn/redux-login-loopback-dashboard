import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

import Projects from "../Projects/Projects";
import ProjectDetails from '../Projects/ProjectDetails';
import AddProject from "../Projects/AddProject";
import EditProject from "../Projects/EditProject";
import Tasks from "../Tasks/Tasks";
import TaskDetails from '../Tasks/TaskDetails';
import AddTask from "../Tasks/AddTask";
import EditTask from "../Tasks/EditTask";
import Navbar from '../Navbar/Navbar';
import Navbar1 from '../Navbar1/Navbar1';


class App extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {

            // clear alert on location change
            dispatch(alertActions.clear());
        });

    }

    render() {

        const { alert } = this.props;
        var nav = location.pathname
        console.log(nav)

        var loginButton;
        if (location.pathname == '/login' || location.pathname == '/register') {
            loginButton = <Navbar1 />;
        } else {
            loginButton = <Navbar />;
        }

        return (

            < div >
                <div className="jumbotron">
                    <div className="container-fluid">
                        <div className="col-sm-12 col-sm-offset-2">
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }

                            <Router history={history}>
                                <div>
                                    {loginButton}
                                    <div className="container">

                                        <PrivateRoute exact path="/" component={HomePage} />
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/register" component={RegisterPage} />
                                        <Route exact path="/projects/:id/tasks/add" component={AddTask} />
                                        <Route exact path="/tasks/edit/:id" component={EditTask} />
                                        <Route exact path="/projects/:id/tasks/:id" component={TaskDetails} />
                                        <Route exact path="/projects/:id/tasks" component={Tasks} />
                                        <Route exact path="/projects/add" component={AddProject} />
                                        <Route exact path="/projects/edit/:id" component={EditProject} />
                                        {/*} < exactRoute path="/projects/:id" component={ProjectDetails} />*/}
                                        <Route exact path="/projects" component={Projects} />
                                    </div>
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 