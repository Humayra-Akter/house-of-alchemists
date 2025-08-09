import { useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const MOCK_STUDENTS = [
  {
    id: "U1001",
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    class: "SSC",
    joinedAt: "2025-07-02",
    examsTaken: 5,
    avgScore: 72,
  },
  {
    id: "U1002",
    name: "Farhan Rahman",
    email: "farhan@example.com",
    class: "HSC",
    joinedAt: "2025-06-20",
    examsTaken: 3,
    avgScore: 66,
  },
  {
    id: "U1003",
    name: "Aisha Karim",
    email: "aisha@example.com",
    class: "SSC",
    joinedAt: "2025-06-25",
    examsTaken: 8,
    avgScore: 81,
  },
  {
    id: "U1004",
    name: "Tahmid Hasan",
    email: "tahmid@example.com",
    class: "HSC",
    joinedAt: "2025-07-12",
    examsTaken: 2,
    avgScore: 59,
  },
];

export default function Students() {
  const [query, setQuery] = useState("");
  const [klass, setKlass] = useState("all");
  const [drawer, setDrawer] = useState(null); // student object or null

  const filtered = useMemo(() => {
    return MOCK_STUDENTS.filter((s) => {
      const matchClass = klass === "all" || s.class === klass;
      const q = query.toLowerCase();
      const matchQuery =
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q);
      return matchClass && matchQuery;
    });
  }, [query, klass]);

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-2xl font-bold text-indigo-700">👩‍🎓 Students</h1>
        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold">{filtered.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          className="w-full sm:w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-300"
          placeholder="🔍 Search by name, email, or ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="w-full sm:w-40 p-2 border rounded"
          value={klass}
          onChange={(e) => setKlass(e.target.value)}
        >
          <option value="all">All Classes</option>
          <option value="SSC">SSC</option>
          <option value="HSC">HSC</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-50">
          <div className="col-span-2">ID</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-1">Class</div>
          <div className="col-span-1 text-center">Exams</div>
          <div className="col-span-2 text-center">Avg Score</div>
        </div>

        {filtered.map((s) => (
          <button
            key={s.id}
            onClick={() => setDrawer(s)}
            className="w-full text-left grid grid-cols-12 px-4 py-3 border-t hover:bg-gray-50 transition"
          >
            <div className="col-span-2 font-mono text-xs text-gray-700">
              {s.id}
            </div>
            <div className="col-span-3 font-medium text-gray-900">{s.name}</div>
            <div className="col-span-3 text-gray-700">{s.email}</div>
            <div className="col-span-1">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  s.class === "SSC"
                    ? "bg-cyan-100 text-cyan-700"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                {s.class}
              </span>
            </div>
            <div className="col-span-1 text-center text-gray-700">
              {s.examsTaken}
            </div>
            <div className="col-span-2 text-center">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  s.avgScore >= 75
                    ? "bg-green-100 text-green-700"
                    : s.avgScore >= 60
                    ? "bg-amber-100 text-amber-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {s.avgScore}%
              </span>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No students found.
          </div>
        )}
      </div>

      {/* Drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setDrawer(null)} />
          <div className="w-full sm:w-[420px] h-full bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {drawer.name}
                </h2>
                <p className="text-sm text-gray-600">{drawer.email}</p>
              </div>
              <button
                onClick={() => setDrawer(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Student ID:</span>
                <span className="font-mono">{drawer.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Class:</span>
                <span className="font-medium">{drawer.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Joined:</span>
                <span>{drawer.joinedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Exams taken:</span>
                <span>{drawer.examsTaken}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Average score:</span>
                <span>{drawer.avgScore}%</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
              <button className="w-full bg-primary text-white px-4 py-2 rounded hover:opacity-90">
                View Attempts
              </button>
              <button className="w-full bg-amber-100 text-amber-800 px-4 py-2 rounded hover:bg-amber-200">
                Flag for Review
              </button>
              <button className="w-full bg-rose-100 text-rose-700 px-4 py-2 rounded hover:bg-rose-200">
                Remove Student
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
