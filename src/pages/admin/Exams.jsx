import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function Exams() {
  const [exams, setExams] = useState([
    {
      title: "SSC 1st Paper - Chapter 5 Quiz",
      duration: 30,
      chapter: "Chapter 5",
      status: "draft", // or 'published'
      tags: ["Organic", "Model Test"],
      difficulty: "Medium",
      startTime: "2025-08-10T10:00",
      endTime: "2025-08-10T11:00",
      questions: [],
      results: [
        { student: "Nusrat", score: 8, timeSpent: 22 },
        { student: "Farhan", score: 6, timeSpent: 28 },
      ],
    },
  ]);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);
  const [questionStep, setQuestionStep] = useState(0);
  const [questionData, setQuestionData] = useState({
    type: "mcq", // New: type field added
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    correctAnswers: [], // for checkbox
    explanation: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    duration: "",
    chapter: "",
    status: "draft",
    tags: "",
    difficulty: "Easy",
    startTime: "",
    endTime: "",
  });

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddExam = () => {
    if (!form.title || !form.duration || !form.chapter) return;

    const newExam = {
      title: form.title,
      duration: parseInt(form.duration),
      chapter: form.chapter,
      status: form.status,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      difficulty: form.difficulty,
      startTime: form.startTime,
      endTime: form.endTime,
      questions: [],
      results: [],
    };

    setExams([...exams, newExam]);
    setForm({
      title: "",
      duration: "",
      chapter: "",
      status: "draft",
      tags: "",
      difficulty: "Easy",
      startTime: "",
      endTime: "",
    });
    setShowModal(false);
  };

  const getExamStatusLabel = (start, end) => {
    const now = new Date();
    const startTime = new Date(start);
    const endTime = new Date(end);

    if (now < startTime)
      return { label: "Upcoming", color: "bg-blue-100 text-blue-700" };
    if (now > endTime)
      return { label: "Closed", color: "bg-gray-300 text-gray-700" };
    return { label: "Ongoing", color: "bg-green-100 text-green-700" };
  };

  const getExamStats = (results) => {
    const total = results.length;
    if (total === 0) return { total, avg: 0, max: 0 };

    const scores = results.map((r) => r.score);
    const avg = scores.reduce((a, b) => a + b, 0) / total;
    const max = Math.max(...scores);

    return {
      total,
      avg: avg.toFixed(2),
      max,
    };
  };

  const exportCSV = (results, title) => {
    if (!results.length) return;

    const headers = "Student,Score,TimeSpent (min)";
    const rows = results.map(
      (r) => `${r.student},${r.score},${r.timeSpent || "-"}`
    );
    const csv = [headers, ...rows]?.join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "_")}_results.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold text-indigo-700">📘 Manage Exams</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition"
          onClick={() => setShowModal(true)}
        >
          + Create New Exam
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search exams by title..."
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Exam List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map((exam, index) => (
          <div
            key={index}
            className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition-all border border-gray-200"
          >
            <div className="flex items-center flex-wrap gap-2 text-xs mb-2">
              <span
                className={`px-2 py-0.5 rounded-full font-medium ${
                  exam.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {exam.status}
              </span>

              <span
                className={`px-2 py-0.5 rounded-full font-medium ${
                  exam.difficulty === "Easy"
                    ? "bg-blue-100 text-blue-700"
                    : exam.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {exam.difficulty}
              </span>

              {exam.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600 mb-1">
              ⏱️ Duration:{" "}
              <span className="font-medium">{exam.duration} mins</span>
            </p>
            {exam.startTime && exam.endTime && (
              <p className="text-sm">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    getExamStatusLabel(exam.startTime, exam.endTime).color
                  }`}
                >
                  {getExamStatusLabel(exam.startTime, exam.endTime).label}
                </span>
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => alert("Edit feature coming soon!")}
              >
                ✏️ Edit
              </button>
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={() => navigate(`/admin/exams/preview/${index}`)}
              >
                👀 Preview
              </button>

              <button
                className="text-sm text-orange-600 hover:underline"
                onClick={() => {
                  const original = exams[index];
                  const cloned = {
                    ...original,
                    title: `${original.title} (Copy)`,
                    results: [],
                  };
                  setExams([...exams, cloned]);
                }}
              >
                📤 Duplicate
              </button>

              <button
                className="text-sm text-red-600 hover:underline"
                onClick={() => {
                  const updated = [...exams];
                  updated.splice(index, 1);
                  setExams(updated);
                }}
              >
                🗑️ Delete
              </button>
              <button
                className="text-sm text-purple-600 hover:underline"
                onClick={() => {
                  setSelectedExam(index);
                  setQuestionStep(0);
                  setQuestionData({
                    type: "mcq",
                    text: "",
                    options: ["", "", "", ""],
                    correctAnswer: "",
                    correctAnswers: [],
                    explanation: "",
                  });
                }}
              >
                ➕ Add Questions
              </button>
            </div>

            {/* Divider */}
            <hr className="my-3" />

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                🏆 Leaderboard
              </h3>
              {exam.results?.length ? (
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-0.5">
                  {exam.results.map((r, i) => (
                    <li key={i}>
                      {r.student}:{" "}
                      <span className="font-semibold">{r.score}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No results yet.</p>
              )}
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                📊 Exam Stats
              </h3>
              {exam.results.length > 0 ? (
                <ul className="text-sm text-gray-700 list-inside space-y-0.5">
                  <li>
                    👥 Participants:{" "}
                    <strong>{getExamStats(exam.results).total}</strong>
                  </li>
                  <li>
                    🧠 Avg Score:{" "}
                    <strong>{getExamStats(exam.results).avg}</strong>
                  </li>
                  <li>
                    🥇 Highest Score:{" "}
                    <strong>{getExamStats(exam.results).max}</strong>
                  </li>
                  <li>
                    <button
                      className="text-indigo-600 text-xs hover:underline mt-1"
                      onClick={() => exportCSV(exam.results, exam.title)}
                    >
                      ⬇️ Download Result Sheet (CSV)
                    </button>
                  </li>
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No results yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Exam Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[500px] transform transition-all scale-100">
            <h2 className="text-xl font-bold mb-4">Create New Exam</h2>

            <input
              type="text"
              placeholder="Exam Title"
              className="w-full p-2 border mb-2 rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="number"
              placeholder="Duration (mins)"
              className="w-full p-2 border mb-2 rounded"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
            <input
              type="text"
              placeholder="Chapter"
              className="w-full p-2 border mb-2 rounded"
              value={form.chapter}
              onChange={(e) => setForm({ ...form, chapter: e.target.value })}
            />

            <select
              className="w-full p-2 border mb-2 rounded"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full p-2 border mb-2 rounded"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />

            <select
              className="w-full p-2 border mb-2 rounded"
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <input
              type="datetime-local"
              className="w-full p-2 border mb-2 rounded"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
            <input
              type="datetime-local"
              className="w-full p-2 border mb-4 rounded"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                className="text-gray-600 hover:underline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={handleAddExam}
              >
                Add Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {selectedExam !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              Add Question to {exams[selectedExam].title}
            </h2>

            <div className="space-y-3">
              <select
                className="w-full p-2 border rounded mb-2"
                value={questionData.type}
                onChange={(e) =>
                  setQuestionData({ ...questionData, type: e.target.value })
                }
              >
                <option value="mcq">Multiple Choice (Single)</option>
                <option value="checkbox">Multiple Choice (Multiple)</option>
                <option value="short">Short Answer</option>
                <option value="long">Long Answer</option>
                <option value="numeric">Numeric</option>
              </select>

              {["mcq", "checkbox"].includes(questionData.type) && (
                <>
                  {questionData.options.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder={`Option ${idx + 1}`}
                      className="w-full p-2 border rounded mb-2"
                      value={opt}
                      onChange={(e) => {
                        const newOptions = [...questionData.options];
                        newOptions[idx] = e.target.value;
                        setQuestionData({
                          ...questionData,
                          options: newOptions,
                        });
                      }}
                    />
                  ))}

                  {questionData.type === "mcq" ? (
                    <input
                      type="text"
                      placeholder="Correct Answer"
                      className="w-full p-2 border mb-2 rounded"
                      value={questionData.correctAnswer}
                      onChange={(e) =>
                        setQuestionData({
                          ...questionData,
                          correctAnswer: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Correct Answers (comma-separated)"
                      className="w-full p-2 border mb-2 rounded"
                      value={questionData.correctAnswers?.join(", ")}
                      onChange={(e) =>
                        setQuestionData({
                          ...questionData,
                          correctAnswers: e.target.value
                            .split(",")
                            .map((a) => a.trim()),
                        })
                      }
                    />
                  )}
                </>
              )}

              {["short", "long", "numeric"].includes(questionData.type) && (
                <input
                  type="text"
                  placeholder="Expected Answer"
                  className="w-full p-2 border mb-2 rounded"
                  value={questionData.correctAnswer}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      correctAnswer: e.target.value,
                    })
                  }
                />
              )}

              <input
                type="text"
                placeholder="Correct Answer"
                className="w-full p-2 border rounded"
                value={questionData.correctAnswer}
                onChange={(e) =>
                  setQuestionData({
                    ...questionData,
                    correctAnswer: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Explanation"
                className="w-full p-2 border rounded"
                rows={3}
                value={questionData.explanation}
                onChange={(e) =>
                  setQuestionData({
                    ...questionData,
                    explanation: e.target.value,
                  })
                }
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="text-gray-600 hover:underline"
                  onClick={() => setSelectedExam(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() => {
                    const updatedExams = [...exams];
                    if (
                      !questionData.text ||
                      (["mcq", "checkbox"].includes(questionData.type) &&
                        questionData.options.some((o) => !o))
                    ) {
                      alert("Please complete the question and all options.");
                      return;
                    }
                    setExams(updatedExams);
                    setQuestionData({
                      text: "",
                      options: ["", "", "", ""],
                      correctAnswer: "",
                      explanation: "",
                    });
                    setQuestionStep(questionStep + 1);
                  }}
                >
                  Add Question #{questionStep + 1}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
