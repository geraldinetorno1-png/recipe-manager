import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from "@/features/recipes/recipes.api";
import type { SavedRecipe } from "@/features/recipes/recipes.types";

const KEY = ["recipes"] as const;

export function useSavedRecipes() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: KEY });
  const query = useQuery({ queryKey: KEY, queryFn: getRecipes });
  const remove = useMutation({ mutationFn: deleteRecipe, onSuccess: invalidate });
  const create = useMutation({ mutationFn: createRecipe, onSuccess: invalidate });
  const update = useMutation({ mutationFn: updateRecipe, onSuccess: invalidate });
  const favorite = useMutation({
    mutationFn: updateRecipe,
    onMutate: async ({ id, favorite }) => {
      await queryClient.cancelQueries({ queryKey: KEY });
      const previous = queryClient.getQueryData<SavedRecipe[]>(KEY);
      queryClient.setQueryData<SavedRecipe[]>(KEY, (old = []) =>
        old.map((recipe) => recipe.id === id ? { ...recipe, favorite: Boolean(favorite) } : recipe)
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(KEY, context?.previous);
    },
    onSettled: invalidate,
  });
  const saved = query.data ?? [];
  return {
    query, saved,
    savedMealIds: new Set(saved.map((recipe) => recipe.mealId)),
    favoriteCount: saved.filter((recipe) => recipe.favorite).length,
    create, update, remove, favorite,
    isWriting: create.isPending || update.isPending || remove.isPending || favorite.isPending,
    toggleFavorite: (recipe: SavedRecipe) => favorite.mutate({ id: recipe.id, favorite: !recipe.favorite }),
  };
}
