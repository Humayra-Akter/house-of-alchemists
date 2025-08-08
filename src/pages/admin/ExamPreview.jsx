import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ExamPreview({ exams }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = exams?.[id]; // Fetch exam by index

  const [current, setCurrent] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(exam?.duration * 60 || 0);

  // Shuffle options once per question
  const [shuffledOptionsList, setShuffledOptionsList] = useState([]);

  useEffect(() => {
    if (!exam) return;

    // Initialize answers
    setSelectedOptions(Array(exam.questions.length).fill(""));

    // Shuffle all options once
    const shuffled = exam.questions.map((q) => shuffleOptions(q.options));
    setShuffledOptionsList(shuffled);

    // Timer setup
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [exam]);

  if (!exam) return <div className="p-6 text-red-600">Invalid Exam ID</div>;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const shuffleOptions = (options) => {
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleOptionChange = (value) => {
    const updated = [...selectedOptions];
    updated[current] = value;
    setSelectedOptions(updated);
  };

  if (!exam || !exam.questions || !exam.questions[current]) {
    return (
      <div className="p-6 text-red-600">
        ❌ This exam has no questions yet. Please add questions from the Admin
        panel.
      </div>
    );
  }

  const currentQ = exam.questions[current];
  const options = shuffledOptionsList[current] || [];


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Timer Header */}
      <header className="bg-indigo-700 text-white py-4 px-6 flex justify-between items-center shadow">
        <h1 className="text-lg font-bold">{exam.title}</h1>
        <span className="text-sm bg-white text-indigo-700 px-3 py-1 rounded-full font-mono">
          ⏱️ {formatTime(timer)}
        </span>
      </header>

      {/* Question Area */}
      <main className="flex-1 flex justify-center items-center p-6">
        <div className="bg-white w-full max-w-3xl rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">
            Question {current + 1} of {exam.questions.length}
          </h2>

          <p className="text-gray-800 mb-4">{currentQ.text}</p>

          {currentQ.imageUrl && (
            <img
              src={currentQ.imageUrl}
              alt="question"
              className="mb-4 max-h-64 object-contain rounded"
            />
          )}

          <div className="space-y-2">
            {options.map((opt, idx) => (
              <label
                key={idx}
                className={`block p-2 border rounded cursor-pointer ${
                  selectedOptions[current] === opt
                    ? "border-indigo-600 bg-indigo-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${current}`}
                  className="mr-2"
                  value={opt}
                  checked={selectedOptions[current] === opt}
                  onChange={() => handleOptionChange(opt)}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* Results & Explanation */}
          {showResults && (
            <div className="mt-4 p-3 border-t text-sm text-gray-700">
              <p>
                ✅ Correct Answer: <strong>{currentQ.correctAnswer}</strong>
              </p>
              {currentQ.explanation && (
                <p className="mt-1">💡 Explanation: {currentQ.explanation}</p>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-between mt-6">
            <button
              className="text-gray-600 hover:underline"
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
            >
              ◀️ Previous
            </button>

            {current < exam.questions.length - 1 ? (
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={() => setCurrent((c) => c + 1)}
              >
                Next ▶️
              </button>
            ) : (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => setShowResults(true)}
              >
                ✅ Show Answers
              </button>
            )}
          </div>

          {/* Finish */}
          {showResults && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-gray-800 text-white px-6 py-2 rounded"
                onClick={() => navigate(-1)}
              >
                🔙 Finish Preview
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
