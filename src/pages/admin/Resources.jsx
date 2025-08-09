import { useState } from "react";
import AddResourceModal from "../../components/AddResourceModal";
import AdminLayout from "../../layouts/AdminLayout";

export default function Resources() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Sample resources data
  const [resources, setResources] = useState([
    {
      type: "pdf",
      title: "Organic Chemistry Notes",
      content: "#", // PDF URL
    },
    {
      type: "youtube",
      title: "Chemical Bonding",
      content: "https://www.youtube.com/embed/5xVh-7ywKpE",
    },
  ]);

  const handleAddResource = (newRes) => {
    setResources([...resources, newRes]);
  };
  // Filter resources based on search input
  const filteredResources = resources.filter((res) =>
    res.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-primary mb-4">
        Manage Resources
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {/* Left Panel (Class → Paper → Chapter) */}
        <div className="col-span-1 bg-white p-4 rounded border shadow">
          <h2 className="font-semibold mb-2">Navigation</h2>
          <div className="space-y-2">
            <select className="w-full p-2 border rounded">
              <option>SSC</option>
              <option>HSC</option>
            </select>
            <select className="w-full p-2 border rounded">
              <option>1st Paper</option>
              <option>2nd Paper</option>
            </select>
            <select className="w-full p-2 border rounded">
              <option>Chapter 1</option>
              <option>Chapter 2</option>
              <option>Chapter 3</option>
            </select>
            <button className="w-full mt-2 bg-primary text-white py-2 rounded hover:bg-secondary transition">
              Add Chapter
            </button>
          </div>
        </div>

        {/* Right Panel (Resources for selected chapter) */}
        <div className="col-span-3 border bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Resources in Chapter 1</h2>
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full p-2 border rounded mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            {filteredResources.map((res, index) => (
              <div key={index} className="p-4 border rounded shadow-sm">
                <p className="font-semibold">
                  {res.type.toUpperCase()}: {res.title}
                </p>

                {res.type === "youtube" ? (
                  <iframe
                    className="w-full h-40 mt-2 rounded"
                    src={res.content}
                    title={res.title}
                    allowFullScreen
                  ></iframe>
                ) : res.type === "pdf" ? (
                  <a
                    href={res.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    View PDF
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-gray-700">{res.content}</p>
                )}

                <div className="mt-2 flex gap-2">
                  <button className="text-sm font-bold text-green-600">Edit</button>
                  <button className="text-sm font-bold text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Resource Button */}
          <div className="mt-4">
            <button
              className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Resource
            </button>
          </div>

          <AddResourceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddResource}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
