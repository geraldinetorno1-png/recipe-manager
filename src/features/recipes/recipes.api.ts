import { api } from "@/lib/api";
import type { SavedRecipe, NewRecipe, RecipePatch } from "./recipes.types";

// ---------------------------------------------------------------------------
// Your saved recipes, on json-server. The half we are allowed to write to.
//
// Four functions, four HTTP verbs. Note what they are NOT: they are not React.
// They know nothing about hooks or components. Arguments in, promises out.
// ---------------------------------------------------------------------------

// WORKED EXAMPLE — read.
export const getRecipes = async (): Promise<SavedRecipe[]> =>
  (await api.get<SavedRecipe[]>("/recipes")).data;

// WORKED EXAMPLE — delete.
// Study these two and TODO 4 and TODO 5 are the same shape with a different verb.
export const deleteRecipe = async (id: number): Promise<{ id: number }> => {
  await api.delete(`/recipes/${id}`);
  return { id };
};

// TODO 4 — Create.
//
//   POST /recipes  + the recipe object as the body
//
// json-server replies 201 with the saved object, and it has assigned an `id`.
// Return the server's copy, not the one you sent — note the types say so:
// you pass a NewRecipe (no id) and get back a SavedRecipe (id).
export const createRecipe = async (recipe: NewRecipe): Promise<SavedRecipe> => {
  // TODO: typed POST, return the created object
};

// TODO 5 — Update part of a recipe.
//
//   PATCH /recipes/<id>  + only the fields that changed
//
// PATCH, not PUT. PUT replaces the whole object, so a PUT missing `title`
// would wipe the title. RecipePatch is `{ id } & Partial<...>` for exactly
// this reason: the id says which row, the rest are optional.
export const updateRecipe = async ({ id, ...patch }: RecipePatch): Promise<SavedRecipe> => {
  // TODO: typed PATCH, return the updated object
};
