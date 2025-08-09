import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";

/** Mock exam loader (swap with API) */
const EXAMS = {
  "exam-001": {
    title: "SSC Chemistry – Chapter 3 Quiz",
    duration: 15, // minutes
    questions: [
      {
        type: "mcq",
        text: "Which particle has a negative charge?",
        options: ["Proton", "Neutron", "Electron", "Alpha particle"],
        correctAnswer: "Electron",
        explanation: "Electrons carry a −1 charge.",
        imageUrl: "",
      },
      {
        type: "checkbox",
        text: "Select all examples of mixtures:",
        options: ["Air", "Pure water", "Salt solution", "Copper wire"],
        correctAnswers: ["Air", "Salt solution"],
        explanation: "Air and salt solution are mixtures.",
      },
      {
        type: "short",
        text: "Write the SI unit of amount of substance.",
        correctAnswer: "mole",
        explanation: "The SI unit is the mole (mol).",
      },
      {
        type: "numeric",
        text: "Avogadro’s number (to nearest integer in ×10^23) is?",
        correctAnswer: "6",
        explanation: "≈ 6.022×10^23 → 6 (nearest integer).",
      },
      {
        type: "long",
        text: "Explain briefly why ionic compounds conduct electricity in molten state.",
        correctAnswer: "ions move",
        explanation: "In molten state, ions are free to move and carry charge.",
        imageUrl: "",
      },
    ],
  },
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function TakeExam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const exam = EXAMS[id];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [timer, setTimer] = useState((exam?.duration || 0) * 60);
  const [tabSwitched, setTabSwitched] = useState(false);

  const shuffledOptions = useMemo(() => {
    if (!exam) return [];
    return exam.questions.map((q) =>
      (q.type === "mcq" || q.type === "checkbox") && q.options
        ? shuffle(q.options)
        : q.options || []
    );
  }, [exam]);

  useEffect(() => {
    if (!exam) return;
    setAnswers(exam.questions.map((q) => (q.type === "checkbox" ? [] : "")));

    const t = setInterval(() => {
      setTimer((s) => {
        if (s <= 1) {
          clearInterval(t);
          setShowReview(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [exam]);

  const endedRef = useRef(false);
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && !endedRef.current) {
        endedRef.current = true;
        setTabSwitched(true);
        setShowReview(true);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const score = useMemo(() => {
    if (!showReview || !exam) return 0;
    let s = 0;
    exam.questions.forEach((_, i) => {
      if (isCorrect(i, answers[i])) s++;
    });
    return s;
  }, [showReview, answers, exam]);

  // ⛔️ Only AFTER all hooks:
  if (!exam) {
    return (
      <StudentLayout>
        <div className="p-6 text-red-600">Exam not found.</div>
      </StudentLayout>
    );
  }

  const q = exam.questions[current];
  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  const setAnswer = (val) => {
    const copy = [...answers];
    copy[current] = val;
    setAnswers(copy);
  };

  const toggleCheckbox = (val) => {
    const curr = Array.isArray(answers[current]) ? answers[current] : [];
    const exists = curr.includes(val);
    const updated = exists ? curr.filter((x) => x !== val) : [...curr, val];
    setAnswer(updated);
  };

  // correctness check
  const isCorrect = (qi, ans) => {
    const qq = exam.questions[qi];
    if (
      qq.type === "mcq" ||
      qq.type === "short" ||
      qq.type === "numeric" ||
      qq.type === "long"
    ) {
      if (!ans) return false;
      const a = String(ans).trim().toLowerCase();
      const c = String(qq.correctAnswer || "")
        .trim()
        .toLowerCase();
      if (qq.type === "long") return a.includes(c) && c.length > 0; // loose check for demo
      return a === c;
    }
    if (qq.type === "checkbox") {
      const a = Array.isArray(ans) ? ans.slice().sort() : [];
      const c = (qq.correctAnswers || []).slice().sort();
      return JSON.stringify(a) === JSON.stringify(c);
    }
    return false;
  };

  // UI parts
  const header = (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="text-sm text-gray-500">Exam</h1>
          <p className="truncate font-semibold text-gray-900">{exam.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            ⏱ {formatTime(timer)}
          </span>
          <button
            className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50"
            onClick={() => setShowReview(true)}
          >
            Submit
          </button>
        </div>
      </div>

      {/* progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-1 bg-primary transition-all"
          style={{ width: `${((current + 1) / exam.questions.length) * 100}%` }}
        />
      </div>
    </header>
  );

  const renderQuestion = () => {
    const opt = shuffledOptions[current] || [];
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white border rounded-xl shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              Question {current + 1} of {exam.questions.length}
            </h2>
            {q.imageUrl ? (
              <span className="text-xs text-gray-500">Image attached</span>
            ) : null}
          </div>

          <p className="text-gray-800">{q.text}</p>

          {q.imageUrl && (
            <img
              src={q.imageUrl}
              alt="question"
              className="rounded-lg border max-h-64 object-contain"
            />
          )}

          {/* inputs by type */}
          {q.type === "mcq" && (
            <div className="space-y-2">
              {opt.map((o) => (
                <label
                  key={o}
                  className={`block p-2 border rounded cursor-pointer ${
                    answers[current] === o
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${current}`}
                    className="mr-2"
                    checked={answers[current] === o}
                    onChange={() => setAnswer(o)}
                  />
                  {o}
                </label>
              ))}
            </div>
          )}

          {q.type === "checkbox" && (
            <div className="space-y-2">
              {opt.map((o) => {
                const checked =
                  Array.isArray(answers[current]) &&
                  answers[current].includes(o);
                return (
                  <label
                    key={o}
                    className={`block p-2 border rounded cursor-pointer ${
                      checked
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={checked}
                      onChange={() => toggleCheckbox(o)}
                    />
                    {o}
                  </label>
                );
              })}
            </div>
          )}

          {q.type === "short" && (
            <input
              className="w-full p-2 border rounded"
              placeholder="Type your answer…"
              value={answers[current] || ""}
              onChange={(e) => setAnswer(e.target.value)}
            />
          )}

          {q.type === "numeric" && (
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Enter a number…"
              value={answers[current] || ""}
              onChange={(e) => setAnswer(e.target.value)}
            />
          )}

          {q.type === "long" && (
            <textarea
              rows={4}
              className="w-full p-2 border rounded"
              placeholder="Write your explanation…"
              value={answers[current] || ""}
              onChange={(e) => setAnswer(e.target.value)}
            />
          )}

          {/* nav */}
          <div className="flex items-center justify-between pt-2">
            <button
              className="text-sm text-gray-600 hover:underline disabled:opacity-40"
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
            >
              ◀ Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: exam.questions.length }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-8 h-8 rounded-full text-xs border ${
                    i === current
                      ? "bg-primary text-white border-primary"
                      : answers[i] &&
                        ((Array.isArray(answers[i]) && answers[i].length) ||
                          (!Array.isArray(answers[i]) && answers[i] !== ""))
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              className="bg-primary text-white text-sm px-4 py-2 rounded hover:opacity-90"
              onClick={() => {
                if (current < exam.questions.length - 1)
                  setCurrent((c) => c + 1);
                else setShowReview(true);
              }}
            >
              {current < exam.questions.length - 1 ? "Next ▶" : "Submit ▶"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderReview = () => (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white border rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Review & Answers</h2>
          <span className="text-sm font-mono px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            Score: {score}/{exam.questions.length}
          </span>
        </div>

        {tabSwitched && (
          <div className="mb-3 text-sm px-3 py-2 rounded bg-amber-50 text-amber-800 border border-amber-100">
            ⚠️ Tab switch detected — attempt flagged.
          </div>
        )}

        <ol className="space-y-4 list-decimal pl-5">
          {exam.questions.map((qq, i) => {
            const correct = isCorrect(i, answers[i]);
            return (
              <li key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex text-xs px-2 py-0.5 rounded-full ${
                      correct
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {correct ? "Correct" : "Wrong"}
                  </span>
                  <span className="text-xs text-gray-500 uppercase">
                    {qq.type}
                  </span>
                </div>
                <p className="font-medium text-gray-900">{qq.text}</p>
                {qq.imageUrl && (
                  <img
                    src={qq.imageUrl}
                    alt="q"
                    className="rounded border max-h-48 object-contain"
                  />
                )}

                <div className="text-sm text-gray-800">
                  <p>
                    <span className="text-gray-500">Your answer:</span>{" "}
                    <strong>
                      {Array.isArray(answers[i])
                        ? answers[i].join(", ")
                        : String(answers[i] || "—")}
                    </strong>
                  </p>
                  <p>
                    <span className="text-gray-500">Correct:</span>{" "}
                    <strong>
                      {qq.type === "checkbox"
                        ? (qq.correctAnswers || []).join(", ")
                        : String(qq.correctAnswer || "—")}
                    </strong>
                  </p>
                  {qq.explanation && (
                    <p className="mt-1 text-gray-700">💡 {qq.explanation}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-5 flex items-center justify-between">
          <button
            className="text-sm text-gray-600 hover:underline"
            onClick={() => {
              setShowReview(false);
              setCurrent(0);
            }}
          >
            ◀ Back to questions
          </button>
          <button
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded"
            onClick={() => navigate("/student/studentDashboard")}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <StudentLayout>
      {header}
      {!showReview ? renderQuestion() : renderReview()}
    </StudentLayout>
  );
}
