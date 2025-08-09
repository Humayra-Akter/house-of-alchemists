import { useMemo, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { PlayCircleIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const DATA = [
  {
    title: "SSC",
    papers: [
      {
        title: "1st Paper",
        chapters: [
          {
            number: 1,
            title: "Introduction to Chemistry",
            resources: [
              {
                _id: "r1",
                type: "pdf",
                title: "Basics & Lab Safety (PDF)",
                contentUrl: "https://arxiv.org/pdf/2203.13474.pdf", // demo pdf url
              },
              {
                _id: "r2",
                type: "youtube",
                title: "What is Chemistry?",
                contentUrl: "https://www.youtube.com/watch?v=FSyAehMdpyI",
              },
              {
                _id: "r3",
                type: "text",
                title: "Key Definitions",
                textContent:
                  "Chemistry is the study of matter, its properties, and the changes it undergoes.",
              },
            ],
          },
          {
            number: 2,
            title: "Atomic Structure",
            resources: [
              {
                _id: "r4",
                type: "pdf",
                title: "Atomic Models (PDF)",
                contentUrl:
                  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
              },
              {
                _id: "r5",
                type: "youtube",
                title: "Bohr Model Explained",
                contentUrl: "https://youtu.be/s1J5Nd4Z1hQ",
              },
            ],
          },
        ],
      },
      {
        title: "2nd Paper",
        chapters: [
          {
            number: 3,
            title: "Organic Chemistry",
            resources: [
              {
                _id: "r6",
                type: "text",
                title: "Functional Groups",
                textContent:
                  "Alkanes, alkenes, alkynes, alcohols, aldehydes, ketones, carboxylic acids, amines…",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "HSC",
    papers: [
      {
        title: "1st Paper",
        chapters: [
          {
            number: 1,
            title: "Chemical Bonding",
            resources: [
              {
                _id: "r7",
                type: "youtube",
                title: "Ionic vs Covalent",
                contentUrl: "https://www.youtube.com/watch?v=QXT4OVM4vXI",
              },
            ],
          },
        ],
      },
    ],
  },
];

const ytId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/");
    return parts.includes("embed") ? parts.pop() : "";
  } catch {
    return "";
  }
};

function YouTubeEmbed({ url, title }) {
  const id = ytId(url);
  if (!id)
    return <p className="text-sm text-gray-500">Invalid YouTube link.</p>;
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

function PDFViewer({ url }) {
  return (
    <div className="w-full h-[70vh] rounded-lg border overflow-hidden bg-white">
      <iframe title="PDF" src={url} className="w-full h-full" />
    </div>
  );
}

function TextNote({ text }) {
  return (
    <div className="p-4 bg-white rounded-lg border leading-relaxed text-gray-800 whitespace-pre-wrap">
      {text}
    </div>
  );
}

function ResourceCard({ res, onOpen }) {
  return (
    <button
      onClick={() => onOpen(res)}
      className="w-full text-left rounded-lg border bg-white hover:shadow transition p-3 flex items-center gap-3"
    >
      <div className="w-9 h-9 rounded-md flex items-center justify-center bg-primary/10 text-primary">
        {res.type === "youtube" ? (
          <PlayCircleIcon className="w-5 h-5" />
        ) : res.type === "pdf" ? (
          <DocumentTextIcon className="w-5 h-5" />
        ) : (
          <span className="text-sm font-bold">T</span>
        )}
      </div>
      <div>
        <p className="font-medium text-gray-900">{res.title}</p>
        <p className="text-xs text-gray-500 uppercase">{res.type}</p>
      </div>
    </button>
  );
}

export default function Content() {
  // pretend the logged-in student is SSC; filter automatically
  const [klass, setKlass] = useState("SSC");
  const [paper, setPaper] = useState("1st Paper");
  const [openChapter, setOpenChapter] = useState(null);
  const [q, setQ] = useState("");
  const [activeRes, setActiveRes] = useState(null); // open in viewer

  // choices
  const classes = useMemo(() => DATA.map((c) => c.title), []);
  const currentClass = useMemo(
    () => DATA.find((c) => c.title === klass) || DATA[0],
    [klass]
  );
  const papers = useMemo(
    () => currentClass.papers.map((p) => p.title),
    [currentClass]
  );
  const currentPaper = useMemo(
    () =>
      currentClass.papers.find((p) => p.title === paper) ||
      currentClass.papers[0],
    [currentClass, paper]
  );

  const filteredChapters = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return currentPaper.chapters;
    return currentPaper.chapters
      .map((ch) => ({
        ...ch,
        resources: ch.resources.filter(
          (r) =>
            r.title.toLowerCase().includes(needle) ||
            (r.type === "text" && r.textContent?.toLowerCase().includes(needle))
        ),
      }))
      .filter((ch) => ch.resources.length > 0);
  }, [currentPaper, q]);

  return (
    <StudentLayout>
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-72 shrink-0">
          <div className="rounded-2xl border border-primary/20 bg-white shadow-sm p-4 space-y-4">
            {/* Class selector */}
            <div>
              <label className="text-xs font-semibold text-primary">
                Class
              </label>
              <select
                className="mt-1 w-full p-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary"
                value={klass}
                onChange={(e) => {
                  setKlass(e.target.value);
                  setPaper("1st Paper");
                  setOpenChapter(null);
                }}
              >
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Paper selector */}
            <div>
              <label className="text-xs font-semibold text-primary">
                Paper
              </label>
              <select
                className="mt-1 w-full p-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary"
                value={paper}
                onChange={(e) => {
                  setPaper(e.target.value);
                  setOpenChapter(null);
                }}
              >
                {papers.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                className="w-full pl-9 pr-3 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary"
                placeholder="Search resources..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            {/* Chapters */}
            <div>
              <p className="text-xs font-semibold text-primary mb-1">
                Chapters
              </p>
              <div className="space-y-2">
                {filteredChapters.map((ch) => {
                  const isOpen = openChapter === ch.number;
                  return (
                    <div
                      key={ch.number}
                      className="border border-primary/20 rounded-xl overflow-hidden bg-primary/5"
                    >
                      <button
                        className="w-full flex items-center justify-between p-3 bg-primary/10 hover:bg-primary/20 transition"
                        onClick={() =>
                          setOpenChapter(isOpen ? null : ch.number)
                        }
                      >
                        <span className="text-sm font-medium text-primary-dark">
                          {ch.number}. {ch.title}
                        </span>
                        <ChevronDownIcon
                          className={`w-4 h-4 text-primary transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-3 space-y-2">
                          {ch.resources.map((r) => (
                            <ResourceCard
                              key={r._id}
                              res={r}
                              onOpen={setActiveRes}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                {filteredChapters.length === 0 && (
                  <p className="text-xs text-gray-500">No matches.</p>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Viewer */}
        <section className="flex-1">
          {!activeRes ? (
            <div className="rounded-2xl border border-primary/20 bg-white shadow-sm p-10 text-center text-gray-500">
              📚 Select a resource to view
            </div>
          ) : (
            <div className="rounded-2xl border border-primary/20 bg-white shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="text-xs text-primary uppercase">
                    {activeRes.type}
                  </p>
                  <h2 className="text-lg font-bold text-primary-dark">
                    {activeRes.title}
                  </h2>
                </div>
                <button
                  className="text-xs px-3 py-1 rounded-lg border border-primary/30 hover:bg-primary/10 transition"
                  onClick={() => setActiveRes(null)}
                >
                  Close
                </button>
              </div>

              {activeRes.type === "pdf" && (
                <PDFViewer url={activeRes.contentUrl} />
              )}
              {activeRes.type === "youtube" && (
                <YouTubeEmbed
                  url={activeRes.contentUrl}
                  title={activeRes.title}
                />
              )}
              {activeRes.type === "text" && (
                <TextNote text={activeRes.textContent} />
              )}
            </div>
          )}
        </section>
      </div>
    </StudentLayout>
  );
}
