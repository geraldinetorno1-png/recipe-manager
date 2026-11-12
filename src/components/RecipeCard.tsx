import type { SavedRecipe } from "@/features/recipes/recipes.types";

interface RecipeCardProps {
  recipe: SavedRecipe;
  onToggleFavorite: (recipe: SavedRecipe) => void;
  onEdit: (recipe: SavedRecipe) => void;
  onDelete: (id: SavedRecipe["id"]) => void;
  isDeleting: boolean;
}

export default function RecipeCard({
  recipe,
  onToggleFavorite,
  onEdit,
  onDelete,
  isDeleting,
}: RecipeCardProps) {
  const { id, title, category, thumb, time, notes, favorite } = recipe;

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3 items-start">
            {thumb && (
              <img src={thumb} alt={title} className="w-16 h-16 rounded object-cover" />
            )}
            <div>
              <h2 className="card-title text-base">{title}</h2>
              <div className="flex gap-2 mt-1">
                <span className="badge badge-primary badge-sm">{category}</span>
                <span className="badge badge-ghost badge-sm">{time} min</span>
              </div>
            </div>
          </div>

          <button
            className="btn btn-ghost btn-sm text-2xl leading-none"
            onClick={() => onToggleFavorite(recipe)}
            aria-label={favorite ? "Unfavorite" : "Favorite"}
          >
            {favorite ? "★" : "☆"}
          </button>
        </div>

        {notes && <p className="text-sm text-base-content/70 mt-2 italic">{notes}</p>}

        <div className="card-actions justify-end mt-3">
          <button className="btn btn-sm btn-outline" onClick={() => onEdit(recipe)}>
            Edit
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => onDelete(id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
