import React from "react";
import "../styles/header.css";
import MeritLogo1 from "../assets/merit-logo-1.svg";
import ProfilePicturePlaceholder from "../assets/pfp-placeholder.jpg";

function Header() {
    return (
        <div className="header">
            <div className="header-container">
                <div className="header-container-nav">
                    <div className="header-container-nav-item">
                        <div className="hamburger-container">
                            <div className="hamburger-btn">
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </div>
                        </div>
                        <div>
                            <a href="/">
                                <img src={MeritLogo1} alt="Merit header logo" className="header-logo" />
                                {/*  Source : https://yourteachingmentor.com/january-reboot-workshop/default-profile-picture-avatar-photo-placeholder-vector-illustration/  */}
                            </a>
                        </div>
                    </div>
                    <div className="header-container-nav-item">
                        <div className="header-container-nav-icon-btns">
                            <div>
                                <a href="/">
                                    <i className="fa-solid fa-question"></i>
                                </a>
                            </div>
                            <div>
                                <a href="/">
                                    <i className="fa-solid fa-gear"></i>
                                </a>
                            </div>
                            <div>
                                <a href="/">
                                    <i className="fa-solid fa-bell"></i>
                                </a>
                            </div>
                            <div>
                                <a href="/">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className="profile-picture-div">
                                <img src={ProfilePicturePlaceholder} alt="Profile picture image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-sidebar">
                <div className="header-sidebar-container"></div>
            </div>
        </div>
    );
}

export default Header;