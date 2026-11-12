import { api } from "@/lib/api";
import type { SavedRecipe, NewRecipe, RecipePatch } from "@/features/recipes/recipes.types";

export const getRecipes = async (): Promise<SavedRecipe[]> =>
  (await api.get<SavedRecipe[]>("/recipes")).data;

export const deleteRecipe = async (id: number): Promise<{ id: number }> => {
  await api.delete(`/recipes/${id}`);
  return { id };
};

export const createRecipe = async (recipe: NewRecipe): Promise<SavedRecipe> =>
  (await api.post<SavedRecipe>("/recipes", recipe)).data;

export const updateRecipe = async ({ id, ...patch }: RecipePatch): Promise<SavedRecipe> =>
  (await api.patch<SavedRecipe>(`/recipes/${id}`, patch)).data;
