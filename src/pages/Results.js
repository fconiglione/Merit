import React, {useEffect, useState} from "react";
import axios from "axios";

function Results() {
    const port = 3001;
    const apiUrl = `http://${window.location.hostname}:${port}`;

    return (
        <main>
            <section className="add-results"></section>
        </main>
    );
}

export default Results;