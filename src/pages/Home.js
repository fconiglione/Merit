import React from "react";

function Home() {
    return (
        <main>
            <section className="home-navigation">
                <div className="home-nav-items">
                    <a href="/students">
                        <div className="home-nav-item">
                            <div>
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div>
                                <h1>10</h1>
                                <p>Enrolled Students</p>
                            </div>
                        </div>
                    </a>
                    <a href="/courses">
                        <div className="home-nav-item">
                            <div>
                                <i className="fa-solid fa-book"></i>
                            </div>
                            <div>
                                <h1>5</h1>
                                <p>Courses Listed</p>
                            </div>
                        </div>
                    </a>
                    <a href="/results">
                        <div className="home-nav-item">
                            <div>
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <div>
                                <h1>7</h1>
                                <p>Results Published</p>
                            </div>
                        </div>
                    </a>
                    <a href="/help-center">
                        <div className="home-nav-item">
                            <div>
                                <i className="fa-solid fa-question"></i>
                            </div>
                            <div>
                                <p>Help Center</p>
                            </div>
                        </div>
                    </a>
                </div>
            </section>
        </main>
    );
}

export default Home;