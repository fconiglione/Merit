import React, {useEffect, useState} from "react";
// Importing axios for HTTP requests and JSON data
import axios from "axios";

/*
The Courses component allows the user to add courses to the list and view
a list of existing courses. The user can also edit and delete any existing
courses by clicking on the action buttons directly in the table.
*/
function Courses() {
    // Creating variables for the server port of 3001
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    // Setting a useState variable for courses
    const [courses, setCourses] = useState([]);
    // Populating default form data
    const [formData, setFormData] = useState({
        cname: '',
        code: '',
    });

    useEffect(() => {
        // Fetching the course data from the api url
        const fetchData = async () => {
            const response = await axios.get(apiUrl + '/data/course-data');
            setCourses(response.data);
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

    // Submitting the new course entry with a try/catch block for errors
    const handleSubmit = async (event) => {
        // Removing the default form submission
        event.preventDefault();
        try {
            // Posting the data
            await axios.post(apiUrl + '/data/course-data', formData);
            // Add a notification
            alert('Course added successfully!');
            // Fetch the new data once submitted
            const response = await axios.get(apiUrl + '/data/course-data');
            setCourses(response.data);
            // Resetting form data to be empty upon submission
            setFormData({
                cname: '',
                code: '',
            });
        } catch (error) {
            console.error('Error submitting data:', error.message);
        }
    };

    // Confirming deletion and removing the course entry upon request
    const confirmDelete = async (course_id) => {
        const confirmDeletion = window.confirm("Are you sure you want to delete this course?");

        if (confirmDeletion) {
            try {
                // Deleting the entry
                await axios.delete(apiUrl + '/data/delete-course/' + course_id);

                // Fetch the newly updated data once deleted
                const response = await axios.get(apiUrl + '/data/course-data');
                setCourses(response.data);
            } catch (error) {
                console.error("Error deleting course:", error.message);
            }
        }
    };

    return (
        <main>
            <section className="add-courses">
                <div className="add-courses-nav">
                    <div>
                        <h1>Add a new course</h1>
                    </div>
                    <div className="view-all-courses-nav">
                        <a href="/courses/#courses-table">
                            <h1>View all courses</h1>
                            <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div className="add-courses-form">
                    <div className="add-courses-form-container">
                        <form action="/data/course-data" id="course-form" onSubmit={handleSubmit}>
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
                                        placeholder="Enter course code"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                    />
                                </fieldset>
                            </div>
                            <input type="submit" value="Submit" id="course-submit-btn" />
                        </form>
                    </div>
                </div>
            </section>
            <section className="courses-table" id="courses-table">
                <div className="courses-table-nav">
                    <div>
                        <h1>List of courses</h1>
                    </div>
                    <div>
                        <button>
                            <i className="fa-solid fa-sort"></i>
                        </button>
                    </div>
                </div>
                <div className="courses-table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Course name</th>
                            <th>Course Code</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Looping through the course entries and displaying
                        as rows in the table */}
                        {courses && courses.length > 0 ? (
                            courses.map((course) => (
                                <tr key={course.course_id}>
                                    <td>{course.cname}</td>
                                    <td>{course.code}</td>
                                    <td className="actions">
                                        <a
                                            href={`/data/edit-course/${course.course_id}`}
                                            title="Edit"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </a>
                                        <a
                                            href="javascript:void(0)"
                                            title="Delete"
                                            onClick={() => confirmDelete(course.course_id)}
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            // Displaying a message if no data exists
                            <tr>
                                <td colSpan="3">No courses available</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default Courses;