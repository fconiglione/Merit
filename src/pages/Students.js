import React, { useEffect, useState } from 'react';
// Importing axios for HTTP requests and JSON data
import axios from 'axios';

/*
The Students component allows the user to add students to the list and view
a list of existing students. The user can also edit and delete any existing
students by clicking on the action buttons directly in the table.
*/
function Home() {
    // Creating variables for the server port of 3001
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    // Setting a useState variable for students
    const [students, setStudents] = useState([]);
    // Populating default form data
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        dob: '',
    });

    useEffect(() => {
        // Fetching the students data from the api url
        const fetchData = async () => {
            const response = await axios.get(apiUrl + '/data/student-data');
            setStudents(response.data);
        };

        fetchData();
    }, []);

    // Updating the changes in data
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Submitting the new student entry with a try/catch block for errors
    const handleSubmit = async (event) => {
        // Preventing the default form submission
        event.preventDefault();

        try {
            // Getting the dob from the form
            const dob = new Date(formData.dob);

            // Calculating the age
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();

            // Ensuring the student is at least 10 years old
            if (age < 10) {
                alert("The student must be at least 10 years old.");
                return; // Stop the form submission if the student isn't at least 10 years old
            }

            // Continue with the form submission if age is valid
            await axios.post(apiUrl + '/data/student-data', formData);

            // Add a notification
            alert('Student added successfully!');

            // Fetch the new data once submitted
            const response = await axios.get(apiUrl + '/data/student-data');
            setStudents(response.data);

            // Resetting form data to be empty upon submission
            setFormData({
                fname: '',
                lname: '',
                dob: '',
            });
        } catch (error) {
            console.error('Error submitting data:', error.message);
        }
    };

    // Confirming deletion and removing the student entry upon request
    const confirmDelete = async (student_id) => {
        const confirmDeletion = window.confirm("Are you sure you want to delete this student?");

        if (confirmDeletion) {
            try {
                // Deleting the entry
                await axios.delete(apiUrl + '/data/delete-student/' + student_id);

                // Fetch the newly updated data once deleted
                const response = await axios.get(apiUrl + '/data/student-data');
                setStudents(response.data);
            } catch (error) {
                console.error("Error deleting course:", error.message);
            }
        }
    };

    return (
        <main>
            <section className="add-students">
                <div className="add-students-nav">
                    <div>
                        <h1>Add a new student</h1>
                    </div>
                    <div className="view-all-students-nav">
                        <a href="/students/#students-table">
                            <h1>View all students</h1>
                            <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div className="add-students-form">
                    <div className="add-students-form-container">
                        <form action="/data/student-data" id="student-form" onSubmit={handleSubmit}>
                            <div className="student-form-content">
                                <fieldset>
                                    <label htmlFor="fname">First name</label>
                                    <input
                                        required
                                        type="text"
                                        id="fname"
                                        name="fname"
                                        placeholder="Enter first name"
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
                            <input type="submit" value="Submit" id="student-submit-btn" />
                        </form>
                    </div>
                </div>
            </section>
            <section className="students-table" id="students-table">
                <div className="students-table-nav">
                    <div>
                        <h1>List of students</h1>
                    </div>
                    <div>
                        <button>
                            <i className="fa-solid fa-sort"></i>
                        </button>
                    </div>
                </div>
                <div className="students-table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Last name</th>
                            <th>First name</th>
                            <th>Date of birth</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Looping through the student entries and displaying
                        as rows in the table */}
                        {students && students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.student_id}>
                                    <td>{student.lname}</td>
                                    <td>{student.fname}</td>
                                    <td>{new Date(student.dob).toLocaleDateString()}</td>
                                    <td className="actions">
                                        <a
                                            href={`/data/edit-student/${student.student_id}`}
                                            title="Edit"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </a>
                                        <a
                                            href="javascript:void(0)"
                                            title="Delete"
                                            onClick={() => confirmDelete(student.student_id)}
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            // Displaying a message if no data exists
                            <tr>
                                <td colSpan="3">No students available</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default Home;