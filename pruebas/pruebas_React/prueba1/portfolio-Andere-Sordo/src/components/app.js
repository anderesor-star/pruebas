import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import NavigationContainer from './navigation/navigation-container';
import home from './pages/home';
import about from './pages/about';
import contact from './pages/contact';
import blog from './pages/blog';
import portfolioDetail from './portfolio/portfolio-detail';
import auth from './pages/auth';
import noMatch from './pages/no-match';

export default class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN"
        }

        this.handleSuccessfulLogIn = this.handleSuccessfulLogIn.bind(this);
        this.handleUnSuccessfulLogIn = this.handleUnSuccessfulLogIn.bind(this);
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

    render() {
        return ( 
        <div className = 'container' >
            <Router>
                <div>
                    <NavigationContainer/>

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
                        <Route exact path="/about-me" component={about}></Route>
                        <Route exact path="/contact" component={contact}></Route>
                        <Route exact path="/blog" component={blog}></Route>
                        <Route exact path="/portfolio/:slug" component={portfolioDetail}></Route>
                        <Route component={noMatch}></Route>
                    </Switch>
                </div>
            </Router>
        </div>
        );
    }
}