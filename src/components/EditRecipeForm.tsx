import { useState, useRef } from "react";
import type { SavedRecipe, RecipePatch } from "@/features/recipes/recipes.types";

interface EditRecipeFormProps {
  recipe: SavedRecipe;
  onSave: (patch: RecipePatch) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export default function EditRecipeForm({ recipe, onSave, onCancel, isSaving }: EditRecipeFormProps) {
  const [time, setTime] = useState(String(recipe.time ?? 0));
  const [notes, setNotes] = useState(recipe.notes ?? "");
  const original = useRef({ time: recipe.time ?? 0, notes: recipe.notes ?? "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaving) return;
    const nextTime = Number(time) || 0;
    const nextNotes = notes.trim();
    if (!Number.isFinite(nextTime) || nextTime < 0) return;
    if (nextTime === original.current.time && nextNotes === original.current.notes) {
      onCancel();
      return;
    }
    onSave({ id: recipe.id, time: nextTime, notes: nextNotes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 id="edit-title" className="font-bold text-lg">{recipe.title}</h3>
      <label className="form-control">
        <span className="label-text">Prep time (minutes)</span>
        <input type="number" min="0" className="input input-bordered" value={time}
          onChange={(e) => setTime(e.target.value)} disabled={isSaving} />
      </label>
      <label className="form-control">
        <span className="label-text">Notes</span>
        <textarea className="textarea textarea-bordered" rows={3} value={notes}
          onChange={(e) => setNotes(e.target.value)} disabled={isSaving} />
      </label>
      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={isSaving}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
