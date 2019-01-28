import React, { Component } from 'react';
import "../../Styles/home.css";

import logo from "./logo.png";
import hussainPhoto from "./hussain.jpg"
import emirPhoto from "./emir.jpg";
import harisPhoto from "./haris.jpg";
import toTop from "./top.png";
import app from "../../base";

const firebase = require("firebase");

class Home extends Component {

    componentWillMount() {
        this.getData();
    }

    state = {
        "visitorsNumbers": ""
    };

    getData = () => {
        var db = firebase.firestore();


        db.settings({
            timestampsInSnapshots: true
        });
        var self = this;

        db.collection("visitors")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let visitorsNumber = doc.data().visitorsNumbers + 1;
                    self.setState({
                        'visitorsNumber': visitorsNumber,
                    });

                    doc.ref.update({"visitorsNumbers": visitorsNumber});
                    console.log(doc.data().visitorsNumbers);
                });

            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    };

    myFunction = () => {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    };



    render() {

        let ourTeam = [
            {
                "name" : "Haris Baručija",
                "photo" : harisPhoto,
                "facebook": "https://www.facebook.com/haris.barucija",
                "linkedin" : "https://www.linkedin.com/in/haris-barucija-715745160/",
            },{
                "name" : "Hussain Abdel-ilah",
                "photo" : hussainPhoto,
                "facebook": "https://www.facebook.com/hussain.aabd",
                "linkedin" : "https://www.linkedin.com/in/hussain-abdel-ilah-8b05b3127/",
            },{
                "name" : "Emir Uzunović",
                "photo" : emirPhoto,
                "facebook": "https://www.facebook.com/emir.uzunovic.5",
                "linkedin" : "https://www.linkedin.com/",
            }
        ];

        return (

            <div>
                <div className="topnav" id="myTopnav">
                    <a href="#" className="active"><p>My Tasks</p></a>
                    <a href="/#our-team">Our Team</a>
                    <a href="/#follow-us">Follow us</a>
                    <a href="/snow">Snow</a>
                    <a href="/login">Log In</a>
                    <a href="/signup">Sign Up</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>
                        <i className="fa fa-bars"></i>
                    </a>
                </div>


                <section id="first-section">
                    <div className="home-container">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <h1 className="first-section-first-title">Organize life</h1>
                                <h1 className="first-section-second-title">Then go enjoy it…</h1>
                                <p className="first-section-paragraph"><span className="my-tasks">My Tasks</span> brings
                                    a shared perspective to any of life’s projects in a fun, flexible, and rewarding
                                    way.</p>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <img id="first-section-image"
                                     src="https://d3ptyyxy2at9ui.cloudfront.net/a11f874bc2b20e7cb0edb2e19fc4ddb1.png"
                                     width="623"/>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="second-section">
                    <div className="home-container">
                        <div className="row">
                            <div className="col-md-6"><img id="second-section-image"
                                                           src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/356f5c95fce4c40c67d16d526be2af1c/hero-a.svg"/>
                            </div>
                            <div className="col-md-6">
                                <h1 className="second-section-first-title">Stay organized, wherever you are</h1>
                                <p className="second-section-paragraph">Plan, keep records, and manage projects from any
                                    device–even offline.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="third-section">
                    <div className="home-container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="third-section-first-title">Focus on what matters most</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <img id="third-section-first-image"
                                     src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/e821dc83abf0743f092ec807e665ca28/updated-layouts-collab.png"/>
                                <h1 className="third-section-first-third-paragraph">Manage everything from big projects
                                    to personal moments.</h1>
                            </div>
                            <div className="col-md-4">
                                <img id="third-section-second-image"
                                     src="https://bitbucket-marketing-cdn.atlassian.com/dam/jcr:bc1f15f9-3b2e-4c30-9313-0ebd6175f18c/File%20Cabinet@2x.png?cdnVersion=kg"/>
                                <h1 className="third-section-second-paragraph">Never lose track of your tasks and
                                    deadlines.</h1>
                            </div>
                            <div className="col-md-4">
                                <img id="third-section-third-image"
                                     src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/d4a4b91a73a5afa1ef70031ece27f4b4/updated-layouts-sync.png"/>
                                <h1 className="third-section-first-third-paragraph">Stay connected from the boardroom to
                                    the beach</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="fourth-section">
                    <div className="home-container">
                        <div className="row">
                            <div className="col-md-6">
                                <h1 className="fourth-section-title">Put the fun in planning</h1>
                                <p className="fourth-section-paragraph"> Create a board for any project, give it a name,
                                    and invite your team. </p>
                            </div>
                            <div className="col-md-6">
                                <img id="fourth-section-image"
                                     src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/b241475a836143591358a3d71f169c1c/slide-3.png"/>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="our-team">
                    <div className="home-container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="fifth-section-title">Our Awesome Team</h1>
                            </div>
                        </div>
                        <div className="row">
                            {
                                ourTeam.map((member) => {
                                    return (
                                        <div className="col-md-4">
                                            <img className="fifth-section-image img-circle"
                                                 src={member.photo}/>
                                            <h1 className="fifth-section-paragraph">{member.name}</h1>
                                            <div className="social-media">
                                                <a href={member.facebook} className="fa fa-home fa-facebook"/>
                                                <a href={member.linkedin} className="fa fa-home fa-linkedin"/>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </section>
                <section id="follow-us">
                    <div className="home-container">
                        <h1 className="sixth-section-title">Follow us</h1>
                        <h4 className="sixth-section-paragraph">Stay up-to-date with the latest news and trends :</h4>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control input-lg sixth-section-input"
                                       placeholder="Enter your email..."/>
                            </div>
                            <button type="submit" className="btn btn-success sixth-section-button">Subscribe</button>
                        </form>
                        <div className="social-media-my-tasks">
                            <a href="https://www.facebook.com/" className="fa fa-home fa-facebook"/>
                            <a href="https://www.twitter.com/" className="fa fa-home fa-twitter"/>
                        </div>
                        <div>
                            <h4 className="sixth-section-title">Visitors number : <span className="visitors-number">{this.state.visitorsNumber}</span></h4>
                        </div>
                    </div>
                </section>
                <footer>
                    <div className="footer">© 2018 Copyright:
                        <a href="/"> My Tasks</a>
                    </div>
                </footer>
                <a href="/#top" title="Go to top"><img src={toTop} id="myBtn"/></a>
            </div>


        );
    }

};

export default Home;
