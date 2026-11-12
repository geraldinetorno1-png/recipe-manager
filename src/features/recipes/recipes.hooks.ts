import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from "./recipes.api";
import type { SavedRecipe } from "./recipes.types";

const KEY = ["recipes"] as const;

export function useSavedRecipes() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: KEY });

  // =========================================================================
  // WORKED EXAMPLE — one read and one write, end to end.
  //
  // Everything below repeats this same shape. Read these ten lines until they
  // are boring, then go and copy them.
  // =========================================================================

  // Read: the saved recipes from json-server.
  const query = useQuery({ queryKey: KEY, queryFn: getRecipes });

  // Write: delete one. We do not edit the cache by hand — we mark it stale and
  // let TanStack Query refetch. The server stays the source of truth.
  const remove = useMutation({ mutationFn: deleteRecipe, onSuccess: invalidate });

  // =========================================================================
  // YOUR WORK STARTS HERE
  // =========================================================================

  // TODO 8 — Save a catalogue result.
  // Same shape as `remove` above: mutationFn, then invalidate on success.
  const create = useMutation({ mutationFn: createRecipe, onSuccess: invalidate });

  // TODO 11 — Save an edit (time + notes). Same shape again.
  const update = useMutation({ mutationFn: updateRecipe, onSuccess: invalidate });

  // TODO 12 — The favourite toggle, OPTIMISTICALLY.
  //
  // This is the one mutation that must NOT wait for the server. A star that
  // takes 800ms to fill feels broken, so we update the cache first and roll
  // back if the request fails. Four parts:
  //
  //   mutationFn: updateRecipe
  //
  //   onMutate: async ({ id, favorite }) => {
  //     - await queryClient.cancelQueries({ queryKey: KEY })
  //       (an in-flight refetch would land after your edit and undo it)
  //     - const previous = queryClient.getQueryData<SavedRecipe[]>(KEY)
  //     - queryClient.setQueryData<SavedRecipe[]>(KEY, (old = []) => ...)
  //       flip `favorite` on the matching id, immutably — map, spread, no mutation
  //     - return { previous }        <- this becomes `context` below
  //   }
  //
  //   onError: (_e, _v, context) => queryClient.setQueryData(KEY, context?.previous)
  //
  //   onSettled: invalidate
  //     runs on success AND failure, so the cache always ends up agreeing
  //     with the server
  //
  // To prove the rollback works, see "How to prove your rollback works" in the
  // handout. Do NOT just stop json-server — the list unmounts and you will see
  // nothing.
  const favorite = useMutation({ mutationFn: updateRecipe, onSettled: invalidate });

  const saved = query.data ?? [];

  return {
    query,
    saved,
    savedMealIds: new Set(saved.map((r) => r.mealId)),
    favoriteCount: saved.filter((r) => r.favorite).length,
    create,
    update,
    remove,
    // TODO 12b — compute the NEW value here. Do not hand `favorite.mutate`
    // straight to RecipeCard: it passes the whole recipe, so the PATCH body
    // would carry every field AND `favorite` would still hold its old value,
    // so the star would never toggle.
    toggleFavorite: (recipe: SavedRecipe) =>
      favorite.mutate({ id: recipe.id, favorite: !recipe.favorite }),
  };
}
