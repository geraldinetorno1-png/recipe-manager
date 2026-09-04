import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onToggleFavorite, onDelete }) {
  // TODO: if recipes.length === 0, render a friendly empty-state message
  //       (e.g., "No recipes match this filter.").

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* TODO: map over recipes and render a <RecipeCard /> for each.
          - Pass recipe, onToggleFavorite, onDelete as props.
          - Use recipe.id as the key. */}
    </div>
  );
}
