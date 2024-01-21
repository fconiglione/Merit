import React, { useState, useEffect } from "react";
// Importing useParams for routing to the correct result_id
import { useParams } from 'react-router-dom';
// Importing axios for HTTP requests and JSON data
import axios from "axios";

/*
The EditResult component allows the user to edit and update the selected
result from the table list in the /results page.
*/
function EditResult() {
    // Creating variables for the server port of 3001
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    // Getting the result_id for the url
    const { result_id } = useParams();

    // Adding a state variable to scores
    const [scores, setScores] = useState([]);

    // Setting the initial state of the form data
    const [formData, setFormData] = useState({
        studentName: "",
        cname: "",
        score: "",
    });

    useEffect(() => {
        // Getting access to the results data using the selected
        // result_id
        const fetchData = async () => {
            // Getting the result data
            const resultResponse = await axios.get(apiUrl + '/data/results/' + result_id);
            const resultData = resultResponse.data[0];

            // Getting the scores data
            const scoresResponse = await axios.get(apiUrl + '/data/score-data');
            const availableScores = scoresResponse.data;

            // Populating the form with the selected result_id data
            setFormData({
                studentName: resultData.student_name,
                cname: resultData.course_name,
                score_id: resultData.score_id,
            });

            // Populating the available scores from the db
            setScores(availableScores);
        };

        fetchData();
    }, [result_id]);

    // Updating the changes in data
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "score") {
            // Finding the selected score option from the scores array
            const selectedScoreOption = scores.find(
                (scoreOption) => String(scoreOption.score_id) === value
            );

            // Only updating score_id of the existing data if the selected
            // option exists
            if (selectedScoreOption) {
                setFormData((prevData) => ({
                    ...prevData,
                    score_id: selectedScoreOption.score_id,
                }));
            } else {
                console.error("Selected score option not found:", value);
            }
        } else {
            // Updating other data as normal
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // Submitting the newly updated result entry with a try/catch block for any errors
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(
                apiUrl + '/data/update-result/' + result_id,
                { score_id: formData.score_id }
            );
            // Add a notification
            alert("Result updated successfully!");
            // Redirect to the results page after updating
            window.location.href = '/results';
        } catch (error) {
            console.error("Error updating result:", error.message);
        }
    };

    return (
        <main>
            {/* Reusing class names from parent component to save time and css space */}
            <section className="add-results">
                <div className="update-results-nav">
                    <a href="/results">
                        <i className="fa-solid fa-arrow-left"></i>
                        <h1>Return to results</h1>
                    </a>
                </div>
                <div className="add-results-form">
                    <div className="add-results-form-container">
                        <form id="result-form" onSubmit={handleSubmit}>
                            <div className="result-form-content">
                                <fieldset>
                                    <label htmlFor="cname">Course name</label>
                                    <input
                                        required
                                        type="text"
                                        id="cname"
                                        name="cname"
                                        value={formData.cname}
                                        onChange={handleInputChange}
                                        title="Course name cannot be changed"
                                        disabled
                                    />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="studentName">Student name</label>
                                    <input
                                        required
                                        type="text"
                                        id="studentName"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleInputChange}
                                        title="Student name cannot be changed"
                                        disabled
                                    />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="score">Score</label>
                                    <select
                                        required
                                        id="score"
                                        name="score"
                                        value={formData.score_id}
                                        onChange={handleInputChange}
                                    >
                                        {scores.map((scoreOption) => (
                                            <option key={scoreOption.score_id} value={scoreOption.score_id}>
                                                {scoreOption.score}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>
                            </div>
                            <input type="submit" value="Update" id="result-submit-btn" />
                        </form>
                    </div>
                </div>
            </section>
            <section className="update-disclaimer">
                <div className="update-disclaimer-wrapper">
                    <div className="update-disclaimer-content">
                        <p><i className="fa-solid fa-circle-exclamation"></i> Important Message</p>
                        <p>Any changes you make on this page will be reflected immediately. Please double-check any edits before saving to ensure accuracy. Note that all edits are permanent and cannot be undone.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default EditResult;