import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  UserCircleIcon,
  InformationCircleIcon,
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const MENU = [
  { name: "Dashboard", path: "/student/studentDashboard", Icon: HomeIcon },
  { name: "Content", path: "/student/content", Icon: BookOpenIcon },
  { name: "Exams", path: "/student/exams", Icon: ClipboardDocumentListIcon },
  { name: "Blogs", path: "/student/blogs", Icon: ChatBubbleLeftRightIcon },
  { name: "Results", path: "/student/results", Icon: TrophyIcon },
  { name: "Profile", path: "/student/profile", Icon: UserCircleIcon },
  { name: "About", path: "/student/about", Icon: InformationCircleIcon },
];

export default function StudentLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // mock student (swap with auth later)
  const student = { name: "Nusrat", klass: "SSC" };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const NavItem = ({ name, path, Icon }) => {
    const active = isActive(path);
    return (
      <Link
        to={path}
        onClick={() => setOpen(false)}
        aria-current={active ? "page" : undefined}
        className={`group flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium outline-none transition
          ${
            active
              ? "bg-primary/10 text-primary"
              : "text-gray-700 hover:bg-gray-100 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          }`}
      >
        <Icon
          className={`w-5 h-5 ${
            active ? "text-primary" : "text-gray-500 group-hover:text-primary"
          }`}
        />
        <span className="truncate">{name}</span>
      </Link>
    );
  };

  const handleLogout = () => {
    localStorage.clear(); // clear auth-related keys
    navigate("/", { replace: true }); // go to login
  };

  return (
    <div className="min-h-screen bg-background text-gray-900 flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
        <div className="h-16 px-4 flex items-center gap-2 border-b">
          <AcademicCapIcon className="w-6 h-6 text-secondary" />
          <span className="font-extrabold text-lg">House of Alchemists</span>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-semibold">{student.name}</p>
            <span className="inline-flex mt-1 text-xs px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
              Class: {student.klass}
            </span>
          </div>

          <nav className="flex flex-col gap-2">
            {MENU.map((m) => (
              <NavItem key={m.path} {...m} />
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed inset-x-0 top-0 h-14 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <button
          className="p-2 rounded-lg hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary/30"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <AcademicCapIcon className="w-5 h-5 text-secondary" />
          <span className="font-semibold">HoA • Student</span>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
          {student.klass}
        </span>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
          <div className="w-72 h-full bg-white border-l border-gray-200 shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AcademicCapIcon className="w-6 h-6 text-secondary" />
                <span className="font-extrabold">HoA</span>
              </div>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary/30"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Hi, {student.name}</p>
              <span className="inline-flex text-xs px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                Class: {student.klass}
              </span>
            </div>

            <nav className="flex flex-col gap-2">
              {MENU.map((m) => (
                <NavItem key={m.path} {...m} />
              ))}
            </nav>

            <div className="mt-auto pt-4 border-t">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main area */}
      <main className="flex-1 min-h-screen">
        {/* Spacer for mobile header */}
        <div className="md:hidden h-14" />
        <div className="max-w-6xl mx-auto p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
