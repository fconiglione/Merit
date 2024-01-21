import React, { useState, useEffect } from "react";

function Home() {
    // Creating variables for the server port of 3001
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    // Setting useState variables to store data for the home page
    const [enrolledStudents, setEnrolledStudents] = useState(0);
    const [listedCourses, setListedCourses] = useState(0);
    const [resultsPublished, setResultsPublished] = useState(0);

    useEffect(() => {
        // Getting the students data
        fetch(apiUrl + '/data/student-data')
            .then(response => response.json())
            .then(data => setEnrolledStudents(data.length))
            .catch(error => console.error('Error fetching student data:', error));
        // Getting the courses data
        fetch(apiUrl + '/data/course-data')
            .then(response => response.json())
            .then(data => setListedCourses(data.length))
            .catch(error => console.error('Error fetching course data:', error));
        // Getting the results data
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
                                {/* Dynamically reflecting the number of enrolled students */}
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
                                {/* Dynamically reflecting the number of listed courses */}
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
                                {/* Dynamically reflecting the number of results published */}
                                <h1>{resultsPublished}</h1>
                                <p>Results Published</p>
                            </div>
                        </div>
                    </a>
                    <a href="/">
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