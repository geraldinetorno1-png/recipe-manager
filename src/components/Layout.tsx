import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.hooks";

export default function Layout({ savedCount }: { savedCount: number }) {
  const { user, isLoggedIn, logout } = useAuth();
  const [error, setError] = useState("");
  const linkClass = ({ isActive }: { isActive: boolean }) => isActive ? "nav-link active" : "nav-link";
  return (
    <div className="recipe-page min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="page-heading">
          <h1>my recipes :)</h1>
          <nav aria-label="Main navigation" className="site-nav">
            <NavLink to="/" end className={linkClass}>Search</NavLink>
            <NavLink to="/saved" className={linkClass}>Saved{isLoggedIn && savedCount > 0 ? ` (${savedCount})` : ""}</NavLink>
            {isLoggedIn ? <>
              <span className="user-name">{user}</span>
              <button className="btn btn-sm" onClick={() => {
                try { logout(); setError(""); }
                catch { setError("Could not sign out. Please allow browser storage and try again."); }
              }}>Sign out</button>
            </> : <NavLink to="/login" className={linkClass}>Sign in</NavLink>}
          </nav>
          {error && <p role="alert">{error}</p>}
        </header>
        <main className="space-y-6"><Outlet /></main>
      </div>
    </div>
  );
}
