import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { login } from "../../auth/fakeauth";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState("");

  const goToRoleHome = (role) => {
    if (role === "admin") nav("/admin/adminDashboard");
    else nav("/student/studentDashboard");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");
    try {
      login(form);
      goToRoleHome(form.role);
    } catch (e) {
      setErr(e.message || "Login failed");
    }
  };

  return (
    <AuthLayout title="Login to your account">
      <form onSubmit={onSubmit} className="space-y-3">
        {err && <p className="text-sm text-rose-600">{err}</p>}
        <div>
          <label className="text-xs text-white">Email</label>
          <input
            className="mt-1 w-full p-2 border bg-transparent rounded"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-xs text-white">Password</label>
          <div className="mt-1 flex">
            <input
              className="w-full p-2 border bg-transparent rounded-l"
              type={showPwd ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="px-3 border border-l-0 rounded-r text-sm hover:bg-gray-50"
              onClick={() => setShowPwd((s) => !s)}
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-white mb-1 block">Role</label>
          <div className="flex gap-3">
            <label className="text-sm inline-flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="student"
                checked={form.role === "student"}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              Student
            </label>
            <label className="text-sm inline-flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              Admin
            </label>
          </div>
        </div>

        <button
          className="w-full bg-primary text-white py-2 rounded hover:opacity-90"
          type="submit"
        >
          Login
        </button>

        <p className="text-xs text-white text-center">
          No account?{" "}
          <Link className="text-sky-400 hover:underline" to="/register">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
