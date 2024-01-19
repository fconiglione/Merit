import React, {useEffect, useState} from "react";
import axios from "axios";

function Results() {
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

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
                        <form action="/data/result-data" id="result-form"
                              //onSubmit={handleSubmit}
                            >
                            <div className="result-form-content">
                                <fieldset>
                                    <label htmlFor="studentName">Student name</label>
                                    <select
                                        required
                                        id="studentName"
                                        name="studentName"
                                        // value={formData.studentName}
                                        // onChange={handleInputChange}
                                    >
                                        <option value="" disabled selected>Select a student</option>
                                        <option value="johnDoe">John Doe</option>
                                        <option value="janeDoe">Jane Doe</option>
                                        <option value="bobSmith">Bob Smith</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="cname">Course name</label>
                                    <select
                                        required
                                        id="cname"
                                        name="cname"
                                        // value={formData.cname}
                                        // onChange={handleInputChange}
                                    >
                                        <option value="" disabled selected>Select a course</option>
                                        <option value="math">Mathematics</option>
                                        <option value="physics">Physics</option>
                                        <option value="computerScience">Computer Science</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="score">Score</label>
                                    <select
                                        required
                                        id="score"
                                        name="score"
                                        // value={formData.studentName}
                                        // onChange={handleInputChange}
                                    >
                                        <option value="" disabled selected>Select a result</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                        <option value="F">F</option>
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
                            <th>Course</th>
                            <th>Student</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*/!*{results && results.length > 0 ? (*!/*/}
                        {/*/!*    results.map((result) => (*!/*/}
                        {/*/!*        <tr key={result.result_id}>*!/*/}
                        {/*/!*            <td>{result.cname}</td>*!/*/}
                        {/*/!*            <td>{result.code}</td>*!/*/}
                        {/*/!*        </tr>*!/*/}
                        {/*/!*    ))*!/*/}
                        {/*/!*) : (*!/*/}
                        {/*    <tr>*/}
                        {/*        <td colSpan="3">No results available</td>*/}
                        {/*    </tr>*/}
                        {/*)}*/}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default Results;