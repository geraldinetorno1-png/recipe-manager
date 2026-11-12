import { useState, useRef } from "react";
import type { SavedRecipe, RecipePatch } from "@/features/recipes/recipes.types";

interface EditRecipeFormProps {
  recipe: SavedRecipe;
  onSave: (patch: RecipePatch) => void;
  onCancel: () => void;
  isSaving: boolean;
}

// Edits the two fields TheMealDB cannot give you: prep time and your own notes.
export default function EditRecipeForm({
  recipe,
  onSave,
  onCancel,
  isSaving,
}: EditRecipeFormProps) {
  // TODO 10 — Controlled inputs, seeded from the recipe being edited.
  //
  // Two pieces of state, each initialised from `recipe` (Week 11):
  //   time  -> recipe.time      (keep it a string in state; Number() on submit)
  //   notes -> recipe.notes
  //
  // On submit: preventDefault, validate, then
  //   onSave({ id: recipe.id, time: Number(time) || 0, notes: notes.trim() })
  //
  // Send ONLY these fields. RecipePatch is Partial on purpose — title,
  // category and thumb are not yours to resend.
  //
  // Type the handler as React.FormEvent<HTMLFormElement>, not `any`.

  // TODO 10b — useRef, the OTHER use: a value that survives renders but never
  // triggers one.
  //
  // SearchBar above shows the DOM-handle use (`useRef<HTMLInputElement>(null)`
  // plus `ref={...}`). This is the second use from the reviewer:
  //
  //   const original = useRef({ time: recipe.time ?? 0, notes: recipe.notes ?? "" });
  //
  // It records what the recipe looked like when the modal opened. On submit,
  // if nothing actually changed, call onCancel() and skip the PATCH entirely —
  // do not spend a request saving identical values.
  //
  // Why a ref and not state: nothing renders this value, so re-rendering on it
  // would be pure waste. That is the distinction the final exam asks about.

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
      <h3 className="font-bold text-lg">{recipe.title}</h3>

      <label className="form-control">
        <span className="label-text">Prep time (minutes)</span>
        <input type="number" min="0" className="input input-bordered" />
      </label>

      <label className="form-control">
        <span className="label-text">Notes</span>
        <textarea className="textarea textarea-bordered" rows={3} />
      </label>

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
