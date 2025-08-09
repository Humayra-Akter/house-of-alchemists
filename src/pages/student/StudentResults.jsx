import { useMemo, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const MOCK_RESULTS = [
  {
    id: "r1",
    examTitle: "SSC Chemistry – Chapter 3 Quiz",
    classTitle: "SSC",
    paperTitle: "1st Paper",
    chapterTitle: "Chapter 3",
    takenAt: "2025-08-05T10:30:00",
    duration: 15, // min
    score: 4,
    total: 5,
    tabSwitchDetected: false,
    breakdown: [
      {
        type: "mcq",
        text: "Which particle has a negative charge?",
        selected: "Electron",
        correct: "Electron",
        explanation: "Electrons carry a −1 charge.",
        imageUrl: "",
      },
      {
        type: "checkbox",
        text: "Select all examples of mixtures:",
        selected: ["Pure water", "Salt solution"],
        correct: ["Air", "Salt solution"],
        explanation: "Air and salt solution are mixtures.",
      },
      {
        type: "short",
        text: "SI unit of amount of substance?",
        selected: "mole",
        correct: "mole",
        explanation: "The SI unit is mole (mol).",
      },
      {
        type: "numeric",
        text: "Avogadro’s number (×10^23)?",
        selected: "6",
        correct: "6",
        explanation: "≈ 6.022×10^23 → 6.",
      },
      {
        type: "long",
        text: "Why ionic compounds conduct in molten state?",
        selected: "free ions move",
        correct: "ions move",
        explanation: "Ions are free to move and carry charge.",
      },
    ],
  },
  {
    id: "r2",
    examTitle: "SSC Chemistry – Organic Basics",
    classTitle: "SSC",
    paperTitle: "2nd Paper",
    chapterTitle: "Chapter 5",
    takenAt: "2025-08-01T19:45:00",
    duration: 30,
    score: 7,
    total: 10,
    tabSwitchDetected: true,
    breakdown: [],
  },
];

function pct(s, t) {
  return Math.round((s / t) * 100);
}

function passFail(s, t) {
  const p = (s / t) * 100;
  return p >= 40 ? "Pass" : "Fail"; // demo rule
}

function toCSV(result) {
  const rows = [
    ["Question", "Type", "Selected", "Correct", "IsCorrect"],
    ...result.breakdown.map((q, i) => [
      `${i + 1}. ${q.text}`,
      q.type,
      Array.isArray(q.selected) ? q.selected.join("; ") : q.selected ?? "",
      Array.isArray(q.correct) ? q.correct.join("; ") : q.correct ?? "",
      isCorrect(q) ? "TRUE" : "FALSE",
    ]),
  ];
  return rows
    .map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

function downloadCSV(result) {
  const csv = toCSV(result);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${result.examTitle.replace(/\s+/g, "_")}_result.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function statusBadge(pf) {
  return pf === "Pass"
    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
    : "bg-rose-50 text-rose-700 border-rose-100";
}

function isCorrect(q) {
  if (!q) return false;
  if (q.type === "checkbox") {
    const a = (q.selected || []).slice().sort();
    const c = (q.correct || []).slice().sort();
    return JSON.stringify(a) === JSON.stringify(c);
  }
  if (q.type === "long") {
    const a = String(q.selected || "").toLowerCase();
    const c = String(q.correct || "").toLowerCase();
    return !!c && a.includes(c);
  }
  return (
    String(q.selected || "").toLowerCase() ===
    String(q.correct || "").toLowerCase()
  );
}

export default function StudentResults() {
  const [q, setQ] = useState("");
  const [klass, setKlass] = useState("All");
  const [paper, setPaper] = useState("All");
  const [outcome, setOutcome] = useState("All");
  const [sort, setSort] = useState("dateDesc");
  const [detail, setDetail] = useState(null); // active result for drawer
  const [showOnlyWrong, setShowOnlyWrong] = useState(false);

  const classes = ["All", "SSC", "HSC"];
  const papers = ["All", "1st Paper", "2nd Paper"];
  const outcomes = ["All", "Pass", "Fail"];

  const filtered = useMemo(() => {
    let data = [...MOCK_RESULTS];
    const needle = q.trim().toLowerCase();
    if (needle) {
      data = data.filter(
        (r) =>
          r.examTitle.toLowerCase().includes(needle) ||
          r.chapterTitle.toLowerCase().includes(needle)
      );
    }
    if (klass !== "All") data = data.filter((r) => r.classTitle === klass);
    if (paper !== "All") data = data.filter((r) => r.paperTitle === paper);
    if (outcome !== "All")
      data = data.filter((r) => passFail(r.score, r.total) === outcome);

    data.sort((a, b) => {
      if (sort === "dateDesc") return new Date(b.takenAt) - new Date(a.takenAt);
      if (sort === "dateAsc") return new Date(a.takenAt) - new Date(b.takenAt);
      if (sort === "scoreDesc") return b.score / b.total - a.score / a.total;
      if (sort === "scoreAsc") return a.score / a.total - b.score / b.total;
      return 0;
    });
    return data;
  }, [q, klass, paper, outcome, sort]);

  return (
    <StudentLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Results</h1>
        <p className="text-sm text-gray-600">
          Review your past exams, answers, and explanations.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative md:w-1/3">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className="w-full pl-9 pr-3 py-2 border rounded-lg"
              placeholder="Search exams, chapters…"
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
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
            >
              {outcomes.map((o) => (
                <option key={o}>{o}</option>
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
              <option value="dateDesc">Date ↓</option>
              <option value="dateAsc">Date ↑</option>
              <option value="scoreDesc">Score ↓</option>
              <option value="scoreAsc">Score ↑</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results list */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((r) => {
          const p = pct(r.score, r.total);
          const pf = passFail(r.score, r.total);
          const badge = statusBadge(pf);
          return (
            <div
              key={r.id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{r.examTitle}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${badge}`}
                >
                  {pf}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Class: <span className="font-medium">{r.classTitle}</span> •
                Paper: <span className="font-medium">{r.paperTitle}</span> •
                Chapter: <span className="font-medium">{r.chapterTitle}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Taken:{" "}
                <span className="font-medium">
                  {new Date(r.takenAt).toLocaleString()}
                </span>{" "}
                • Duration:{" "}
                <span className="font-medium">{r.duration} mins</span>
              </p>

              {r.tabSwitchDetected && (
                <p className="mt-2 text-xs px-2 py-1 rounded bg-amber-50 text-amber-800 border border-amber-100 inline-block">
                  ⚠️ Tab switch detected
                </p>
              )}

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded bg-gray-50 border text-sm">
                    Score:{" "}
                    <strong>
                      {r.score}/{r.total}
                    </strong>{" "}
                    ({p}%)
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50"
                    onClick={() => downloadCSV(r)}
                  >
                    <ArrowDownTrayIcon className="w-4 h-4 inline-block mr-1" />
                    Export CSV
                  </button>
                  <button
                    className="text-sm px-4 py-2 rounded-md bg-primary text-white hover:opacity-90"
                    onClick={() => {
                      setShowOnlyWrong(false);
                      setDetail(r);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-500 bg-white border rounded-xl p-10 mt-4">
          No results found.
        </div>
      )}

      {/* Detail Drawer */}
      {detail && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setDetail(null)} />
          <aside className="w-full max-w-2xl h-full bg-white shadow-xl border-l border-gray-200">
            <div className="h-14 px-4 border-b flex items-center justify-between">
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{detail.examTitle}</h3>
                <p className="text-xs text-gray-500">
                  {new Date(detail.takenAt).toLocaleString()} •{" "}
                  {detail.duration} mins
                </p>
              </div>
              <button
                className="p-2 rounded hover:bg-gray-50"
                onClick={() => setDetail(null)}
                aria-label="Close"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-3.5rem)] space-y-4">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded bg-gray-50 border text-sm">
                  Score:{" "}
                  <strong>
                    {detail.score}/{detail.total}
                  </strong>{" "}
                  ({pct(detail.score, detail.total)}%)
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge(
                    passFail(detail.score, detail.total)
                  )}`}
                >
                  {passFail(detail.score, detail.total)}
                </span>
                {detail.tabSwitchDetected && (
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-100">
                    ⚠ Tab switch detected
                  </span>
                )}
                <label className="ml-auto text-xs inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={showOnlyWrong}
                    onChange={(e) => setShowOnlyWrong(e.target.checked)}
                  />
                  Show only wrong
                </label>
              </div>

              {detail.breakdown.length === 0 && (
                <p className="text-sm text-gray-500">
                  Breakdown not available for this attempt.
                </p>
              )}

              <ol className="space-y-3 list-decimal pl-5">
                {detail.breakdown
                  .map((q, i) => ({ q, i, correct: isCorrect(q) }))
                  .filter((item) => (showOnlyWrong ? !item.correct : true))
                  .map(({ q, i, correct }) => (
                    <li key={i} className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        {correct ? (
                          <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <XCircleIcon className="w-4 h-4 text-rose-600" />
                        )}
                        <span className="text-xs text-gray-500 uppercase">
                          {q.type}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">{q.text}</p>
                      {q.imageUrl && (
                        <img
                          src={q.imageUrl}
                          alt="q"
                          className="mt-2 rounded border max-h-48 object-contain"
                        />
                      )}
                      <div className="mt-2 text-sm text-gray-800">
                        <p>
                          <span className="text-gray-500">Your answer:</span>{" "}
                          <strong>
                            {Array.isArray(q.selected)
                              ? q.selected.join(", ")
                              : String(q.selected ?? "—")}
                          </strong>
                        </p>
                        <p>
                          <span className="text-gray-500">Correct:</span>{" "}
                          <strong>
                            {Array.isArray(q.correct)
                              ? q.correct.join(", ")
                              : String(q.correct ?? "—")}
                          </strong>
                        </p>
                        {q.explanation && (
                          <p className="mt-1 text-gray-700">
                            💡 {q.explanation}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
              </ol>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  className="text-sm px-3 py-2 rounded-md border hover:bg-gray-50"
                  onClick={() => downloadCSV(detail)}
                >
                  <ArrowDownTrayIcon className="w-4 h-4 inline-block mr-1" />
                  Export CSV
                </button>
                <button
                  className="text-sm px-4 py-2 rounded-md bg-primary text-white hover:opacity-90"
                  onClick={() => setDetail(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </StudentLayout>
  );
}
