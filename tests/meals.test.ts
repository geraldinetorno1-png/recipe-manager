import { afterEach, describe, expect, it, vi } from "vitest";
import { mealdb } from "@/lib/api";
import { toRecipe, searchMeals, getCategories } from "@/features/meals/meals.api";

afterEach(() => vi.restoreAllMocks());
describe("catalogue data", () => {
  it("converts the API shape and keeps only non-empty ingredients", () => {
    const result = toRecipe({ idMeal: "10", strMeal: "Soup", strCategory: "Side", strMealThumb: "soup.jpg", strIngredient1: "Lentils", strIngredient2: null, strIngredient3: "  ", strIngredient20: "Salt" });
    expect(result).toEqual({ mealId: "10", title: "Soup", category: "Side", thumb: "soup.jpg", ingredients: ["Lentils", "Salt"], time: 0, notes: "", favorite: false });
  });
  it("treats a null search result as an empty list", async () => {
    vi.spyOn(mealdb, "get").mockResolvedValue({ data: { meals: null } });
    expect(await searchMeals("zzzznotathing")).toEqual([]);
  });
  it("returns category names from the server", async () => {
    vi.spyOn(mealdb, "get").mockResolvedValue({ data: { categories: [{ strCategory: "Seafood" }] } });
    expect(await getCategories()).toEqual(["Seafood"]);
  });
});
