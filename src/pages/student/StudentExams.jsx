import { useEffect, useMemo, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

const MOCK_EXAMS = [
  {
    title: "SSC Chemistry – 1st Paper (Chapter 3)",
    duration: 40,
    classTitle: "SSC",
    paperTitle: "1st Paper",
    chapterTitle: "Chapter 3",
    difficulty: "Medium",
    tags: ["Physical", "Quiz"],
    startTime: "2025-08-12T10:00:00",
    endTime: "2025-08-12T10:40:00",
    syllabus: [
      "Mole concept recap",
      "Limiting reagent",
      "Empirical vs molecular formula",
    ],
    sampleQuestions: [
      { type: "mcq", q: "Which unit measures amount of substance?", a: "mole" },
      { type: "short", q: "Define limiting reagent in one line." },
    ],
  },
  {
    title: "SSC Chemistry – 2nd Paper (Organic Basics)",
    duration: 30,
    classTitle: "SSC",
    paperTitle: "2nd Paper",
    chapterTitle: "Chapter 5",
    difficulty: "Easy",
    tags: ["Organic", "Practice"],
    startTime: "2025-08-15T19:00:00",
    endTime: "2025-08-15T19:30:00",
    syllabus: ["Hydrocarbons intro", "Functional groups", "Isomerism (basic)"],
    sampleQuestions: [
      { type: "mcq", q: "General formula of alkanes?", a: "CnH2n+2" },
      { type: "short", q: "What’s a functional group?" },
    ],
  },
  {
    title: "HSC Chemistry – Ionic Equilibrium",
    duration: 45,
    classTitle: "HSC",
    paperTitle: "1st Paper",
    chapterTitle: "Chapter 4",
    difficulty: "Hard",
    tags: ["Physical", "Model Test"],
    startTime: "2025-08-01T08:00:00",
    endTime: "2025-08-01T08:45:00",
    syllabus: ["Bronsted-Lowry acids/bases", "pH & pKa", "Buffer calculations"],
    sampleQuestions: [
      { type: "numeric", q: "pH of 1e-3 M HCl (25°C)?", a: "3" },
      { type: "long", q: "Explain buffer action with example (3–4 lines)." },
    ],
  },
];

function statusOf(start, end, now = new Date()) {
  const s = new Date(start);
  const e = new Date(end);
  if (now < s) return "Upcoming";
  if (now >= s && now <= e) return "Ongoing";
  return "Closed";
}

function Badge({ children, color = "indigo" }) {
  const map = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    gray: "bg-gray-50 text-gray-700 border-gray-200",
    red: "bg-rose-50 text-rose-700 border-rose-100",
    yellow: "bg-amber-50 text-amber-700 border-amber-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
  };
  return (
    <span
      className={`inline-flex text-xs px-2 py-0.5 rounded-full border ${map[color]}`}
    >
      {children}
    </span>
  );
}

export default function StudentExams() {
  const [q, setQ] = useState("");
  const [klass, setKlass] = useState("All");
  const [paper, setPaper] = useState("All");
  const [status, setStatus] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState("startAsc");
  const [now, setNow] = useState(new Date());
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewExam, setPreviewExam] = useState(null);
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const classes = ["All", "SSC", "HSC"];
  const papers = ["All", "1st Paper", "2nd Paper"];
  const diffs = ["All", "Easy", "Medium", "Hard"];
  const statuses = ["All", "Upcoming", "Ongoing", "Closed"];

  const filtered = useMemo(() => {
    let data = [...MOCK_EXAMS];

    // search
    const needle = q.trim().toLowerCase();
    if (needle) {
      data = data.filter(
        (e) =>
          e.title.toLowerCase().includes(needle) ||
          e.chapterTitle.toLowerCase().includes(needle) ||
          e.tags.join(" ").toLowerCase().includes(needle)
      );
    }

    // filters
    if (klass !== "All") data = data.filter((e) => e.classTitle === klass);
    if (paper !== "All") data = data.filter((e) => e.paperTitle === paper);
    if (difficulty !== "All")
      data = data.filter((e) => e.difficulty === difficulty);
    if (status !== "All")
      data = data.filter(
        (e) => statusOf(e.startTime, e.endTime, now) === status
      );

    // sort
    data.sort((a, b) => {
      const sa = new Date(a.startTime).getTime();
      const sb = new Date(b.startTime).getTime();
      if (sort === "startAsc") return sa - sb;
      if (sort === "startDesc") return sb - sa;
      if (sort === "durationAsc") return a.duration - b.duration;
      if (sort === "durationDesc") return b.duration - a.duration;
      return 0;
    });

    return data;
  }, [q, klass, paper, status, difficulty, sort, now]);

  // countdown / time info
  const timeInfo = (e) => {
    const st = new Date(e.startTime);
    const en = new Date(e.endTime);
    const stts = statusOf(e.startTime, e.endTime, now);
    if (stts === "Upcoming") {
      const diff = st - now;
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      return `Starts in ${h}h ${m}m ${s}s`;
    }
    if (stts === "Ongoing") {
      const diff = en - now;
      const m = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
      const s = Math.max(0, Math.floor((diff / 1000) % 60));
      return `Ends in ${m}m ${s}s`;
    }
    return `Ended • ${st.toLocaleString()}`;
  };

  return (
    <StudentLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Exams</h1>
        <p className="text-sm text-gray-600">
          Browse and start available exams
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* search */}
          <div className="relative md:w-1/3">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className="w-full pl-9 pr-3 py-2 border rounded-lg"
              placeholder="Search exams, chapters, tags…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="flex gap-3 flex-1">
            <select
              className="p-2 border rounded-lg w-full"
              value={klass}
              onChange={(e) => setKlass(e.target.value)}
            >
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              className="p-2 border rounded-lg w-full"
              value={paper}
              onChange={(e) => setPaper(e.target.value)}
            >
              {papers.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <select
              className="p-2 border rounded-lg w-full"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {diffs.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select
              className="p-2 border rounded-lg w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <select
              className="p-2 border rounded-lg"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="startAsc">Start time ↑</option>
              <option value="startDesc">Start time ↓</option>
              <option value="durationAsc">Duration ↑</option>
              <option value="durationDesc">Duration ↓</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exam list */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((e, i) => {
          const s = statusOf(e.startTime, e.endTime, now);
          const statusColor =
            s === "Upcoming" ? "blue" : s === "Ongoing" ? "green" : "gray";
          const diffColor =
            e.difficulty === "Easy"
              ? "green"
              : e.difficulty === "Medium"
              ? "yellow"
              : "red";
          return (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{e.title}</h3>
                <Badge color={statusColor}>{s}</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Class: <span className="font-medium">{e.classTitle}</span> •
                Paper: <span className="font-medium">{e.paperTitle}</span> •
                Chapter: <span className="font-medium">{e.chapterTitle}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                ⏱ Duration:{" "}
                <span className="font-medium">{e.duration} mins</span> • 📅{" "}
                {new Date(e.startTime).toLocaleString()}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                <Badge color={diffColor}>{e.difficulty}</Badge>
                {e.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">{timeInfo(e)}</span>
                <div className="flex items-center gap-2">
                  <button
                    className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50"
                    onClick={() => {
                      setPreviewExam(e);
                      setPreviewOpen(true);
                    }}
                  >
                    Preview
                  </button>
                  <button
                    className={`text-sm px-4 py-2 rounded-md ${
                      s === "Ongoing"
                        ? "bg-primary text-white hover:opacity-90"
                        : "bg-gray-200 text-gray-600 cursor-not-allowed"
                    }`}
                    disabled={s !== "Ongoing"}
                    onClick={() => alert("Start exam flow will be wired here")}
                  >
                    {s === "Ongoing" ? "Start" : "Locked"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 bg-white border rounded-xl p-10 mt-4">
          No exams match your filters.
        </div>
      )}
      {/* Slide-over Preview Drawer */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setPreviewOpen(false)}
            aria-label="Close preview"
          />
          {/* panel */}
          <aside className="w-full max-w-md h-full bg-white shadow-xl border-l border-gray-200 animate-[slideIn_.2s_ease]">
            <div className="h-14 px-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Exam Preview</h3>
              <button
                className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50"
                onClick={() => setPreviewOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-3.5rem)]">
              {/* Title & meta */}
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {previewExam?.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Class:{" "}
                  <span className="font-medium">{previewExam?.classTitle}</span>{" "}
                  • Paper:{" "}
                  <span className="font-medium">{previewExam?.paperTitle}</span>{" "}
                  • Chapter:{" "}
                  <span className="font-medium">
                    {previewExam?.chapterTitle}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  ⏱ Duration:{" "}
                  <span className="font-medium">
                    {previewExam?.duration} mins
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Starts:{" "}
                  {previewExam
                    ? new Date(previewExam.startTime).toLocaleString()
                    : "--"}
                </p>
              </div>

              {/* Syllabus */}
              <div className="rounded-lg border p-3">
                <h4 className="font-medium text-gray-900">
                  Syllabus / Coverage
                </h4>
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-700">
                  {previewExam?.syllabus?.length ? (
                    previewExam.syllabus.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))
                  ) : (
                    <li className="text-gray-500">Not provided</li>
                  )}
                </ul>
              </div>

              {/* Sample Questions */}
              <div className="rounded-lg border p-3">
                <h4 className="font-medium text-gray-900">Sample Questions</h4>
                <ol className="mt-2 space-y-2 list-decimal pl-5 text-sm">
                  {previewExam?.sampleQuestions?.length ? (
                    previewExam.sampleQuestions.map((sq, idx) => (
                      <li key={idx}>
                        <div className="text-gray-800">
                          <span className="uppercase text-[10px] text-gray-500 mr-2">
                            {sq.type}
                          </span>
                          {sq.q}
                        </div>
                        {sq.a && (
                          <div className="text-gray-600">
                            <span className="text-gray-500">Answer:</span>{" "}
                            <strong>{sq.a}</strong>
                          </div>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No samples available</li>
                  )}
                </ol>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  className="text-sm px-3 py-2 rounded-md border hover:bg-gray-50"
                  onClick={() => setPreviewOpen(false)}
                >
                  Back
                </button>
                <button
                  className="text-sm px-4 py-2 rounded-md bg-primary text-white hover:opacity-90"
                  onClick={() => {
                    setPreviewOpen(false);
                    // Wire to real start flow later
                    alert("Start exam flow will be wired here");
                  }}
                >
                  Start Exam
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </StudentLayout>
  );
}
