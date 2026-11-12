import { useState } from "react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert"];

export default function RecipeForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a recipe title.");
      return;
    }
    onAdd({ title: title.trim(), category, time: Number(time) || 0 });
    setTitle("");
    setCategory("");
    setTime("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}
      className="add-form card p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
      <input type="text" aria-label="Recipe title" placeholder="Name of the food" required
        className="input input-bordered md:col-span-2" value={title}
        onChange={(e) => { setTitle(e.target.value); setError(""); }} />
      <select aria-label="Category" className="select select-bordered" required
        value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        {CATEGORIES.map((value) => <option key={value} value={value}>{value}</option>)}
      </select>
      <input type="number" aria-label="Time in minutes" placeholder="Time (min)" min="0"
        className="input input-bordered" value={time} onChange={(e) => setTime(e.target.value)} />
      {error && <p role="alert" className="text-error md:col-span-4">{error}</p>}
      <button type="submit" className="btn btn-primary md:col-span-4">Add to my list</button>
    </form>
  );
}
