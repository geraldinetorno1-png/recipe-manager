// Data from TheMealDB.
export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  [key: string]: string | null;
}

// Data used in the app.
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
