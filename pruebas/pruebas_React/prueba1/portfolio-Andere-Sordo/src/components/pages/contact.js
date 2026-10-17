import React, {Component} from "react";
import login from "../../../static/assets/images/auth/login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Contact extends Component {
    render() {
        return (
            <div className="contact-wrapper">
                <div className="left-column-wrapper" 
                    style={{
                        background: "url(" + login + ") no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />
                <div className="right-column-wrapper">
                    <div className="mail">
                        <FontAwesomeIcon icon={"envelope"} />
                        <h1>anderesor@gmail.com</h1>
                    </div>
                    <div className="phone">
                        <FontAwesomeIcon icon={"phone-volume"} />
                        <h1>+34 629 00 83 99</h1>
                    </div>
                    <div className="insta">
                        <FontAwesomeIcon icon={"hashtag"} />
                        <h1>@andeeree_01</h1>
                    </div>

                    <div className="ubi">
                        <FontAwesomeIcon icon={"location-dot"} />
                        <h1>Bilbao, Bizkaia, España</h1>
                    </div>
                </div>
            </div>
        );
    }
}