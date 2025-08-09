import { useState } from "react";

export default function AddResourceModal({ isOpen, onClose, onAdd }) {
  const [type, setType] = useState("pdf");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    onAdd({ type, title, content });
    onClose();
    // reset form
    setTitle("");
    setContent("");
    setType("pdf");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-background p-6 rounded shadow-lg w-96 space-y-4">
        <h2 className="text-xl text-center text-primary font-bold">Add New Resource</h2>

        <select
          className="w-full border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="pdf">PDF</option>
          <option value="youtube">YouTube</option>
          <option value="text">Text Note</option>
        </select>

        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {type === "text" ? (
          <textarea
            placeholder="Enter text note"
            className="w-full border p-2 rounded"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <input
            type="text"
            placeholder="Content URL"
            className="w-full border p-2 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-red-700 hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
