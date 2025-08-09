import AdminLayout from "../../layouts/AdminLayout";
import { useMemo } from "react";
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  ChartBarIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from "@heroicons/react/24/outline";

function StatCard({ icon, label, value, delta, up = true }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-700">{icon}</div>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
            up ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          }`}
        >
          {up ? (
            <ArrowUpRightIcon className="w-4 h-4" />
          ) : (
            <ArrowDownRightIcon className="w-4 h-4" />
          )}
          {delta}
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function Bar({ value, label }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded">
        <div
          className="h-2 bg-primary rounded"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  // --- mock data (replace via API later)
  const metrics = {
    totalStudents: 1240,
    activeThisWeek: 612,
    examsThisMonth: 18,
    contentItems: 276,
    deltas: {
      students: "+4.2%",
      active: "+8.1%",
      exams: "-5.0%",
      content: "+2.3%",
    },
  };

  const recentActivity = [
    {
      id: 1,
      who: "Nusrat",
      what: "attempted",
      target: "HSC Chem – Chapter 4 Quiz",
      when: "8m ago",
    },
    {
      id: 2,
      who: "Farhan",
      what: "commented on",
      target: "Esterification basics",
      when: "22m ago",
    },
    {
      id: 3,
      who: "Aisha",
      what: "viewed",
      target: "SSC 1st Paper – Ch 3 Notes (PDF)",
      when: "1h ago",
    },
    {
      id: 4,
      who: "Tahmid",
      what: "scored",
      target: "9/10 on Ionic Bonding",
      when: "2h ago",
    },
  ];

  const examStatus = [
    { label: "Upcoming", value: 7, color: "bg-blue-500" },
    { label: "Ongoing", value: 3, color: "bg-emerald-500" },
    { label: "Closed", value: 8, color: "bg-gray-400" },
  ];

  const contentBreakdown = [
    { label: "PDF", value: 132 },
    { label: "YouTube", value: 86 },
    { label: "Text", value: 58 },
  ];

  const leaderboard = [
    { name: "Nusrat", score: 92 },
    { name: "Aisha", score: 88 },
    { name: "Farhan", score: 84 },
    { name: "Tahmid", score: 80 },
    { name: "Rafi", score: 78 },
  ];

  const totals = useMemo(() => {
    const examTotal = examStatus.reduce((a, b) => a + b.value, 0);
    const contentTotal = contentBreakdown.reduce((a, b) => a + b.value, 0);
    return { examTotal, contentTotal };
  }, [examStatus, contentBreakdown]);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-600">
          Analytics for students, exams, and content
        </p>
      </div>

      {/* Top stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={<UsersIcon className="w-5 h-5" />}
          label="Total Students"
          value={metrics.totalStudents}
          delta={metrics.deltas.students}
          up
        />
        <StatCard
          icon={<ChartBarIcon className="w-5 h-5" />}
          label="Active this week"
          value={metrics.activeThisWeek}
          delta={metrics.deltas.active}
          up
        />
        <StatCard
          icon={<ClipboardDocumentListIcon className="w-5 h-5" />}
          label="Exams this month"
          value={metrics.examsThisMonth}
          delta={metrics.deltas.exams}
          up={false}
        />
        <StatCard
          icon={<BookOpenIcon className="w-5 h-5" />}
          label="Content items"
          value={metrics.contentItems}
          delta={metrics.deltas.content}
          up
        />
      </div>

      {/* Middle: charts & breakdowns */}
      <div className="grid gap-4 md:grid-cols-3 mt-6">
        {/* Exam status stacked bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">
              Exam Status Overview
            </h2>
            <span className="text-xs text-gray-500">
              {totals.examTotal} total
            </span>
          </div>

          <div className="w-full h-4 bg-gray-100 rounded overflow-hidden">
            <div className="flex h-4">
              {examStatus.map((s) => (
                <div
                  key={s.label}
                  className={`${s.color}`}
                  style={{
                    width: `${(s.value / totals.examTotal) * 100 || 0}%`,
                  }}
                  title={`${s.label}: ${s.value}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            {examStatus.map((s) => (
              <span key={s.label} className="inline-flex items-center gap-2">
                <span className={`w-3 h-3 inline-block rounded ${s.color}`} />
                <span className="text-gray-700">{s.label}</span>
                <span className="text-gray-500">({s.value})</span>
              </span>
            ))}
          </div>

          {/* Difficulty engagement bars */}
          <div className="grid md:grid-cols-3 gap-3 mt-5">
            <Bar value={78} label="Easy engagement" />
            <Bar value={62} label="Medium engagement" />
            <Bar value={44} label="Hard engagement" />
          </div>
        </div>

        {/* Content breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Content Breakdown</h2>
            <span className="text-xs text-gray-500">
              {totals.contentTotal} total
            </span>
          </div>

          <ul className="space-y-2 text-sm">
            {contentBreakdown.map((c) => (
              <li key={c.label} className="flex items-center justify-between">
                <span className="text-gray-700">{c.label}</span>
                <span className="font-medium">{c.value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <Bar
              value={(contentBreakdown[0].value / totals.contentTotal) * 100}
              label="PDF share"
            />
            <div className="mt-2">
              <Bar
                value={(contentBreakdown[1].value / totals.contentTotal) * 100}
                label="YouTube share"
              />
            </div>
            <div className="mt-2">
              <Bar
                value={(contentBreakdown[2].value / totals.contentTotal) * 100}
                label="Text share"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: activity & leaderboard */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        {/* Recent activity */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3">Recent Activity</h2>
          <ul className="divide-y">
            {recentActivity.map((a) => (
              <li key={a.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-gray-900 text-sm">
                    <span className="font-medium">{a.who}</span> {a.what}{" "}
                    <span className="font-medium">{a.target}</span>
                  </p>
                  <p className="text-xs text-gray-500">{a.when}</p>
                </div>
                <span className="text-xs text-gray-400">•••</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Leaderboard */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3">Top Scorers</h2>
          <ul className="space-y-2">
            {leaderboard.map((u, i) => (
              <li
                key={u.name}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-900">{u.name}</span>
                </div>
                <span className="text-sm font-semibold">{u.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
