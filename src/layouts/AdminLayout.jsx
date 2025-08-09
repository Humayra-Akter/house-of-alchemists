import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  PencilIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const menu = [
  {
    name: "Dashboard",
    path: "/admin/adminDashboard",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    name: "Resources",
    path: "/admin/resources",
    icon: <BookOpenIcon className="w-5 h-5" />,
  },
  {
    name: "Exams",
    path: "/admin/exams",
    icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
  },
  {
    name: "Moderate Blogs",
    path: "/admin/questions",
    icon: <PencilIcon className="w-5 h-5" />,
  },
  {
    name: "Students",
    path: "/admin/students",
    icon: <UsersIcon className="w-5 h-5" />,
  },
];


export default function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-5 font-extrabold text-xl text-indigo-700 border-b border-gray-200 flex items-center gap-2">
          🧪 Alchemists Admin
        </div>
        <nav className="flex flex-col p-4 gap-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm font-medium
                  ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
        {/* somewhere in header area */}
        <button
          className="text-xs text-gray-600 hover:text-primary"
          onClick={() => {
            localStorage.removeItem("hoa_role");
            window.location.href = "/";
          }}
        >
          Switch role
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-8 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
