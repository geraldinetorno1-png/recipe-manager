import { useState } from "react";
import { useCategories } from "@/features/meals/meals.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";
import type { SavedRecipe } from "@/features/recipes/recipes.types";
import CategoryFilter from "@/components/CategoryFilter";
import RecipeList from "@/components/RecipeList";
import SummaryBar from "@/components/SummaryBar";
import EditRecipeForm from "@/components/EditRecipeForm";

export default function SavedPage() {
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<SavedRecipe | null>(null);
  const categories = useCategories();
  const { query: savedQuery, saved, favoriteCount, update, remove, favorite, isWriting, toggleFavorite } = useSavedRecipes();
  const visible = filter === "All" ? saved : saved.filter(recipe => recipe.category === filter);
  const clearErrors = () => { update.reset(); remove.reset(); favorite.reset(); };
  return <>
        <h2 className="font-bold">Saved recipes</h2>
        <SummaryBar total={saved.length} favorites={favoriteCount} />
        {categories.isError && <p role="alert">Could not load categories. Please check your connection.</p>}
        <CategoryFilter categories={categories.data ?? []} activeFilter={filter} onFilterChange={setFilter} />
        {savedQuery.isPending && <p role="status">Loading saved recipes...</p>}
        {savedQuery.isError && <p role="alert">Could not load your saved recipes. Please check your browser storage.</p>}
        {remove.isError && <p role="alert">The recipe could not be deleted. Please try again.</p>}
        {favorite.isError && <p role="alert">The favorite could not be saved. The star was restored.</p>}
        {savedQuery.data && (
          <fieldset disabled={isWriting}>
            <RecipeList recipes={visible}
              onToggleFavorite={(recipe) => { clearErrors(); toggleFavorite(recipe); }}
              onEdit={(recipe) => { clearErrors(); setEditing(recipe); }}
              onDelete={(id) => { clearErrors(); remove.mutate(id); }}
              deletingId={remove.isPending ? (remove.variables ?? null) : null} />
          </fieldset>
        )}
        {editing && (
          <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="edit-title">
            <div className="modal-box">
              {update.isError && <p role="alert">Changes could not be saved. Your inputs are still here; please try again.</p>}
              <EditRecipeForm key={editing.id} recipe={editing}
                onSave={(patch) => update.mutate(patch, { onSuccess: () => setEditing(null) })}
                onCancel={() => setEditing(null)} isSaving={update.isPending} />
            </div>
          </div>
        )}
  </>;
}
