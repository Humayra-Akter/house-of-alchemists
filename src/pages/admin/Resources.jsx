import AdminLayout from "../../layouts/AdminLayout";

export default function Resources() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">
        Manage Resources
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {/* Left Panel (Class → Paper → Chapter) */}
        <div className="col-span-1 bg-white p-4 rounded shadow">
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
            <button className="w-full mt-2 bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Add Chapter
            </button>
          </div>
        </div>

        {/* Right Panel (Resources for selected chapter) */}
        <div className="col-span-3 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Resources in Chapter 1</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* PDF Resource Card */}
            <div className="p-4 border rounded shadow-sm">
              <p className="font-semibold">PDF: Organic Chemistry Notes</p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline"
              >
                View PDF
              </a>
              <div className="mt-2 flex gap-2">
                <button className="text-sm text-green-600">Edit</button>
                <button className="text-sm text-red-600">Delete</button>
              </div>
            </div>

            {/* YouTube Resource Card */}
            <div className="p-4 border rounded shadow-sm">
              <p className="font-semibold">Video: Chemical Bonding</p>
              <iframe
                className="w-full h-40 mt-2 rounded"
                src="https://www.youtube.com/embed/5xVh-7ywKpE"
                title="YouTube video"
                allowFullScreen
              ></iframe>
              <div className="mt-2 flex gap-2">
                <button className="text-sm text-green-600">Edit</button>
                <button className="text-sm text-red-600">Delete</button>
              </div>
            </div>
          </div>

          {/* Add Resource Button */}
          <div className="mt-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              + Add Resource
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
