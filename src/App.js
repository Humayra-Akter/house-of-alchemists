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

function App() {


  return (
    <Router>
      <Routes>
        {/* Admin Pages */}
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/resources" element={<Resources />} />
        <Route
          path="/admin/exams"
          element={<Exams />}
        />
        <Route path="/admin/questions" element={<QuestionsModeration />} />
     

        Student Pages
        <Route
          path="/student/studentDashboard"
          element={<StudentDashboard />}
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/admin/adminDashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
