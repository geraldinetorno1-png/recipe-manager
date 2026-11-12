import type { SavedRecipe, NewRecipe, RecipePatch } from "@/features/recipes/recipes.types";

const KEY = "saved-recipes";
const read = (): SavedRecipe[] => {
  try {
    const rows: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(rows) ? rows as SavedRecipe[] : [];
  } catch {
    return [];
  }
};
const write = (rows: SavedRecipe[]) => localStorage.setItem(KEY, JSON.stringify(rows));

export const getRecipes = async (): Promise<SavedRecipe[]> => read();

export const createRecipe = async (recipe: NewRecipe): Promise<SavedRecipe> => {
  const rows = read();
  const existing = rows.find(row => row.mealId === recipe.mealId);
  if (existing) return existing;
  const row = { ...recipe, id: crypto.randomUUID() };
  write([...rows, row]);
  return row;
};

export const updateRecipe = async ({ id, ...patch }: RecipePatch): Promise<SavedRecipe> => {
  const rows = read();
  const current = rows.find(row => row.id === id);
  if (!current) throw new Error("Recipe not found.");
  const updated = { ...current, ...patch };
  write(rows.map(row => row.id === id ? updated : row));
  return updated;
};

export const deleteRecipe = async (id: SavedRecipe["id"]): Promise<{ id: SavedRecipe["id"] }> => {
  write(read().filter(row => row.id !== id));
  return { id };
};
