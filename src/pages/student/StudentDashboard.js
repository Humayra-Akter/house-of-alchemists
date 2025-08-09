import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import StudentLayout from "../../layouts/StudentLayout";

export default function StudentDashboard() {
  const student = { name: "Nusrat", klass: "SSC" };

  const upcomingExam = {
    id: "exam-001",
    title: "SSC Chemistry – 1st Paper (Chapter 3)",
    startTime: "2025-08-12T10:00:00",
    duration: 40,
  };

  const recentReplies = [
    { id: 1, on: "Esterification basics", by: "Admin", when: "2h ago" },
    { id: 2, on: "Periodic trends question", by: "Aisha", when: "1d ago" },
  ];

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const countdown = useMemo(() => {
    if (!upcomingExam?.startTime) return null;
    const start = new Date(upcomingExam.startTime);
    const diff = start - now;
    if (diff <= 0) return "Starts now";
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
  }, [now, upcomingExam]);

  return (
    <StudentLayout>
      <div className="min-h-screen bg-background">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-8 px-4 shadow">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold">
              👋 Hi {student.name}, ready to learn Chemistry?
            </h1>
            <p className="text-sm mt-1 opacity-90">
              Class: <span className="font-semibold">{student.klass}</span>
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
          {/* Upcoming Exam */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDaysIcon className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold">Next Exam</h2>
            </div>
            {upcomingExam ? (
              <>
                <p className="text-gray-800 font-medium text-lg">
                  {upcomingExam.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  📅 Starts:{" "}
                  <span className="font-medium">
                    {new Date(upcomingExam.startTime).toLocaleString()}
                  </span>{" "}
                  • ⏳ {upcomingExam.duration} mins
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="inline-flex items-center font-mono text-sm px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {countdown || "--"}
                  </span>
                  <Link
                    to={`/student/exams/${upcomingExam.id}`}
                    className="bg-primary hover:opacity-90 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Start when available
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-gray-600">No upcoming exams.</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-3">
              <Link
                to="/student/content"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition"
              >
                <BookOpenIcon className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-medium">Read Notes</p>
                  <p className="text-xs text-gray-600">PDF • Videos • Text</p>
                </div>
              </Link>

              <Link
                to="/blogs"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-medium">Ask a Doubt</p>
                  <p className="text-xs text-gray-600">
                    Get help from peers & admin
                  </p>
                </div>
              </Link>

              <Link
                to="/results"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition"
              >
                <TrophyIcon className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-medium">See Results</p>
                  <p className="text-xs text-gray-600">
                    Review answers & explanations
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Class Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold mb-3">Class Summary</h2>
            <div className="flex flex-wrap gap-2">
              <span className="tag bg-emerald-50 text-emerald-700">
                Organic: 12 notes
              </span>
              <span className="tag bg-amber-50 text-amber-700">
                Inorganic: 8 notes
              </span>
              <span className="tag bg-cyan-50 text-cyan-700">
                Physical: 10 notes
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <StatBox value="3" label="Upcoming" />
              <StatBox value="5" label="Completed" />
              <StatBox value="72%" label="Avg Score" />
            </div>
          </div>

          {/* Recent Replies */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardDocumentListIcon className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Recent Blog Replies</h2>
            </div>
            {recentReplies.length === 0 ? (
              <p className="text-gray-600">
                No replies yet. Ask your first question!
              </p>
            ) : (
              <ul className="divide-y">
                {recentReplies.map((r) => (
                  <li
                    key={r.id}
                    className="py-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{r.on}</p>
                      <p className="text-xs text-gray-600">
                        by {r.by} • {r.when}
                      </p>
                    </div>
                    <Link
                      to="/blogs"
                      className="text-primary hover:underline text-sm"
                    >
                      View
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

function StatBox({ value, label }) {
  return (
    <div className="p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
}
