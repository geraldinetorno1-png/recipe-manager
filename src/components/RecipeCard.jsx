export default function RecipeCard({ recipe, onToggleFavorite, onDelete }) {
  // TODO: destructure id, title, category, time, favorite from recipe.

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          {/* TODO: show the recipe title as an <h2 className="card-title"> */}

          {/* TODO: favorite toggle button.
              - Shows ★ when favorite is true, ☆ when false.
              - onClick calls onToggleFavorite(id). */}
        </div>

        <div className="flex gap-2 mt-1">
          {/* TODO: category badge (badge badge-primary) */}
          {/* TODO: time badge (badge badge-ghost) — e.g., "45 min" */}
        </div>

        <div className="card-actions justify-end mt-3">
          {/* TODO: Delete button (btn btn-error btn-sm) that calls onDelete(id) */}
        </div>
      </div>
    </div>
  );
}
