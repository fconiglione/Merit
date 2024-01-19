import React, {useEffect, useState} from "react";
import axios from "axios";

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/data/course-data');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

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
                        <form action="/data/course-data" id="course-form"
                              //onSubmit={handleSubmit}
                        >
                            <div className="course-form-content">
                                <fieldset>
                                    <label htmlFor="cname">Course name</label>
                                    <input
                                        required
                                        type="text"
                                        id="cname"
                                        name="cname"
                                        placeholder="Enter course name"
                                        // value={formData.cname}
                                        // onChange={handleInputChange}
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
                        </tr>
                        </thead>
                        <tbody>
                        {courses && courses.length > 0 ? (
                            courses.map((course) => (
                                <tr key={course.course_id}>
                                    <td>{course.cname}</td>
                                    <td>{course.code}</td>
                                </tr>
                            ))
                        ) : (
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