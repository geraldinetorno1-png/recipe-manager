import { useEffect, useState } from "react";
import RecipeForm from "./components/RecipeForm";
import CategoryFilter from "./components/CategoryFilter";
import RecipeList from "./components/RecipeList";
import SummaryBar from "./components/SummaryBar";

const STARTER_RECIPES = [
  { id: 1, title: "Chicken Adobo", category: "Dinner", time: 45, favorite: false },
  { id: 2, title: "Beef Tapa", category: "Breakfast", time: 20, favorite: false },
  { id: 3, title: "Pancit Canton", category: "Lunch", time: 25, favorite: false },
  { id: 4, title: "Leche Flan", category: "Dessert", time: 60, favorite: false },
  { id: 5, title: "Tocino Silog", category: "Breakfast", time: 15, favorite: false },
  { id: 6, title: "Kare-Kare", category: "Dinner", time: 90, favorite: false },
];

export default function App() {
  // Read saved data once, when the component first mounts.
  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("recipe"));
      return Array.isArray(saved) ? saved : STARTER_RECIPES;
    } catch {
      return STARTER_RECIPES;
    }
  });
  const [filter, setFilter] = useState(() => {
    const saved = localStorage.getItem("filter");
    return ["All", "Breakfast", "Lunch", "Dinner", "Dessert"].includes(saved)
      ? saved : "All";
  });

  useEffect(() => {
    localStorage.setItem("recipe", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  const favorites = recipes.filter((recipe) => recipe.favorite).length;
  useEffect(() => {
    document.title = `Recipes · ${favorites} ★`;
  }, [favorites]);

  const handleAdd = (recipe) => {
    setRecipes((current) => [
      ...current,
      { ...recipe, id: Math.max(Date.now(), ...current.map((r) => r.id + 1)), favorite: false },
    ]);
  };
  const handleToggleFavorite = (id) => {
    setRecipes((current) => current.map((recipe) =>
      recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
    ));
  };
  const handleDelete = (id) => {
    setRecipes((current) => current.filter((recipe) => recipe.id !== id));
  };

  // This list follows the current state; it does not need separate state.
  const visibleRecipes = filter === "All"
    ? recipes : recipes.filter((recipe) => recipe.category === filter);

  return (
    <div className="recipe-page min-h-screen py-8 px-4">
      <main className="max-w-4xl mx-auto space-y-6">
        <header className="page-heading">
          <h1 className="text-3xl font-bold">my recipes :)</h1>
        </header>
        <RecipeForm onAdd={handleAdd} />
        <SummaryBar total={recipes.length} favorites={favorites} />
        <CategoryFilter activeFilter={filter} onFilterChange={setFilter} />
        <p className="list-note">the food list</p>
        <RecipeList recipes={visibleRecipes} onToggleFavorite={handleToggleFavorite} onDelete={handleDelete} />
      </main>
    </div>
  );
}
