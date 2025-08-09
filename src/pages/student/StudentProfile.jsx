import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import {
  PencilIcon,
  ArrowDownTrayIcon,
  BellIcon,
  MoonIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const STORAGE_KEY = "hoa_student_profile";

const DEFAULT_PROFILE = {
  name: "Nusrat Jahan",
  email: "nusrat@example.com",
  klass: "SSC",
  institute: "Dhaka City College",
  roll: "SSC-2025-017",
  joinedAt: "2025-07-10T10:00:00",
  avatarUrl: "", // optional
  prefs: {
    notifications: true,
    darkMode: false,
    emailUpdates: true,
  },
  stats: {
    attempts: 8,
    bestScorePct: 92,
    avgScorePct: 74,
  },
};

export default function StudentProfile() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState(DEFAULT_PROFILE);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const saveProfile = () => {
    setProfile(edit);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(edit));
    setEditOpen(false);
  };

  const downloadProfileJSON = () => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hoa_profile.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const togglePref = (key) => {
    const next = {
      ...profile,
      prefs: { ...profile.prefs, [key]: !profile.prefs[key] },
    };
    setProfile(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const initials = (profile.name || "Student")
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <StudentLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-600">
            View and update your account information.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-sm px-3 py-2 rounded-md border hover:bg-gray-50"
            onClick={downloadProfileJSON}
          >
            <ArrowDownTrayIcon className="w-4 h-4 inline-block mr-1" />
            Export
          </button>
          <button
            className="text-sm px-3 py-2 rounded-md bg-primary text-white hover:opacity-90"
            onClick={() => {
              setEdit(profile);
              setEditOpen(true);
            }}
          >
            <PencilIcon className="w-4 h-4 inline-block mr-1" />
            Edit
          </button>
        </div>
      </div>

      {/* Top card */}
      <div className="bg-white border rounded-xl p-5 shadow-sm mb-6">
        <div className="flex items-start gap-4">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary grid place-items-center text-lg font-bold border">
              {initials}
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-600">{profile.email}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                Class: {profile.klass}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                Roll: {profile.roll}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                Joined: {new Date(profile.joinedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            className="text-sm px-3 py-2 rounded-md border hover:bg-gray-50"
            onClick={() => setPwdOpen(true)}
          >
            Change Password
          </button>
        </div>

        {/* Details grid */}
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <InfoRow label="Full Name" value={profile.name} />
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Class" value={profile.klass} />
          <InfoRow label="Institute" value={profile.institute} />
          <InfoRow label="Roll No." value={profile.roll} />
          <InfoRow
            label="Joined"
            value={new Date(profile.joinedAt).toLocaleString()}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Attempts" value={profile.stats.attempts} />
        <StatCard label="Best Score" value={`${profile.stats.bestScorePct}%`} />
        <StatCard
          label="Average Score"
          value={`${profile.stats.avgScorePct}%`}
        />
      </div>

      {/* Preferences */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Preferences</h3>
        <div className="divide-y">
          <PrefRow
            icon={<BellIcon className="w-5 h-5 text-amber-600" />}
            title="Push Notifications"
            desc="Get alerts for replies, exam reminders, and announcements."
            checked={profile.prefs.notifications}
            onToggle={() => togglePref("notifications")}
          />
          <PrefRow
            icon={<MoonIcon className="w-5 h-5 text-indigo-600" />}
            title="Dark Mode"
            desc="Reduce eye strain with a darker theme."
            checked={profile.prefs.darkMode}
            onToggle={() => togglePref("darkMode")}
          />
          <PrefRow
            icon={<UserCircleIcon className="w-5 h-5 text-emerald-600" />}
            title="Email Updates"
            desc="Get study tips and important updates via email."
            checked={profile.prefs.emailUpdates}
            onToggle={() => togglePref("emailUpdates")}
          />
        </div>
      </div>

      {/* Edit modal (slide-over) */}
      {editOpen && (
        <SidePanel title="Edit Profile" onClose={() => setEditOpen(false)}>
          <div className="space-y-3">
            <Input
              label="Full Name"
              value={edit.name}
              onChange={(v) => setEdit({ ...edit, name: v })}
            />
            <Input
              label="Email"
              type="email"
              value={edit.email}
              onChange={(v) => setEdit({ ...edit, email: v })}
            />
            <Input
              label="Class"
              value={edit.klass}
              onChange={(v) => setEdit({ ...edit, klass: v })}
            />
            <Input
              label="Institute"
              value={edit.institute}
              onChange={(v) => setEdit({ ...edit, institute: v })}
            />
            <Input
              label="Roll"
              value={edit.roll}
              onChange={(v) => setEdit({ ...edit, roll: v })}
            />
            <Input
              label="Avatar URL (optional)"
              value={edit.avatarUrl || ""}
              onChange={(v) => setEdit({ ...edit, avatarUrl: v })}
            />
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                className="text-sm px-3 py-2 rounded-md border hover:bg-gray-50"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </button>
              <button
                className="text-sm px-4 py-2 rounded-md bg-primary text-white hover:opacity-90"
                onClick={saveProfile}
              >
                Save
              </button>
            </div>
          </div>
        </SidePanel>
      )}

      {/* Change password (mock) */}
      {pwdOpen && (
        <SidePanel title="Change Password" onClose={() => setPwdOpen(false)}>
          <div className="space-y-3">
            <Input
              label="Current Password"
              type="password"
              value={pwd.current}
              onChange={(v) => setPwd({ ...pwd, current: v })}
            />
            <Input
              label="New Password"
              type="password"
              value={pwd.next}
              onChange={(v) => setPwd({ ...pwd, next: v })}
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={pwd.confirm}
              onChange={(v) => setPwd({ ...pwd, confirm: v })}
            />
            <p className="text-xs text-gray-500">
              (Demo only — wire to Firebase Auth later)
            </p>
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                className="text-sm px-3 py-2 rounded-md border hover:bg-gray-50"
                onClick={() => setPwdOpen(false)}
              >
                Cancel
              </button>
              <button
                className="text-sm px-4 py-2 rounded-md bg-primary text-white hover:opacity-90"
                onClick={() => {
                  if (!pwd.next || pwd.next !== pwd.confirm) {
                    alert("Passwords do not match");
                    return;
                  }
                  setPwd({ current: "", next: "", confirm: "" });
                  setPwdOpen(false);
                  alert("Password change simulated.");
                }}
              >
                Update
              </button>
            </div>
          </div>
        </SidePanel>
      )}
    </StudentLayout>
  );
}

/* ---------- small components ---------- */

function InfoRow({ label, value }) {
  return (
    <div className="p-3 rounded-lg border bg-gray-50">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900 break-words">{value}</p>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm text-center">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
}

function PrefRow({ icon, title, desc, checked, onToggle }) {
  return (
    <label className="flex items-start gap-3 py-3 cursor-pointer">
      <div className="mt-1">{icon}</div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-600">{desc}</p>
      </div>
      <input
        type="checkbox"
        className="w-5 h-5 accent-primary"
        checked={checked}
        onChange={onToggle}
      />
    </label>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <input
        type={type}
        className="w-full p-2 border rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SidePanel({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <aside className="w-full max-w-lg h-full bg-white shadow-xl border-l border-gray-200">
        <div className="h-14 px-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <button
            className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-3.5rem)]">
          {children}
        </div>
      </aside>
    </div>
  );
}
