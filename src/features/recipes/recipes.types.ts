import type { Recipe } from "@/features/meals/meals.types";

/** A recipe once json-server has stored it and assigned an id. */
export interface SavedRecipe extends Recipe {
  id: number;
}

/** What we send to create one: everything except the id, which is the server's job. */
export type NewRecipe = Recipe;

/** A PATCH body: the id says which row, the rest are only the fields that changed. */
export type RecipePatch = { id: number } & Partial<Omit<SavedRecipe, "id">>;
