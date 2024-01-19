import React from "react";
import "../styles/header.css";
import MeritLogo1 from "../assets/merit-logo-1.svg";
import ProfilePicturePlaceholder from "../assets/pfp-placeholder.jpg";

function Header() {
    function open_sidebar() {
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("overlay");

        sidebar.style.display = "flex";
        sidebar.classList.remove("inactive");
        sidebar.classList.add("active");
        document.getElementById("overlay").style.display = "block";

        overlay.style.display = "block";
        overlay.addEventListener("click", close_sidebar);
        document.body.style.overflow = "hidden";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function close_sidebar() {
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("overlay");

        sidebar.classList.remove("active");
        sidebar.classList.add("inactive");
        document.getElementById("overlay").style.display = "none";

        overlay.style.display = "none";
        overlay.removeEventListener("click", close_sidebar);
        document.body.style.overflow = "auto";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const currentYear = new Date().getFullYear();
    return (
        <div className="header">
            <div className="header-container">
                <div className="header-container-nav">
                    <div className="header-container-nav-item">
                        <div className="hamburger-container">
                            <div className="hamburger-btn" onClick={open_sidebar}>
                                <i class="fa-solid fa-bars"></i>
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
                <div className="header-sidebar-container" id="sidebar">
                    <div className="sidebar-main">
                        <div className="sidebar-top">
                            <div>
                                <div>
                                    <img src={MeritLogo1} alt="Merit sidebar logo"/>
                                    <h1>Control Panel</h1>
                                </div>
                                <div>
                                    <div className="rev-hamburger-container">
                                        <div className="rev-hamburger-btn" onClick={close_sidebar}>
                                            <i className="fa-solid fa-circle-xmark"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar-middle">
                            <div className="sidebar-middle-nav">
                                <ul>
                                    <li>
                                        <a href="/">
                                            <i className="fa-solid fa-house"></i>
                                            <p>Home</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/students">
                                            <i className="fa-solid fa-users"></i>
                                            <p>Students</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/courses">
                                            <i className="fa-solid fa-book"></i>
                                            <p>Courses</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/results">
                                            <i className="fa-solid fa-graduation-cap"></i>
                                            <p>Results</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <hr/>
                            <div className="sidebar-middle-nav">
                                <ul>
                                    <li>
                                        <a href="/settings">
                                            <i className="fa-solid fa-gear"></i>
                                            <p>Settings</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/help-center">
                                            <i className="fa-solid fa-question"></i>
                                            <p>Help Center</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/help-center">
                                            <i className="fa-solid fa-right-from-bracket"></i>
                                            <p>Logout</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-bottom">
                        <div>
                            <p>Copyright © {currentYear} Merit, Inc. All Rights Reserved.</p>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <a href="/privacy-policy">Privacy Policy</a>
                                </li>
                                <span className="bullet">&bull;</span>
                                <li>
                                    <a href="/terms-of-use">Terms of Use</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="overlay"></div>
        </div>
    );
}

export default Header;