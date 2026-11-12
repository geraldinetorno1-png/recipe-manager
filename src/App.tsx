import { useState } from "react";
import { useSearchMeals, useCategories } from "@/features/meals/meals.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";
import type { SavedRecipe } from "@/features/recipes/recipes.types";
import SearchBar from "@/components/SearchBar";
import MealCard from "@/components/MealCard";
import CategoryFilter from "@/components/CategoryFilter";
import RecipeList from "@/components/RecipeList";
import SummaryBar from "@/components/SummaryBar";
import EditRecipeForm from "@/components/EditRecipeForm";

export default function App() {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<SavedRecipe | null>(null);
  const search = useSearchMeals(term);
  const categories = useCategories();
  const { query: savedQuery, saved, savedMealIds, favoriteCount, create, update,
    remove, favorite, isWriting, toggleFavorite } = useSavedRecipes();
  const results = search.data ?? [];
  const visible = filter === "All" ? saved : saved.filter((recipe) => recipe.category === filter);
  const clearErrors = () => { create.reset(); update.reset(); remove.reset(); favorite.reset(); };

  return (
    <div className="recipe-page min-h-screen py-8 px-4">
      <main className="max-w-4xl mx-auto space-y-6">
        <header className="page-heading"><h1 className="text-3xl font-bold">my recipes :)</h1></header>
        <SearchBar onSearch={setTerm} />
        <section aria-label="Search results" className="space-y-3">
          {search.isLoading && <p role="status">Searching...</p>}
          {search.isError && <p role="alert">Could not load meals. Check your connection and try again.</p>}
          {!search.isLoading && !search.isError && term && results.length === 0 &&
            <p>No meals found for “{term}”. Try another word.</p>}
          {results.length > 0 && (
            <fieldset disabled={isWriting || !savedQuery.isSuccess} className="catalogue grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {results.map((meal) => <MealCard key={meal.mealId} meal={meal}
                onSave={(recipe) => {
                  if (isWriting || savedMealIds.has(recipe.mealId)) return;
                  clearErrors(); create.mutate(recipe);
                }}
                isSaved={savedMealIds.has(meal.mealId)}
                isSaving={create.isPending && create.variables?.mealId === meal.mealId} />)}
            </fieldset>
          )}
        </section>
        <h2 className="font-bold">Saved recipes</h2>
        <SummaryBar total={saved.length} favorites={favoriteCount} />
        {categories.isError && <p role="alert">Could not load categories. Please check your connection.</p>}
        <CategoryFilter categories={categories.data ?? []} activeFilter={filter} onFilterChange={setFilter} />
        {savedQuery.isPending && <p role="status">Loading saved recipes...</p>}
        {savedQuery.isError && <p role="alert">Could not load your saved recipes. Please try again when the server is available.</p>}
        {create.isError && <p role="alert">The recipe could not be saved. Please try again.</p>}
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
      </main>
    </div>
  );
}
