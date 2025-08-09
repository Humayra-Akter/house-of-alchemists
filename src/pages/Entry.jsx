import { Link, useNavigate } from "react-router-dom";
import { AcademicCapIcon, BeakerIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function Entry() {
  const navigate = useNavigate();

  // Optional: auto-redirect if role was chosen before
  useEffect(() => {
    const lastRole = localStorage.getItem("hoa_role");
    if (lastRole === "student") navigate("/student/studentDashboard");
    if (lastRole === "admin") navigate("/admin/adminDashboard");
  }, [navigate]);

  const chooseRole = (role) => {
    localStorage.setItem("hoa_role", role);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BeakerIcon className="w-6 h-6 text-secondary" />
          <h1 className="text-xl font-bold text-gray-900">
            House of Alchemists
          </h1>
        </div>
        <Link
          to="/admin/adminDashboard"
          className="text-sm text-gray-700 hover:text-primary"
          onClick={() => chooseRole("admin")}
        >
          Admin Dashboard →
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-12 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Learn. Test. Master. <span className="text-primary">Chemistry</span>
            .
          </h2>
          <p className="mt-3 text-gray-600">
            Smart resources, real-time exams, and a vibrant Q&amp;A community
            for SSC, HSC, and Admission.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/student/studentDashboard"
              onClick={() => chooseRole("student")}
              className="bg-primary hover:opacity-90 text-white px-5 py-2.5 rounded-md text-sm"
            >
              I’m a Student
            </Link>
            <Link
              to="/admin/adminDashboard"
              onClick={() => chooseRole("admin")}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 px-5 py-2.5 rounded-md text-sm"
            >
              I’m a Teacher/Admin
            </Link>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Tip: You can change role later from the sidebar or by clearing
            browser storage.
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid gap-4">
          {/* Student card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow transition">
            <div className="flex items-center gap-2 mb-2">
              <AcademicCapIcon className="w-5 h-5 text-secondary" />
              <h3 className="font-semibold text-gray-900">Student Portal</h3>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Personalized dashboard & upcoming exams</li>
              <li>• Notes: PDF, YouTube, text</li>
              <li>• Take exams with timer & anti-cheat</li>
              <li>• See results with explanations</li>
              <li>• Ask doubts & join discussions</li>
            </ul>
            <Link
              to="/student/studentDashboard"
              onClick={() => chooseRole("student")}
              className="inline-block mt-3 text-primary hover:underline text-sm"
            >
              Go to Student →
            </Link>
          </div>

          {/* Admin card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow transition">
            <div className="flex items-center gap-2 mb-2">
              <BeakerIcon className="w-5 h-5 text-secondary" />
              <h3 className="font-semibold text-gray-900">
                Teacher/Admin Portal
              </h3>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Manage Class → Paper → Chapter → Content</li>
              <li>• Create exams & add questions (multi-type)</li>
              <li>• Moderate student blogs/questions</li>
              <li>• View students & performance</li>
              <li>• Analytics-ready structure</li>
            </ul>
            <Link
              to="/admin/adminDashboard"
              onClick={() => chooseRole("admin")}
              className="inline-block mt-3 text-primary hover:underline text-sm"
            >
              Go to Admin →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} House of Alchemists</span>
          <span>Built for Bangladesh • Chemistry • Education </span>
        </div>
      </footer>
    </div>
  );
}
