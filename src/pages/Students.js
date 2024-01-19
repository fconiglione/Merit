import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    function validateDOB(event) {
        const dob = new Date(document.getElementById('dob').value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        if (isNaN(age)) {
            alert("Please enter a valid date.");
            event.preventDefault();
        } else if (age < 10) {
            alert("Student must be at least 10 years old.");
            event.preventDefault();
        }
    }

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/students/data')
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

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
                        <form action="/" id="student-form" onSubmit={validateDOB}>
                            <div className="student-form-content">
                                <fieldset>
                                    <label htmlFor="fname">First name</label>
                                    <input required type="text" id="fname" name="fname" />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="lname">Last name</label>
                                    <input required type="text" id="lname" name="lname" />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="dob">Date of birth</label>
                                    <input required type="date" id="dob" name="dob" />
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
                        </tr>
                        </thead>
                        <tbody>
                        {students && students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.student_id}>
                                    <td>{student.lname}</td>
                                    <td>{student.fname}</td>
                                    <td>{new Date(student.dob).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
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