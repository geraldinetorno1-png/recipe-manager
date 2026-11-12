import type { Recipe } from "@/features/meals/meals.types";

// Saved recipes have an unique id.
export interface SavedRecipe extends Recipe {
  id: string;
}

// New recipes do not have an id yet.
export type NewRecipe = Recipe;

// Send the id and the fields being edited.
export type RecipePatch = { id: string } & Partial<Omit<SavedRecipe, "id">>;
