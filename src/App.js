import React from "react";
import "./styles/normalize.css";
import "./styles/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Students from "./pages/Students";
import EditStudent from "./pages/EditStudent";
import Courses from "./pages/Courses";
import EditCourse from "./pages/EditCourse";
import Results from "./pages/Results";
import EditResult from "./pages/EditResult";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/data/edit-student/:student_id" element={<EditStudent />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/data/edit-course/:course_id" element={<EditCourse />} />
            <Route path="/results" element={<Results />} />
            <Route path="/data/edit-result/:result_id" element={<EditResult />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
  );
}
export default App;