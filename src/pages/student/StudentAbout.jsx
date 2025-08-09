import { useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import {
  BeakerIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function StudentAbout() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: "What is House of Alchemists?",
      a: "A smart EdTech platform focused on Chemistry for SSC, HSC, and Admission level. Learn with structured resources, practice exams, and a supportive Q&A community.",
    },
    {
      q: "Is it free to use?",
      a: "Core features are free in this demo. Schools/teachers can later enable premium analytics and customized content for their cohorts.",
    },
    {
      q: "How are exams protected from cheating?",
      a: "We track tab switching and support full‑screen test mode. Admins can review flagged attempts and trends.",
    },
    {
      q: "Which devices are supported?",
      a: "Modern browsers on desktop, tablet, and mobile. Chrome/Edge/Firefox recommended.",
    },
  ];

  const Feature = ({ icon, title, desc }) => (
    <div className="p-4 rounded-xl border bg-white shadow-sm hover:shadow transition">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );

  const Badge = ({ children }) => (
    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full border bg-white">
      {children}
    </span>
  );

  return (
    <StudentLayout>
      {/* Hero */}
      <section className="rounded-2xl overflow-hidden shadow-sm border">
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex items-center gap-2 opacity-90">
              <AcademicCapIcon className="w-6 h-6" />
              <span className="uppercase tracking-wider text-xs">About</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold">
              House of Alchemists
            </h1>
            <p className="mt-2 max-w-2xl text-white/90">
              Democratizing Chemistry education in Bangladesh with structured
              content, smart exams, and a supportive community.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>SSC • HSC • Admission</Badge>
              <Badge>Chemistry‑first</Badge>
              <Badge>Bangla‑friendly UI</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto mt-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Our Mission</h2>
          <p className="text-gray-700 mt-2">
            Make high‑quality Chemistry learning accessible to every student —
            from formula basics to admission readiness — with clear notes,
            targeted practice, and instant feedback.
          </p>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <Feature
              icon={<BeakerIcon className="w-5 h-5 text-secondary" />}
              title="Structured Resources"
              desc="Class → Paper → Chapter → Content (PDF, YouTube, Text) with quick search."
            />
            <Feature
              icon={<ShieldCheckIcon className="w-5 h-5 text-secondary" />}
              title="Smart Exams"
              desc="Timer, one‑page navigation, anti‑cheat flags, explanations, and results."
            />
            <Feature
              icon={<SparklesIcon className="w-5 h-5 text-secondary" />}
              title="Community Q&A"
              desc="Ask doubts, get upvotes, and see highlighted best answers."
            />
            <Feature
              icon={<CheckCircleIcon className="w-5 h-5 text-secondary" />}
              title="Admin Control"
              desc="Create exams, manage content, and review student performance."
            />
          </div>
        </div>

        {/* Quick Stats / Tech */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">Tech Stack</h3>
          <ul className="mt-3 text-sm text-gray-700 space-y-1">
            <li>⚛️ React + Tailwind CSS</li>
            <li>🟩 Node.js + Express (API)</li>
            <li>🍃 MongoDB (Data)</li>
            <li>🔥 Firebase Auth (Email/Password)</li>
            <li>☁️ Cloudinary / Firebase Storage</li>
          </ul>

          <h3 className="mt-6 font-semibold text-gray-900">Focus Areas</h3>
          <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
            <li>Bangladesh curriculum alignment (SSC/HSC)</li>
            <li>Low‑bandwidth friendly content</li>
            <li>Mobile‑first usability</li>
          </ul>

          <div className="mt-6 p-3 rounded-xl border bg-gray-50 text-sm">
            <p>
              <span className="font-medium">Current version:</span> v0.1 (UI
              demo)
            </p>
            <p className="text-gray-600">
              Next up: teacher analytics & notifications.
            </p>
          </div>
        </div>
      </section>

      {/* Team & Credits */}
      <section className="max-w-6xl mx-auto mt-8 grid gap-6 md:grid-cols-3">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">Team</h3>
          <ul className="mt-3 text-sm text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Product & UI:</span> Aunindya & Humayra
            </li>
            <li>
              <span className="font-medium">Content:</span> Chemistry mentors
            </li>
            <li>
              <span className="font-medium">Engineering:</span> React/Node crew
            </li>
          </ul>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm md:col-span-2">
          <h3 className="font-semibold text-gray-900">Acknowledgements</h3>
          <p className="text-sm text-gray-700 mt-2">
            Thanks to students, teachers, and open‑source communities that make
            modern learning possible. Your feedback shapes the roadmap.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-xs">
            <HeartIcon className="w-4 h-4" /> Built with care for learners
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto mt-8 mb-2">
        <h2 className="text-lg font-semibold text-gray-900">FAQ</h2>
        <div className="mt-3 divide-y rounded-2xl border bg-white">
          {faqs.map((f, i) => (
            <button
              key={i}
              className="w-full text-left p-4 hover:bg-gray-50"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{f.q}</span>
                <span className="text-sm text-gray-500">
                  {open === i ? "–" : "+"}
                </span>
              </div>
              {open === i && (
                <p className="mt-2 text-sm text-gray-700">{f.a}</p>
              )}
            </button>
          ))}
        </div>
      </section>
    </StudentLayout>
  );
}
