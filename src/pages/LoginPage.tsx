import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.hooks";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const { isLoggedIn, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { nameRef.current?.focus(); }, []);
  const requested = (location.state as { from?: string } | null)?.from;
  const from = requested?.startsWith("/") && !requested.startsWith("//") && requested !== "/login" ? requested : "/saved";
  if (isLoggedIn) return <Navigate to={from} replace />;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;
    try {
      login(name);
      navigate(from, { replace: true });
    } catch {
      setError("Could not remember your name. Please allow browser storage and try again.");
    }
  };
  return (
    <section className="login-panel space-y-3">
      <h2 className="text-xl font-bold">Sign in</h2>
      <p>Enter a display name to open your saved recipes.</p>
      <form onSubmit={submit} className="space-y-3">
        <label className="block" htmlFor="display-name">Display name</label>
        <input id="display-name" ref={nameRef} className="input input-sm" value={name}
          onChange={event => setName(event.target.value)} placeholder="Your name" autoComplete="nickname" required />
        <button className="btn btn-primary block" disabled={!name.trim()}>Continue</button>
      </form>
      {error && <p role="alert">{error}</p>}
      <p className="text-sm">This is a practice login, with no password. Recipes stay in this browser and are shared by display names on this browser.</p>
    </section>
  );
}
