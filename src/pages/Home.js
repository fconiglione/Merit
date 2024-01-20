import React, { useState, useEffect } from "react";

function Home() {
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    const [enrolledStudents, setEnrolledStudents] = useState(0);
    const [listedCourses, setListedCourses] = useState(0);
    const [resultsPublished, setResultsPublished] = useState(0);

    useEffect(() => {
        fetch(apiUrl + '/data/student-data')
            .then(response => response.json())
            .then(data => setEnrolledStudents(data.length))
            .catch(error => console.error('Error fetching student data:', error));

        fetch(apiUrl + '/data/course-data')
            .then(response => response.json())
            .then(data => setListedCourses(data.length))
            .catch(error => console.error('Error fetching course data:', error));
        fetch(apiUrl + '/data/result-data')
            .then(response => response.json())
            .then(data => setResultsPublished(data.length))
            .catch(error => console.error('Error fetching course data:', error));
    }, []);
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
                                <h1>{enrolledStudents}</h1>
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
                                <h1>{listedCourses}</h1>
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
                                <h1>{resultsPublished}</h1>
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