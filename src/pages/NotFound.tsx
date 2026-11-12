import { Link } from "react-router-dom";
export default function NotFound() {
  return <section className="space-y-3">
    <h2 className="text-3xl font-bold">404</h2>
    <p>That page does not exist.</p>
    <Link className="nav-link" to="/">Back to search</Link>
  </section>;
}
