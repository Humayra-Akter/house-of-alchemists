import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

export default function QuestionsModeration() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How is esterification carried out?",
      content:
        "Can someone explain with a diagram how esters are formed in organic chemistry?",
      tags: ["Organic", "Esterification"],
      student: "Nusrat",
      status: "pending",
      submittedAt: "2025-08-07T10:00",
    },
    {
      id: 2,
      title: "Difference between mitosis and meiosis?",
      content: "What are the key differences and where do they occur?",
      tags: ["Biology", "Cell Division"],
      student: "Farhan",
      status: "approved",
      submittedAt: "2025-08-06T15:00",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, status: newStatus } : q
    );
    setQuestions(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.content.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || q.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-primary mb-4">
        📝 Moderate Student Blogs/Questions
      </h1>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="🔍 Search questions..."
          className="w-full p-2 border border-accent rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border border-accent rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredQuestions.map((q) => (
          <div key={q.id} className="bg-background rounded shadow p-4 border">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-primary">
                  {q.title}
                </h2>
                <p className="text-sm text-secondary">by {q.student}</p>
                <p className="mt-2 text-gray-800">{q.content}</p>

                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  {q.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 border text-gray-700 px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  q.status === "pending"
                    ? "bg-yellow-100 border text-yellow-700"
                    : q.status === "approved"
                    ? "bg-green-100 border text-green-700"
                    : "bg-red-100 border text-red-700"
                }`}
              >
                {q.status}
              </span>
            </div>

            <div className="flex gap-3 mt-4 text-sm">
              <button
                className="text-green-700 hover:underline"
                onClick={() => handleStatusChange(q.id, "approved")}
              >
                ✅ Approve
              </button>
              <button
                className="text-yellow-700 hover:underline"
                onClick={() => handleStatusChange(q.id, "pending")}
              >
                ⏳ Mark Pending
              </button>
              <button
                className="text-red-700 hover:underline"
                onClick={() => handleStatusChange(q.id, "rejected")}
              >
                ❌ Reject
              </button>
              <button
                className="text-gray-700 hover:underline"
                onClick={() => handleDelete(q.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}

        {filteredQuestions.length === 0 && (
          <p className="text-gray-500">No questions found.</p>
        )}
      </div>
    </AdminLayout>
  );
}
