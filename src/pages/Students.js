import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        dob: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl + '/data/student-data');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

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
            await axios.post(apiUrl + '/data/student-data', formData);
            // Fetch the new data once submitted
            const response = await axios.get(apiUrl + '/data/student-data');
            setStudents(response.data);
            setFormData({
                fname: '',
                lname: '',
                dob: '',
            });
        } catch (error) {
            console.error('Error submitting data:', error.message);
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