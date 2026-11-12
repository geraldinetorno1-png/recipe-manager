import { useState } from "react";
import { useSearchMeals } from "@/features/meals/meals.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";
import SearchBar from "@/components/SearchBar";
import MealCard from "@/components/MealCard";

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const search = useSearchMeals(term);
  const { query: savedQuery, savedMealIds, create, isWriting } = useSavedRecipes();
  const results = search.data ?? [];
  return <>
    <SearchBar onSearch={(nextTerm) => {
      if (nextTerm === term) void search.refetch();
      else setTerm(nextTerm);
    }} />
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
              create.reset();
              create.mutate(recipe);
            }}
            isSaved={savedMealIds.has(meal.mealId)}
            isSaving={create.isPending && create.variables?.mealId === meal.mealId} />)}
        </fieldset>
      )}
    </section>
    {!term && <p>Search for a meal, then save what you like.</p>}
    {savedQuery.isError && <p role="alert">Could not read saved recipes.</p>}
    {create.isError && <p role="alert">The recipe could not be saved. Please check your browser storage.</p>}
  </>;
}
