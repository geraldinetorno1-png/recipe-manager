import type { Recipe } from "@/features/meals/meals.types";

// Saved recipes have an id from the server.
export interface SavedRecipe extends Recipe {
  id: number;
}

// New recipes do not have an id yet.
export type NewRecipe = Recipe;

// Send the id and the fields being edited.
export type RecipePatch = { id: number } & Partial<Omit<SavedRecipe, "id">>;
