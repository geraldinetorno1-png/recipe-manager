import RecipeCard from "@/components/RecipeCard";
import type { SavedRecipe } from "@/features/recipes/recipes.types";

interface RecipeListProps {
  recipes: SavedRecipe[];
  onToggleFavorite: (recipe: SavedRecipe) => void;
  onEdit: (recipe: SavedRecipe) => void;
  onDelete: (id: SavedRecipe["id"]) => void;
  deletingId: SavedRecipe["id"] | null;
}

export default function RecipeList({
  recipes,
  onToggleFavorite,
  onEdit,
  onDelete,
  deletingId,
}: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12 text-base-content/60">
        Nothing saved in this category yet. Search above and save a recipe.
      </div>
    );
  }

  return (
    <div className="recipe-list grid grid-cols-1 md:grid-cols-2 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === recipe.id}
        />
      ))}
    </div>
  );
}
