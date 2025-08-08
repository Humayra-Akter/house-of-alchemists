import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Resources from "./pages/admin/Resources";
import Exams from "./pages/admin/Exams";
import ExamPreview from "./pages/admin/ExamPreview";

function App() {
  const [exams, setExams] = useState([
    {
      title: "SSC 1st Paper - Chapter 5 Quiz",
      duration: 30,
      chapter: "Chapter 5",
      questions: [
        {
          text: "What is the capital of France?",
          options: ["Paris", "London", "Berlin", "Madrid"],
          correctAnswer: "Paris",
          explanation: "Paris is the capital of France.",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/e/e6/Paris_vue_d%27ensemble_tour_Eiffel.jpg",
        },
      ],
      results: [],
    },
  ]);


  return (
    <Router>
      <Routes>
        {/* Admin Pages */}
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/resources" element={<Resources />} />
        <Route
          path="/admin/exams"
          element={<Exams exams={exams} setExams={setExams} />}
        />

        <Route
          path="/admin/exams/preview/:id"
          element={<ExamPreview exams={exams} />}
        />

        {/* Student Pages */}
        <Route
          path="/student/studentDashboard"
          element={<StudentDashboard />}
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/student/studentDashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
