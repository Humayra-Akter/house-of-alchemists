import { Navigate, Outlet } from "react-router-dom";
import { getRole, isAuthed } from "../../auth/fakeauth";

// Usage: <RequireAuth role="admin"><YourRoutes/></RequireAuth>
export default function RequireAuth({ role }) {
  const authed = isAuthed();
  const currentRole = getRole();

  if (!authed) return <Navigate to="/login" replace />;
  if (role && currentRole !== role) {
    // wrong role → send to their home
    return (
      <Navigate
        to={
          currentRole === "admin"
            ? "/admin/adminDashboard"
            : "/student/studentDashboard"
        }
        replace
      />
    );
  }
  return <Outlet />;
}
