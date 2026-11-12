import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onToggleFavorite, onDelete }) {
  if (recipes.length === 0) {
    return <p className="text-center py-8" role="status">No recipes here yet. Try adding one!</p>;
  }
  return (
    <div className="recipe-list grid grid-cols-1 md:grid-cols-2 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe}
          onToggleFavorite={onToggleFavorite} onDelete={onDelete} />
      ))}
    </div>
  );
}
