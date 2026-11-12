import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from "@/features/recipes/recipes.api";
const meal = { mealId: "10", title: "Soup", category: "Side", thumb: "", ingredients: ["Salt"], time: 0, notes: "", favorite: false };
beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());
it("starts empty and recovers from corrupt saved data", async () => {
  expect(await getRecipes()).toEqual([]);
  localStorage.setItem("saved-recipes", "broken JSON");
  expect(await getRecipes()).toEqual([]);
  localStorage.setItem("saved-recipes", "null");
  expect(await getRecipes()).toEqual([]);
});
it("persists recipes with stable unique string ids", async () => {
  const first = await createRecipe(meal);
  const second = await createRecipe({ ...meal, mealId: "20" });
  expect(typeof first.id).toBe("string");
  expect(first.id).not.toBe(second.id);
  expect(await getRecipes()).toEqual([first, second]);
  await deleteRecipe(first.id);
  expect(await getRecipes()).toEqual([second]);
});
it("patches only submitted fields and rejects missing recipes", async () => {
  const row = await createRecipe(meal);
  expect(await updateRecipe({ id: row.id, notes: "Less salt" })).toEqual({ ...row, notes: "Less salt" });
  await expect(updateRecipe({ id: "missing", favorite: true })).rejects.toThrow();
});
it("reports storage write failures", async () => {
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage full"); });
  await expect(createRecipe(meal)).rejects.toThrow("Storage full");
});
