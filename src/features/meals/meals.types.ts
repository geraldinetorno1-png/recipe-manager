
/** Exactly what TheMealDB sends. Note the twenty numbered ingredient keys. */
export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
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

export interface SearchResponse {
  meals: Meal[] | null;
}

export interface CategoriesResponse {
  categories: { strCategory: string }[] | null;
}
