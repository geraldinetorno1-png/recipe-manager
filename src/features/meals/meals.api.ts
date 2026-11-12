import { mealdb } from "@/lib/api";
import type { Meal, Recipe, SearchResponse, CategoriesResponse } from "./meals.types";

// ---------------------------------------------------------------------------
// TheMealDB. Read-only. Everything here returns OUR shape, never TheMealDB's.
//
// This file is the edge. TheMealDB's ugliness (idMeal, strMeal, strCategory,
// strIngredient1 ... strIngredient20) stops here and never reaches a component.
// The types in meals.types.ts are already written for you — read them first.
// ---------------------------------------------------------------------------

// TODO 1 — Normalise one Meal into our Recipe shape.
//
// Rules (and the compiler will hold you to the Recipe type):
//   mealId      <- idMeal      keep it: you need it to avoid saving duplicates
//   title       <- strMeal
//   category    <- strCategory
//   thumb       <- strMealThumb
//   ingredients <- the strIngredient1..20 values that are not empty or null.
//                  Twenty numbered keys is not a shape any component should
//                  have to loop over. A type predicate keeps it string[]:
//                    .filter((x): x is string => Boolean(x && x.trim()))
//   time        <- 0     TheMealDB has no prep time. The user supplies it.
//   notes       <- ""    TheMealDB has no notes either.
//   favorite    <- false Not saved yet, so it cannot be a favourite yet.
//
// Do NOT give this an `id`. `id` belongs to json-server and is assigned on POST,
// which is exactly why Recipe has no id and SavedRecipe does.
export function toRecipe(meal: Meal): Recipe {
  // TODO: return our shape
}

// TODO 2 — Search the catalogue.
//
//   GET /search.php?s=<query>
//
// Use the typed call so the nullability is explicit:
//   await mealdb.get<SearchResponse>("/search.php", { params: { s: query } })
//
// Two traps:
//   1. A miss returns status 200 with { "meals": null }. That is a SUCCESS
//      WITH NO RESULTS, not an error. isError stays false. Normalise null to
//      [] here with `?? []` — SearchResponse types it as `Meal[] | null`
//      precisely so you cannot forget.
//   2. Return mapped Recipes, not raw Meals.
//
// Verify with curl before you write any React:
//   curl "https://www.themealdb.com/api/json/v1/1/search.php?s=zzzznotathing"
export async function searchMeals(query: string): Promise<Recipe[]> {
  // TODO: typed GET, normalise null -> [], map through toRecipe
}

// TODO 3 — The real category list.
//
//   GET /categories.php  ->  { categories: [ { strCategory: "Beef" }, ... ] }
//
// In MA 1 your CategoryFilter had five hardcoded strings. TheMealDB has its own
// categories and they are not your five. Return string[] so CategoryFilter can
// keep rendering buttons without knowing where they came from.
export async function getCategories(): Promise<string[]> {
  // TODO: typed GET, normalise null -> [], return string[]
}
