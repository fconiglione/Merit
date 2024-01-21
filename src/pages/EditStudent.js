import React, { useState, useEffect } from "react";
// Importing useParams for routing to the correct student_id
import { useParams } from 'react-router-dom';
// Importing axios for HTTP requests and JSON data
import axios from "axios";

/*
The EditStudent component allows the user to edit and update the selected
student from the table list in the /results page.
*/
function EditStudent() {
    // Creating variables for the server port of 3001
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    // Getting the student_id for the url
    const { student_id } = useParams();

    // Setting the initial state of the form data
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        dob: "",
    });

    useEffect(() => {
        // Getting access to the student data using the selected
        // student_id
        const fetchStudent = async () => {
            const response = await axios.get(
                apiUrl + '/data/students/' + student_id
            );
            // Creating a new date object so that the dob matches the form requirements
            const formattedDob = new Date(response.data.dob).toISOString().split('T')[0];
            // Populating the form with the selected student_id data
            setFormData({
                fname: response.data.fname,
                lname: response.data.lname,
                dob: formattedDob,
            });
        };

        fetchStudent();
    }, [student_id]);

    // Updating the changes in data
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submitting the newly updated student entry with a try/catch block for any errors
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(
                apiUrl + '/data/update-student/' + student_id,
                formData
            );
            // Add a notification
            alert("Student updated successfully!");
            // Redirect to the students page after updating
            window.location.href = '/students';
        } catch (error) {
            console.error("Error updating student:", error.message);
        }
    };

    return (
        <main>
            {/* Reusing class names from parent component to save time and css space */}
            <section className="add-students">
                <div className="update-students-nav">
                    <a href="/students">
                        <i className="fa-solid fa-arrow-left"></i>
                        <h1>Return to students</h1>
                    </a>
                </div>
                <div className="add-students-form">
                    <div className="add-students-form-container">
                        <form id="student-form" onSubmit={handleSubmit}>
                            <div className="student-form-content">
                                <fieldset>
                                    <label htmlFor="cname">Student name</label>
                                    <input
                                        required
                                        type="text"
                                        id="fname"
                                        name="fname"
                                        placeholder="Enter student name"
                                        value={formData.fname}
                                        onChange={handleInputChange}
                                    />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="lname">Last name</label>
                                    <input
                                        required
                                        type="text"
                                        id="lname"
                                        name="lname"
                                        placeholder="Enter last name"
                                        value={formData.lname}
                                        onChange={handleInputChange}
                                    />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="dob">Date of birth</label>
                                    <input
                                        required
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                    />
                                </fieldset>
                            </div>
                            <input type="submit" value="Update" id="student-submit-btn" />
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

export default EditStudent;