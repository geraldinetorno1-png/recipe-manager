import { useQuery } from "@tanstack/react-query";
import { searchMeals, getCategories, getMealById } from "@/features/meals/meals.api";

export function useSearchMeals(term: string) {
  return useQuery({
    queryKey: ["meals", term],
    queryFn: () => searchMeals(term),
    enabled: term.length > 0,
  });
}

export function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: getCategories });
}

export function useMeal(mealId: string | undefined) {
  return useQuery({
    queryKey: ["meal", mealId],
    queryFn: () => getMealById(mealId!),
    enabled: Boolean(mealId),
    staleTime: Infinity,
  });
}
