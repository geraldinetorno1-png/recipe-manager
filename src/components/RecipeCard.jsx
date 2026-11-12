export default function RecipeCard({ recipe, onToggleFavorite, onDelete }) {
  const { id, title, category, time, favorite } = recipe;
  return (
    <article className="recipe-card card bg-base-100">
      <div className="card-body">
        <div className="flex justify-between items-start gap-2">
          <h2 className="card-title break-words min-w-0">{title}</h2>
          <button type="button" className="btn btn-ghost btn-sm"
            aria-label={`Favorite ${title}`} aria-pressed={favorite}
            onClick={() => onToggleFavorite(id)}>{favorite ? "★" : "☆"}</button>
        </div>
        <div className="flex gap-2 mt-1">
          <span className="badge badge-primary">{category}</span>
          <span className="badge badge-ghost">{time} min</span>
        </div>
        <div className="card-actions mt-3">
          <button type="button" className="btn btn-error btn-sm"
            aria-label={`Delete ${title}`} onClick={() => onDelete(id)}>Delete</button>
        </div>
      </div>
    </article>
  );
}
