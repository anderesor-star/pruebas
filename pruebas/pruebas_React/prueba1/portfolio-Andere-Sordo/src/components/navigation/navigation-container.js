import React, {Component} from "react";
import axios from "axios";
import {withRouter} from "react-router";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const NavigationContainer = props => {
    const dynamicLink = (route, linkText) => {
        return(
            <div className="link-nav-wrapper">
                <NavLink to= {route} activeClassName="nav-link-active">
                    {linkText}
                </NavLink>
            </div>
        )
    }

    const handleSignOut = () => {
        axios.delete("https://api.devcamp.space/logout", {withCredentials: true}).then(response => {
            if (response.status === 200) {
                props.history.push("/");
                props.handleSuccessfulLogOut();
            }
            return response.data;
        }).catch(error => {
            console.log("Error signing out:", error);
        })
    }

    return(
        <div className="nav-wrapper">
            <div className="left-column">
                <div className="link-nav-wrapper"><NavLink exact to= "/" activeClassName="nav-link-active">Home</NavLink></div>
                <div className="link-nav-wrapper"><NavLink to= "/about-me" activeClassName="nav-link-active">About</NavLink></div>
                <div className="link-nav-wrapper"><NavLink to= "/contact" activeClassName="nav-link-active">Contact</NavLink></div>
                <div className="link-nav-wrapper"><NavLink to= "/blog" activeClassName="nav-link-active">Blog</NavLink></div>
                {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager"): null}
            </div>

            <div className="right-column">
                Andere Sordo

                {props.loggedInStatus === "LOGGED_IN" ? <a onClick={handleSignOut}>Sign Out</a>: null}
            </div>

        </div>
    )
}

export default withRouter(NavigationContainer);