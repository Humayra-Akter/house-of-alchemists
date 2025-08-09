import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Resources from "./pages/admin/Resources";
import Exams from "./pages/admin/Exams";
import QuestionsModeration from "./pages/admin/QuestionsModeration";
import Students from "./pages/admin/Students";
import Entry from "./pages/Entry";
import Content from "./pages/student/Content";
import TakeExam from "./pages/student/TakeExam";
import StudentExams from "./pages/student/StudentExams";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        {/* Admin Pages */}
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/resources" element={<Resources />} />
        <Route path="/admin/exams" element={<Exams />} />
        <Route path="/admin/questions" element={<QuestionsModeration />} />
        <Route path="/admin/students" element={<Students />} />
        {/* Student Pages */}
        <Route
          path="/student/studentDashboard"
          element={<StudentDashboard />}
        />{" "}
        <Route path="/student/content" element={<Content />} />
        <Route path="/student/exams" element={<StudentExams />} />
        {/* Default redirect */}
        {/* <Route path="*" element={<Navigate to="/admin/adminDashboard" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
