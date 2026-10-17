import React, {Component} from "react";
import profilePic from "../../../static/assets/images/profilePic/profilePic.jpg";

export default class About extends Component {
    render() {
        return(
            <div className="about-wrapper">
                <div className="left-column-wrapper"
                    style={{
                        background: "url(" + profilePic + ") no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />
                <div className="right-column-wrapper">
                    <h1>About</h1>
                </div>
            </div>
        );
    }
}