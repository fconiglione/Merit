import React, { useState, useEffect } from "react";
// Importing useParams for routing to the correct course_id
import { useParams } from 'react-router-dom';
// Importing axios for HTTP requests and JSON data
import axios from "axios";

/*
The EditCourse component allows the user to edit and update the selected
course from the table list in the /courses page.
*/
function EditCourse() {
    // Creating variables for the server port of 3001
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    // Getting the course_id for the url using useParams import
    const { course_id } = useParams();

    // Setting the initial state of the form data
    const [formData, setFormData] = useState({
        cname: "",
        code: "",
    });

    useEffect(() => {
        // Getting access to the course data using the selected
        // course_id
        const fetchCourse = async () => {
            const response = await axios.get(
                apiUrl + '/data/courses/' + course_id
            );
            setFormData(response.data);
        };

        fetchCourse();
    }, [course_id]);

    // Updating the changes in data
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submitting the newly updated course entry with a try/catch block for any errors
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(
                apiUrl + '/data/update-course/' + course_id,
                formData
            );
            // Add a notification
            alert("Course updated successfully!");
            // Redirect to the courses page after updating
            window.location.href = '/courses';
        } catch (error) {
            console.error("Error updating course:", error.message);
        }
    };

    return (
        <main>
            {/* Reusing class names from parent component to save time and css code space */}
            <section className="add-courses">
                <div className="update-courses-nav">
                    <a href="/courses">
                        <i className="fa-solid fa-arrow-left"></i>
                        <h1>Return to courses</h1>
                    </a>
                </div>
                <div className="add-courses-form">
                    <div className="add-courses-form-container">
                        <form id="course-form" onSubmit={handleSubmit}>
                            <div className="course-form-content">
                                <fieldset>
                                    <label htmlFor="cname">Course name</label>
                                    <input
                                        required
                                        type="text"
                                        id="cname"
                                        name="cname"
                                        placeholder="Enter course name"
                                        value={formData.cname}
                                        onChange={handleInputChange}
                                    />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="code">Course code</label>
                                    <input
                                        required
                                        type="text"
                                        id="code"
                                        name="code"
                                        pattern="[A-Za-z]{4}\d{3}"
                                        title="Course code must have 4 letters followed by 3 numbers."
                                        placeholder="Enter course code"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                    />
                                </fieldset>
                            </div>
                            <input type="submit" value="Update" id="course-submit-btn" />
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

export default EditCourse;