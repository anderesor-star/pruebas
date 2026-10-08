import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import axios from 'axios';
import {FortAwesomeIcon} from '@fortawesome/react-fontawesome';

import NavigationContainer from './navigation/navigation-container';
import home from './pages/home';
import about from './pages/about';
import contact from './pages/contact';
import blog from './pages/blog';
import BlogDetail from './pages/blog-detail';
import portfolioManager from './pages/portfolio-manager';
import portfolioDetail from './portfolio/portfolio-detail';
import Auth from './pages/auth';
import noMatch from './pages/no-match';
import Blog from './pages/blog';
import Icons from './helpers/icon';

export default class App extends Component {
    constructor (props) {
        super(props);

        Icons();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN"
        }

        this.handleSuccessfulLogIn = this.handleSuccessfulLogIn.bind(this);
        this.handleUnSuccessfulLogIn = this.handleUnSuccessfulLogIn.bind(this);
        this.handleSuccessfulLogOut = this.handleSuccessfulLogOut.bind(this);
    }

    handleSuccessfulLogIn() {
        this.setState({
            loggedInStatus: "LOGGED_IN"
        })
    }

    handleUnSuccessfulLogIn() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
        })
    }

    handleSuccessfulLogOut() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
        })
    }

    checkLogInStatus() {
        return axios.get("https://api.devcamp.space/logged_in", {
            withCredentials: true
        }).then(response => {
            const loggedIn = response.data.logged_in;
            const loggedInStatus = this.state.loggedInStatus;

            if (loggedIn && loggedInStatus === "LOGGED_IN") {
                return loggedIn;
            } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
                this.setState({
                    loggedInStatus: "LOGGED_IN"
                })
            } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
                this.setState({
                    loggedInStatus: "NOT_LOGGED_IN"
                })
            }
        }).catch(error => {
            console.log("Error", error);
        });
    }

    componentDidMount() {
        this.checkLogInStatus();
    }

    authorizedPages() {
        return [ 
            <Route key={"portfolio-manager"} exact path="/portfolio-manager" component={portfolioManager} />
        ]
    }

    render() {
        return ( 
        <div className = 'container' >
            <Router>
                <div>
                    <NavigationContainer 
                        loggedInStatus={this.state.loggedInStatus} 
                        handleSuccessfulLogOut = {this.handleSuccessfulLogOut}
                    />

                    <Switch>
                        <Route exact path="/" component={home}></Route>
                        <Route 
                        exact path="/auth" 
                        render={props => (
                            <Auth
                            {...props}
                            handleSuccessfulLogIn={this.handleSuccessfulLogIn}
                            handleUnSuccessfulLogIn={this.handleUnSuccessfulLogIn}
                             />
                        )}
                         />
                        <Route exact path="/about-me" component={about} />
                        <Route exact path="/contact" component={contact} />
                        <Route exact path="/blog" 
                            render={props => (
                                <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
                            )}
                        />
                        <Route exact path="/b/:slug" component={BlogDetail} />
                        {this.state.loggedInStatus === "LOGGED_IN" ? (
                            this.authorizedPages()
                        ): null}
                        
                        <Route exact path="/portfolio/:slug" component={portfolioDetail} />
                        <Route component={noMatch} />
                    </Switch>
                </div>
            </Router>
        </div>
        );
    }
}