import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [term, setTerm] = useState("");

  // useRef, use 2: a handle on a DOM element. The search box is the first
  // thing anyone wants on this page, so put the cursor in it on mount.
  // Typed, so `.current` is an HTMLInputElement and `.focus()` type-checks.
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // React.FormEvent, not `any`. The compiler knows what preventDefault is.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="join w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search TheMealDB — try chicken, pasta, beef..."
        className="input input-bordered join-item w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-primary join-item">
        Search
      </button>
    </form>
  );
}
