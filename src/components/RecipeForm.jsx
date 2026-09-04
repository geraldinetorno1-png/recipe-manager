import { useState } from "react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert"];

export default function RecipeForm({ onAdd }) {
  // TODO: create controlled state for title, category, and time.

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: reject if title is empty (after .trim()).
    // TODO: call onAdd({ title, category, time: Number(time) || 0 }).
    // TODO: clear the form fields.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow p-4 grid grid-cols-1 md:grid-cols-4 gap-3"
    >
      {/* TODO: title input (text) — must be controlled */}
      <input
        type="text"
        placeholder="Recipe title"
        className="input input-bordered md:col-span-2"
      />

      {/* TODO: category dropdown — must be controlled. Map over CATEGORIES for the options. */}
      <select className="select select-bordered">
        <option value="">Select category</option>
      </select>

      {/* TODO: time input (number) — must be controlled */}
      <input
        type="number"
        placeholder="Time (min)"
        min="0"
        className="input input-bordered"
      />

      <button type="submit" className="btn btn-primary md:col-span-4">
        Add Recipe
      </button>
    </form>
  );
}
