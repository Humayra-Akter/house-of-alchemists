import { Link, useNavigate } from "react-router-dom";
import { AcademicCapIcon, BeakerIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function Entry() {
  const navigate = useNavigate();

  // Optional: auto-redirect if role was chosen before
  useEffect(() => {
    const lastRole = localStorage.getItem("hoa_role");
    if (lastRole) navigate("/login"); // go to login page first
  }, [navigate]);

  const chooseRole = (role) => {
    localStorage.setItem("hoa_role", role);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-black via-sky-950 to-amber-950 bg-[length:400%_400%] animate-gradient" />
      {/* floating chemistry blobs */}
      <div className="absolute -top-20 -left-24 w-80 h-80 bg-primary/35 blur-3xl rounded-full animate-blob" />
      <div className="absolute top-32 -right-24 w-96 h-96 bg-secondary/35 blur-3xl rounded-full animate-blob animation-delay-2000" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-yellow-950/30 blur-3xl rounded-full animate-blob animation-delay-4000" />
      {/* subtle hue drift */}
      <div className="absolute inset-0 -z-10 animate-hue" />

      {/* content card area */}
      <div className="relative">
        {/* keep your existing Entry content but swap background/text colors */}
        {/* Header */}
        <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BeakerIcon className="w-6 h-6 text-white/90" />
            <h1 className="text-xl font-bold">House of Alchemists</h1>
          </div>
          <Link
            to="/login"
            className="text-sm text-white/80 hover:text-white"
            onClick={() => chooseRole("admin")}
          >
            Admin Login →
          </Link>
        </header>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-12 grid gap-8 md:grid-cols-2 items-center">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/15">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Learn. Test. Master.{" "}
              <span className="text-amber-200">Chemistry</span>.
            </h2>
            <p className="mt-3 text-white/80">
              Smart resources, real-time exams, and a vibrant Q&amp;A community
              for SSC, HSC, and Admission.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/login"
                onClick={() => chooseRole("student")}
                className="bg-white text-gray-900 hover:opacity-90 px-5 py-2.5 rounded-md text-sm"
              >
                I’m a Student
              </Link>
              <Link
                to="/login"
                onClick={() => chooseRole("admin")}
                className="bg-transparent border border-white/40 hover:bg-white/10 text-white px-5 py-2.5 rounded-md text-sm"
              >
                I’m a Teacher/Admin
              </Link>
            </div>
            <div className="mt-4 text-xs text-white/70">
              You’ll be redirected to login before accessing your dashboard.
            </div>
          </div>

          {/* Role Cards (frosted) */}
          <div className="grid gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/15 hover:bg-white/15 transition">
              <div className="flex items-center gap-2 mb-2">
                <AcademicCapIcon className="w-5 h-5 text-white/90" />
                <h3 className="font-semibold">Student Portal</h3>
              </div>
              <ul className="text-sm text-white/90 space-y-1">
                <li>• Personalized dashboard & upcoming exams</li>
                <li>• Notes: PDF, YouTube, text</li>
                <li>• Timed exams with anti-cheat</li>
                <li>• Results with explanations</li>
                <li>• Ask doubts & discussions</li>
              </ul>
              <Link
                to="/login"
                onClick={() => chooseRole("student")}
                className="inline-block mt-3 text-amber-200 hover:underline text-sm"
              >
                Go to Login →
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/15 hover:bg-white/15 transition">
              <div className="flex items-center gap-2 mb-2">
                <BeakerIcon className="w-5 h-5 text-white/90" />
                <h3 className="font-semibold">Teacher/Admin Portal</h3>
              </div>
              <ul className="text-sm text-white/90 space-y-1">
                <li>• Manage Class → Paper → Chapter → Content</li>
                <li>• Create exams (multi‑type)</li>
                <li>• Moderate student blogs</li>
                <li>• View students & performance</li>
                <li>• Analytics‑ready structure</li>
              </ul>
              <Link
                to="/login"
                onClick={() => chooseRole("admin")}
                className="inline-block mt-3 text-amber-200 hover:underline text-sm"
              >
                Go to Login →
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/15 text-white/80">
          <div className="max-w-6xl mx-auto px-4 py-6 text-xs flex items-center justify-between">
            <span>© {new Date().getFullYear()} House of Alchemists</span>
            <span>Built for Bangladesh • Chemistry • Education</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
