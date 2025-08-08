import { Link, useLocation } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Resources", path: "/admin/resources" },
  { name: "Exams", path: "/admin/exams" },
  { name: "Blogs", path: "/admin/blogs" },
  { name: "Students", path: "/admin/students" },
];

export default function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 font-bold text-indigo-700 text-xl border-b">
          🧪 Alchemists Admin
        </div>
        <nav className="flex flex-col p-4 gap-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                location.pathname === item.path
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
