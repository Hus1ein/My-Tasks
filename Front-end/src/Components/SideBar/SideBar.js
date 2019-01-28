import React, { Component } from 'react';
import "../../Styles/sidebar.css";
import app from "../../base";
import profileImage from "../../user.png";


class SideBar extends Component {

    render() {
        let info = "";
        let email = "";
        if(this.props.userInfo !== undefined) {
            email = this.props.userInfo.email;
            info = (
                <ul>
                    <li className="side-bar-user-row">
                        <span className="side-bar-user-info-name">City: </span>
                        <span className="side-bar-user-info-value">{this.props.userInfo.city}</span>
                    </li>
                    <li className="side-bar-user-row">
                        <span className="side-bar-user-info-name">Country: </span>
                        <span className="side-bar-user-info-value">{this.props.userInfo.country}</span>
                    </li>
                    <li className="side-bar-user-row">
                        <span className="side-bar-user-info-name">Currency: </span>
                        <span className="side-bar-user-info-value">{this.props.userInfo.currency}</span>
                    </li>
                    <li className="side-bar-user-row">
                        <span className="side-bar-user-info-name">IP Address: </span>
                        <span className="side-bar-user-info-value">{this.props.userInfo.ip}</span>
                    </li>
                    <li className="side-bar-user-row">
                        <span className="side-bar-user-info-name">Latitude: </span>
                        <span className="side-bar-user-info-value">{this.props.userInfo.latitude}</span>
                    </li>
                    <li className="side-bar-user-row">
                        <span className="side-bar-user-info-name">Longitude: </span>
                        <span className="side-bar-user-info-value">{this.props.userInfo.longitude}</span>
                    </li>
                    <li className="side-bar-user-row">
                        <span className="side-bar-user-info-name">Timezone: </span>
                        <span className="side-bar-user-info-value">{this.props.userInfo.timezone}</span>
                    </li>
                </ul>
            )
        }

        return (
            <div className="col-sm-12 col-md-6 col-lg-3" id="side-bar">
                <img src={profileImage} width="100px" height="100px" className="rounded-img" id="side-bar-profile-image"/>
                <p id="side-bar-profile-username">{email}</p>
                <div className="clear-left"/>

                <hr className="side-bar-hr"/>

                <div id="side-bar-user-info">
                    {info}
                </div>

                <hr className="side-bar-hr"/>

                <button id="side-bar-log-out" className="btn btn-default" onClick={this.props.logOutHandler}>Log out</button>

            </div>

        );
    }

}

export default SideBar;
