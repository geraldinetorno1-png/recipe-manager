import { mealdb } from "@/lib/api";
import type { Meal, Recipe, SearchResponse, CategoriesResponse } from "@/features/meals/meals.types";

export function toRecipe(meal: Meal): Recipe {
  const ingredients = Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
    .filter((x): x is string => Boolean(x && x.trim()));
  return {
    mealId: meal.idMeal, title: meal.strMeal, category: meal.strCategory,
    thumb: meal.strMealThumb, ingredients, time: 0, notes: "", favorite: false,
  };
}

export async function searchMeals(query: string): Promise<Recipe[]> {
  const { data } = await mealdb.get<SearchResponse>("/search.php", { params: { s: query } });
  return (data.meals ?? []).map(toRecipe);
}

export async function getCategories(): Promise<string[]> {
  const { data } = await mealdb.get<CategoriesResponse>("/categories.php");
  return (data.categories ?? []).map((category) => category.strCategory);
}

export async function getMealById(mealId: string): Promise<Recipe | null> {
  const { data } = await mealdb.get<SearchResponse>("/lookup.php", { params: { i: mealId } });
  const [meal] = data.meals ?? [];
  return meal ? toRecipe(meal) : null;
}
