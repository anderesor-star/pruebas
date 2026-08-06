import React, { Component } from 'react';
import moment from "moment";
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
import noMatch from './pages/no-match';

export default class App extends Component {
    render() {
        return ( 
        <div className = 'app' >
            <Router>
                <div>
                    <h1> Andere 's Portfolio</h1> 
                    <div>
                        {moment().format('MMMM Do YYYY, h:mm:ss a')}
                    </div>
                    <NavigationContainer/>

                    <Switch>
                        <Route exact path="/" component={home}></Route>
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