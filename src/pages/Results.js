import React, {useEffect, useState} from "react";
import axios from "axios";

function Results() {
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsResponse = await axios.get(apiUrl + '/data/student-data');
                setStudents(studentsResponse.data);
                const coursesResponse = await axios.get(apiUrl + '/data/course-data');
                setCourses(coursesResponse.data);
                const resultsResponse = await axios.get(apiUrl + '/data/result-data');
                setResults(resultsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }

            fetchData();
        };

        fetchData();
    }, []);

    return (
        <main>
            <section className="add-results">
                <div className="add-results-nav">
                    <div>
                        <h1>Add a new result</h1>
                    </div>
                    <div className="view-all-results-nav">
                        <a href="/results/#results-table">
                            <h1>View all results</h1>
                            <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div className="add-results-form">
                    <div className="add-results-form-container">
                        <form action="/data/result-data" id="result-form"
                              //onSubmit={handleSubmit}
                            >
                            <div className="result-form-content">
                                <fieldset>
                                    <label htmlFor="studentName">Student name</label>
                                    <select
                                        required
                                        id="studentName"
                                        name="studentName"
                                        // value={formData.studentName}
                                        // onChange={handleInputChange}
                                    >
                                        <option value="" disabled selected>Select a student</option>
                                        {students.map((student) => (
                                            <option key={student.student_id} value={`${student.fname} ${student.lname}`}>
                                                {`${student.lname}, ${student.fname}`}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="cname">Course name</label>
                                    <select
                                        required
                                        id="cname"
                                        name="cname"
                                        // value={formData.cname}
                                        // onChange={handleInputChange}
                                    >
                                        <option value="" disabled selected>Select a course</option>
                                        {courses.map((course) => (
                                            <option key={course.course_id} value={course.cname}>
                                                {`${course.cname} - ${course.code}`}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="score">Score</label>
                                    <select
                                        required
                                        id="score"
                                        name="score"
                                        // value={formData.studentName}
                                        // onChange={handleInputChange}
                                    >
                                        <option value="" disabled selected>Select a result</option>
                                        {results.map((result) => (
                                            <option key={result.result_id} value={result.result}>
                                                {result.result}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>
                            </div>
                            <input type="submit" value="Submit" id="result-submit-btn" />
                        </form>
                    </div>
                </div>
            </section>
            <section className="results-table" id="results-table">
                <div className="results-table-nav">
                    <div>
                        <h1>List of results</h1>
                    </div>
                    <div>
                        <button>
                            <i className="fa-solid fa-sort"></i>
                        </button>
                    </div>
                </div>
                <div className="results-table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Course</th>
                            <th>Student</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*/!*{results && results.length > 0 ? (*!/*/}
                        {/*/!*    results.map((result) => (*!/*/}
                        {/*/!*        <tr key={result.result_id}>*!/*/}
                        {/*/!*            <td>{result.cname}</td>*!/*/}
                        {/*/!*            <td>{result.code}</td>*!/*/}
                        {/*/!*        </tr>*!/*/}
                        {/*/!*    ))*!/*/}
                        {/*/!*) : (*!/*/}
                        {/*    <tr>*/}
                        {/*        <td colSpan="3">No results available</td>*/}
                        {/*    </tr>*/}
                        {/*)}*/}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default Results;