import React, {Component} from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const NavigationContainer = props => {
    const dynamicLink = (route, linkText) => {
        return(
            <div className="link-nav-wrapper"><NavLink to= "/blog" activeClassName="nav-link-active">Blog</NavLink></div>
        )
    }
    return(
        <div className="nav-wrapper">
            <div className="left-column">
                <div className="link-nav-wrapper"><NavLink exact to= "/" activeClassName="nav-link-active">Home</NavLink></div>
                <div className="link-nav-wrapper"><NavLink to= "/about-me" activeClassName="nav-link-active">About</NavLink></div>
                <div className="link-nav-wrapper"><NavLink to= "/contact" activeClassName="nav-link-active">Contact</NavLink></div>
                {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/blog", "Blog"): null};
            </div>

            <div className="right-column">
                Andere Sordo
            </div>

        </div>
    )
}

export default NavigationContainer;