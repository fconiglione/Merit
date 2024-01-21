import React, {useEffect, useState} from "react";
// Importing axios for HTTP requests and JSON data
import axios from "axios";

/*
The Results component allows the user to add results to the list and view
a list of existing results. The user can also edit and delete any existing
results by clicking on the action buttons directly in the table.
*/
function Results() {
    // Creating variables for the server port of 3001
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    // Setting useState variables to store data for the results page
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [scores, setScores] = useState([]);
    const [results, setResults] = useState([]);

    const [studentName, setStudentName] = useState("");
    const [cname, setCname] = useState("");
    const [score, setScore] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            // Fetching the existing student data from the api url
            const studentsResponse = await axios.get(apiUrl + '/data/student-data');
            setStudents(studentsResponse.data);
            // Fetching the existing course data from the api url
            const coursesResponse = await axios.get(apiUrl + '/data/course-data');
            setCourses(coursesResponse.data);
            // Fetching the existing scores data from the api url
            const scoresResponse = await axios.get(apiUrl + '/data/score-data');
            setScores(scoresResponse.data);
            // Fetching the results data from the api url
            const resultsResponse = await axios.get(apiUrl + "/data/result-data");
            setResults(resultsResponse.data);
        };

        fetchData();
    }, []);

    // Updating the changes in data
    const handleSubmit = async (event) => {
        // Removing the default form submission
        event.preventDefault();

        try {
            // Creating the formData object from the new input
            const formData = {
                studentName,
                cname,
                score,
            };

            // Posting the data
            await axios.post(apiUrl + '/data/result-data', formData);
            // Adding a notification
            alert('Result added successfully');
            // Fetch the new data once submitted
            const response = await axios.get(apiUrl + '/data/result-data');
            setResults(response.data);
            // Resetting form data to be empty upon submission
            setStudentName("");
            setCname("");
            setScore("");
        } catch (error) {
            console.error('Error submitting data:', error.message);
        }
    };

    // Confirming deletion and removing the result entry upon request
    const confirmDelete = async (result_id) => {
        const confirmDeletion = window.confirm("Are you sure you want to delete this result?");

        if (confirmDeletion) {
            try {
                // Deleting the entry
                await axios.delete(apiUrl + '/data/delete-result/' + result_id);

                // Fetch the newly updated data once deleted
                const response = await axios.get(apiUrl + '/data/result-data');
                setResults(response.data);
            } catch (error) {
                console.error("Error deleting result:", error.message);
            }
        }
    };

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
                        <form
                            action="/data/result-data"
                            id="result-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="result-form-content">
                                <fieldset>
                                    <label htmlFor="studentName">Student name</label>
                                    <select
                                        required
                                        id="studentName"
                                        name="studentName"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
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
                                        value={cname}
                                        onChange={(e) => setCname(e.target.value)}
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
                                        value={score}
                                        onChange={(e) => setScore(e.target.value)}
                                    >
                                        <option value="" disabled selected>Select a score</option>
                                        {scores.map((score) => (
                                            <option key={score.score_id} value={score.score}>
                                                {score.score}
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
                            <th>Student</th>
                            <th>Course</th>
                            <th>Score</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Looping through the result entries and displaying
                        as rows in the table */}
                        {results && results.length > 0 ? (
                            results.map((result) => (
                                <tr key={result.result_id}>
                                    <td>{result.student_name}</td>
                                    <td>{result.course_name}</td>
                                    <td>{result.score}</td>
                                    <td className="actions">
                                        <a
                                            href={`/data/edit-result/${result.result_id}`}
                                            title="Edit"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </a>
                                        <a
                                            href="javascript:void(0)"
                                            title="Delete"
                                            onClick={() => confirmDelete(result.result_id)}
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            // Displaying a message if no data exists
                            <tr>
                                <td colSpan="3">No results available</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default Results;