import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Resources from "./pages/admin/Resources";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Pages */}
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/resources" element={<Resources />} />
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
