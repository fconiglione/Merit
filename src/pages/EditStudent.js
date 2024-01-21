import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function EditStudent() {
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    // Getting the student_id for the url
    const { student_id } = useParams();

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        dob: "",
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(
                    apiUrl + '/data/students/' + student_id
                );
                // Creating a new date object so that the dob matches the form requirements
                const formattedDob = new Date(response.data.dob).toISOString().split('T')[0];
                setFormData({
                    fname: response.data.fname,
                    lname: response.data.lname,
                    dob: formattedDob,
                });
            } catch (error) {
                console.error("Error fetching student data:", error.message);
            }
        };

        fetchStudent();
    }, [student_id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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