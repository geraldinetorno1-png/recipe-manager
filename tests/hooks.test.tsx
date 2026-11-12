import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";
import { useSearchMeals } from "@/features/meals/meals.hooks";
import { api, mealdb } from "@/lib/api";
const recipe = { id: 1, mealId: "1", title: "Soup", category: "Side", thumb: "", ingredients: [], time: 30, notes: "", favorite: false };
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
function setup() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  return { client, wrapper };
}
it("updates the star before PATCH settles and restores it on failure", async () => {
  vi.spyOn(api, "get").mockResolvedValue({ data: [recipe] });
  let rejectWrite: (error: Error) => void = () => {};
  vi.spyOn(api, "patch").mockImplementation(() => new Promise((_resolve, reject) => { rejectWrite = reject; }));
  const { client, wrapper } = setup();
  const { result } = renderHook(() => useSavedRecipes(), { wrapper });
  await waitFor(() => expect(result.current.saved).toHaveLength(1));
  act(() => result.current.toggleFavorite(recipe));
  await waitFor(() => expect(client.getQueryData<typeof recipe[]>(["recipes"])?.[0].favorite).toBe(true));
  act(() => rejectWrite(new Error("404")));
  await waitFor(() => expect(client.getQueryData<typeof recipe[]>(["recipes"])?.[0].favorite).toBe(false));
});
it("skips empty searches and keeps separate cached results for each term", async () => {
  const get = vi.spyOn(mealdb, "get").mockImplementation(async (_url, config) => ({ data: { meals: [{ idMeal: config?.params.s, strMeal: config?.params.s, strCategory: "Side", strMealThumb: "" }] } }));
  const { client, wrapper } = setup();
  const { result, rerender } = renderHook(({ term }) => useSearchMeals(term), { wrapper, initialProps: { term: "" } });
  expect(get).not.toHaveBeenCalled();
  rerender({ term: "chicken" });
  await waitFor(() => expect(result.current.data?.[0].title).toBe("chicken"));
  rerender({ term: "corba" });
  await waitFor(() => expect(result.current.data?.[0].title).toBe("corba"));
  rerender({ term: "chicken" });
  await waitFor(() => expect(result.current.data?.[0].title).toBe("chicken"));
  expect(client.getQueryData(["meals", "corba"])).toBeDefined();
});
