import { useQuery } from "@tanstack/react-query";
import { searchMeals, getCategories } from "./meals.api";
import type { Recipe } from "./meals.types";

// Lab 11's rule: components never see a fetch. Wrap each query in a hook here.
//
// Both functions below are STUBS so the app still runs before you start.
// Replace each one with a real useQuery and delete the stub return.

// TODO 6 — Search TheMealDB.
//
//   queryKey: ["meals", term]      <- the term must be IN the key, so each
//                                     search gets its own cache entry
//   queryFn:  () => searchMeals(term)
//   enabled:  term.length > 0      <- without this it fires on load with ""
//
// Return the whole query object; the page decides what to render from it.
// For the spinner, the page uses `isLoading` and NOT `isFetching` — a repeat
// search already has data, and a background refetch should not flash a spinner
// over results the user can already read.
export function useSearchMeals(term: string) {
  void term;
  void searchMeals;
  return { data: [] as Recipe[], isLoading: false, isError: false };
}

// TODO 7 — The category list. One key, no parameters.
export function useCategories() {
  void getCategories;
  return { data: [] as string[], isLoading: false, isError: false };
}

void useQuery;
