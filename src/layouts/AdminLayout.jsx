import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  PencilIcon,
  UsersIcon,
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const MENU = [
  { name: "Dashboard", path: "/admin/adminDashboard", Icon: HomeIcon },
  { name: "Resources", path: "/admin/resources", Icon: BookOpenIcon },
  { name: "Exams", path: "/admin/exams", Icon: ClipboardDocumentListIcon },
  { name: "Moderate Blogs", path: "/admin/questions", Icon: PencilIcon },
  { name: "Students", path: "/admin/students", Icon: UsersIcon },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const NavItem = ({ name, path, Icon }) => (
    <Link
      to={path}
      onClick={() => setOpen(false)}
      className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
        ${
          isActive(path)
            ? "bg-primary/10 text-primary"
            : "text-gray-700 hover:bg-gray-100 hover:text-primary"
        }`}
    >
      <Icon
        className={`w-5 h-5 ${
          isActive(path)
            ? "text-primary"
            : "text-gray-500 group-hover:text-primary"
        }`}
      />
      <span className="truncate">{name}</span>
    </Link>
  );

  const handleLogout = () => {
    localStorage.removeItem("hoa_role");
    localStorage.removeItem("auth_token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar (mobile) */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 h-14 flex items-center justify-between px-4">
        <button
          className="p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <AcademicCapIcon className="w-5 h-5 text-secondary" />
          <span className="font-semibold">HoA • Admin</span>
        </div>
        <button
          className="p-2 rounded-lg hover:bg-gray-100"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex w-72 bg-white border-r border-gray-200 min-h-screen sticky top-0 flex-col">
          {/* Brand */}
          <div className="h-16 px-4 border-b flex items-center gap-2">
            <AcademicCapIcon className="w-6 h-6 text-secondary" />
            <span className="font-extrabold text-lg">Alchemists Admin</span>
          </div>

          {/* Nav */}
          <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
            {MENU.map((m) => (
              <NavItem key={m.path} {...m} />
            ))}

            {/* Section: shortcuts (optional) */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Shortcuts
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/admin/exams"
                  className="text-xs px-2 py-2 rounded-lg border hover:bg-gray-50"
                >
                  + New Exam
                </Link>
                <Link
                  to="/admin/resources"
                  className="text-xs px-2 py-2 rounded-lg border hover:bg-gray-50"
                >
                  + Add Resource
                </Link>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <button
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
              onClick={handleLogout}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="flex-1 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <div className="w-80 h-full bg-white border-l border-gray-200 shadow-xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="w-6 h-6 text-secondary" />
                  <span className="font-extrabold">Admin</span>
                </div>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto">
                {MENU.map((m) => (
                  <NavItem key={m.path} {...m} />
                ))}
              </nav>

              <div className="pt-3 border-t">
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main */}
        <main className="flex-1 min-h-screen">
          {/* Desktop topbar */}
          <div className="hidden md:flex sticky top-0 z-30 h-16 bg-white border-b border-gray-200 items-center justify-between px-6">
            <div className="min-w-0">
              <h1 className="text-sm text-gray-500">Admin</h1>
              {/* You can render a page title from each page if needed */}
            </div>
            <div className="flex items-center gap-2">
              {/* slot for page-level actions */}
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
