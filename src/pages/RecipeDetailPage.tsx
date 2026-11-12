import { Link, useNavigate, useParams } from "react-router-dom";
import { useMeal } from "@/features/meals/meals.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";

export default function RecipeDetailPage() {
  const { mealId } = useParams<{ mealId: string }>();
  const navigate = useNavigate();
  const meal = useMeal(mealId);
  const { query, savedMealIds, create, isWriting } = useSavedRecipes();
  if (meal.isPending) return <p role="status">Loading recipe...</p>;
  if (meal.isError) return <div role="alert">
    <p>Could not reach TheMealDB. Check your connection.</p>
    <button className="btn" onClick={() => void meal.refetch()}>Try again</button>
  </div>;
  if (!meal.data) return <section className="space-y-3">
    <h2 className="text-xl font-bold">No such recipe</h2>
    <p>TheMealDB has no meal with id {mealId}.</p>
    <Link className="nav-link" to="/">Back to search</Link>
  </section>;
  const recipe = meal.data;
  const isSaved = savedMealIds.has(recipe.mealId);
  return <article className="space-y-4">
    <div className="flex gap-3 items-center">
      <button className="btn" onClick={() => navigate(-1)}>← Back</button>
      <Link className="nav-link" to="/">Back to search</Link>
    </div>
    <div className="detail-panel space-y-3">
      {recipe.thumb && <img src={recipe.thumb} alt={recipe.title} className="detail-photo" />}
      <h2 className="text-2xl font-bold">{recipe.title}</h2>
      <p>{recipe.category} · {recipe.ingredients.length} ingredients</p>
      <h3 className="font-bold">Ingredients</h3>
      <ul className="list-disc pl-5">{recipe.ingredients.map((ingredient, index) => <li key={`${index}-${ingredient}`}>{ingredient}</li>)}</ul>
      {query.isError && <p role="alert">Could not read saved recipes.</p>}
      {create.isError && <p role="alert">Could not save this recipe. Please check your browser storage.</p>}
      <button className="btn btn-primary" disabled={isSaved || isWriting || !query.isSuccess}
        onClick={() => create.mutate(recipe)}>{isSaved ? "Saved" : create.isPending ? "Saving..." : "Save"}</button>
    </div>
  </article>;
}
