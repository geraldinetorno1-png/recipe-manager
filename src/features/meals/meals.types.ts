// Two shapes, because there are two shapes: what TheMealDB sends, and what our
// components use. Keeping them separate means the API's ugliness stops at the
// api layer — with the compiler enforcing the boundary.

/** Exactly what TheMealDB sends. Note the twenty numbered ingredient keys. */
export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  // strIngredient1..20 and strMeasure1..20, any of which may be "" or null.
  [key: string]: string | null;
}

/** What our components use. No `str` prefixes, ingredients already flat. */
export interface Recipe {
  mealId: string;
  title: string;
  category: string;
  thumb: string;
  ingredients: string[];
  time: number;
  notes: string;
  favorite: boolean;
}

// A miss is `{ "meals": null }` with status 200 — a success with no results.
// Typing it as nullable is what forces every caller to deal with that.
export interface SearchResponse {
  meals: Meal[] | null;
}

export interface CategoriesResponse {
  categories: { strCategory: string }[] | null;
}
