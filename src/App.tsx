import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/features/auth/auth.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";
import Layout from "@/components/Layout";
import RequireAuth from "@/components/RequireAuth";
import SearchPage from "@/pages/SearchPage";
import SavedPage from "@/pages/SavedPage";
import LoginPage from "@/pages/LoginPage";
import RecipeDetailPage from "@/pages/RecipeDetailPage";
import NotFound from "@/pages/NotFound";

function Shell() {
  const { saved } = useSavedRecipes();
  return <Layout savedCount={saved.length} />;
}

export default function App() {
  return <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<SearchPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="recipe/:mealId" element={<RecipeDetailPage />} />
          <Route element={<RequireAuth />}>
            <Route path="saved" element={<SavedPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>;
}
