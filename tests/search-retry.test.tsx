import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@/App";
import { mealdb } from "@/lib/api";
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
it("can retry a failed search without changing the term", async () => {
  localStorage.clear();
  window.history.replaceState({}, "", "/");
  let attempts = 0;
  vi.spyOn(mealdb, "get").mockImplementation(async (url) => {
    if (url === "/categories.php") return { data: { categories: [] } };
    attempts += 1;
    if (attempts === 1) throw new Error("offline");
    return { data: { meals: null } };
  });
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(<QueryClientProvider client={client}><App /></QueryClientProvider>);
  fireEvent.change(screen.getByLabelText("Search meals"), { target: { value: "chicken" } });
  fireEvent.click(screen.getByRole("button", { name: "Search", exact: true }));
  await screen.findByText("Could not load meals. Check your connection and try again.");
  fireEvent.click(screen.getByRole("button", { name: "Search", exact: true }));
  await waitFor(() => expect(attempts).toBe(2));
});
