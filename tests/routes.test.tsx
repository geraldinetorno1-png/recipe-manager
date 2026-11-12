import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@/App";
import { mealdb } from "@/lib/api";
const meal = { idMeal: "52772", strMeal: "Chicken meal", strCategory: "Chicken", strMealThumb: "", strIngredient1: "Chicken" };
function open(path: string) {
  window.history.replaceState({}, "", path);
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(<QueryClientProvider client={client}><App /></QueryClientProvider>);
}
beforeEach(() => {
  localStorage.clear();
  vi.spyOn(mealdb, "get").mockImplementation(async (url, config) => ({ data: url === "/categories.php" ? { categories: [] } : { meals: config?.params?.i === "99999999" ? null : [meal] } }));
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
it("redirects saved to login, focuses the name, returns after login and ejects on logout", async () => {
  open("/saved");
  const field = await screen.findByLabelText("Display name");
  expect(window.location.pathname).toBe("/login");
  expect(document.activeElement).toBe(field);
  fireEvent.change(field, { target: { value: "  Geraldine  " } });
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  await screen.findByRole("heading", { name: "Saved recipes" });
  expect(window.location.pathname).toBe("/saved");
  expect(localStorage.getItem("auth-user")).toBe("Geraldine");
  fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
  await screen.findByLabelText("Display name");
  expect(window.location.pathname).toBe("/login");
});
it("restores login on a cold saved-page visit", async () => {
  localStorage.setItem("auth-user", "Geraldine");
  open("/saved");
  await screen.findByRole("heading", { name: "Saved recipes" });
  expect(screen.getByRole("link", { name: /^Saved/ }).getAttribute("aria-current")).toBe("page");
});
it("renders a missing recipe separately from a missing route", async () => {
  const page = open("/recipe/99999999");
  await screen.findByRole("heading", { name: "No such recipe" });
  page.unmount();
  open("/not-a-page");
  expect(screen.getByRole("heading", { name: "404" })).toBeTruthy();
});
it("loads a detail deep link and saves it into browser storage", async () => {
  open("/recipe/52772");
  await screen.findByRole("heading", { name: "Chicken meal" });
  fireEvent.click(screen.getByRole("button", { name: "Save", exact: true }));
  await waitFor(() => expect(JSON.parse(localStorage.getItem("saved-recipes") ?? "[]")).toHaveLength(1));
  await screen.findByRole("button", { name: "Saved", exact: true });
});
it("shows a network error on the detail page", async () => {
  vi.mocked(mealdb.get).mockRejectedValue(new Error("offline"));
  open("/recipe/52772");
  await screen.findByRole("alert");
  expect(screen.queryByText("No such recipe")).toBeNull();
});
