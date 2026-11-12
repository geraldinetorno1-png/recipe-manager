import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import EditRecipeForm from "@/components/EditRecipeForm";
import MealCard from "@/components/MealCard";
const recipe = { id: "saved-1", mealId: "1", title: "Soup", category: "Side", thumb: "", ingredients: [], time: 30, notes: "Less salt", favorite: false };
afterEach(cleanup);
it("does not send an unchanged edit", () => {
  const onSave = vi.fn(); const onCancel = vi.fn();
  render(<EditRecipeForm recipe={recipe} onSave={onSave} onCancel={onCancel} isSaving={false} />);
  fireEvent.click(screen.getByText("Save changes"));
  expect(onSave).not.toHaveBeenCalled(); expect(onCancel).toHaveBeenCalledOnce();
});
it("saves only id, time and trimmed notes", () => {
  const onSave = vi.fn();
  render(<EditRecipeForm recipe={recipe} onSave={onSave} onCancel={() => {}} isSaving={false} />);
  fireEvent.change(screen.getByLabelText("Prep time (minutes)"), { target: { value: "45" } });
  fireEvent.change(screen.getByLabelText("Notes"), { target: { value: "  More pepper  " } });
  fireEvent.click(screen.getByText("Save changes"));
  expect(onSave).toHaveBeenCalledWith({ id: "saved-1", time: 45, notes: "More pepper" });
});
it("prevents another save while saving or already saved", () => {
  const onSave = vi.fn();
  const view = render(<MealCard meal={recipe} onSave={onSave} isSaving={true} isSaved={false} />);
  expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(true);
  expect(screen.getByRole("button").textContent).toBe("Saving...");
  view.rerender(<MealCard meal={recipe} onSave={onSave} isSaving={false} isSaved={true} />);
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("button").textContent).toBe("Saved");
  expect(onSave).not.toHaveBeenCalled();
});
