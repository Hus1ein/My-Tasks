import React from 'react';
import "../../Styles/home.css";
import logo from "./logo.png"
import toTop from "./top.png";

const homeView = (props) => {

    let ourTeam = [
        {
            "name" : "Haris Baručija",
            "photo" : "https://scontent.fsjj1-1.fna.fbcdn.net/v/t1.0-9/30710961_10211508282485889_4915924700258154725_n.jpg?_nc_cat=108&_nc_ht=scontent.fsjj1-1.fna&oh=0f0e03250e32e0e39c8f6bd572d220a1&oe=5C7EEE6F",
            "facebook": "https://www.facebook.com/haris.barucija",
            "linkedin" : "https://www.linkedin.com/in/haris-barucija-715745160/",
        },{
            "name" : "Hussain Abdel-ilah",
            "photo" : "https://scontent.fsjj1-1.fna.fbcdn.net/v/t1.0-9/43476361_2193441644205135_7884036101059379200_n.jpg?_nc_cat=108&_nc_ht=scontent.fsjj1-1.fna&oh=08495b0226fd37396b4bf4fbff093082&oe=5CB51CA5",
            "facebook": "https://www.facebook.com/hussain.aabd",
            "linkedin" : "https://www.linkedin.com/in/hussain-abdel-ilah-8b05b3127/",
        },{
            "name" : "Emir Uzunović",
            "photo" : "https://scontent.fsjj2-1.fna.fbcdn.net/v/t1.0-9/37649881_1854853831224807_5216802393097764864_n.jpg?_nc_cat=111&_nc_ht=scontent.fsjj2-1.fna&oh=e375158f3fd2ee28c77a109da15c33be&oe=5C4B6707",
            "facebook": "https://www.facebook.com/emir.uzunovic.5",
            "linkedin" : "https://www.linkedin.com/",
        }
    ];

    return (

        <div>
            <nav className="navbar navbar-default navbar-fixed-top">

                <div className="home-container">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a href="/"><img src={logo} className="my-logo"/></a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-left">
                                <li><p className="navbar-logo" href="#">My Tasks</p></li>
                                <li style={{marginLeft:"100px"}}><a href="/#our-team" className="my-navbar-link">Our Team</a></li>
                                <li><a href="/#follow-us" className="my-navbar-link">Follow us</a></li>
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/snow" className="my-navbar-link">Snow</a></li>
                                <li><a href="/login" className="my-navbar-link">Log In</a></li>
                                <li>
                                    <form action="/signup">
                                        <button  className="btn btn-default">Sign Up</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </nav>

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
                            <img id="third-section-first-image" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/e821dc83abf0743f092ec807e665ca28/updated-layouts-collab.png"/>
                            <h1 className="third-section-first-third-paragraph">Manage everything from big projects to personal moments.</h1>
                        </div>
                        <div className="col-md-4">
                            <img id="third-section-second-image" src="https://bitbucket-marketing-cdn.atlassian.com/dam/jcr:bc1f15f9-3b2e-4c30-9313-0ebd6175f18c/File%20Cabinet@2x.png?cdnVersion=kg"/>
                            <h1 className="third-section-second-paragraph">Never lose track of your tasks and deadlines.</h1>
                        </div>
                        <div className="col-md-4">
                            <img id="third-section-third-image" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/d4a4b91a73a5afa1ef70031ece27f4b4/updated-layouts-sync.png"/>
                            <h1 className="third-section-first-third-paragraph">Stay connected from the boardroom to the beach</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section id="fourth-section">
                <div className="home-container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="fourth-section-title">Put the fun in planning</h1>
                            <p className="fourth-section-paragraph"> Create a board for any project, give it a name, and invite your team. </p>
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
                            <input type="text" className="form-control input-lg sixth-section-input" placeholder="Enter your email..."/>
                        </div>
                        <button type="submit" className="btn btn-success sixth-section-button">Subscribe</button>
                    </form>
                    <div className="social-media-my-tasks">
                        <a href="https://www.facebook.com/" className="fa fa-home fa-facebook"/>
                        <a href="https://www.twitter.com/" className="fa fa-home fa-twitter"/>
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
};

export default homeView;