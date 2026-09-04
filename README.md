# Recipe Manager — Starter Template

Starter scaffold for **PD 2 Major Assessment 1 — Interactive Recipe Manager**. Vite, React 19, Tailwind CSS, and DaisyUI are all pre-installed and configured. Your job is to fill in the TODO comments across `src/App.jsx` and `src/components/`.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). You should see the "Recipe Manager" header and an info alert. Once you wire up your components, the alert can be deleted.

---

## Where to Work

| File | Your Job |
|------|----------|
| `src/App.jsx` | Own all state (`recipes`, `filter`), add all `useEffect`s, define handlers, and render the four child components. |
| `src/components/RecipeForm.jsx` | Controlled form for adding a new recipe. Empty-title guard. |
| `src/components/CategoryFilter.jsx` | 5 filter buttons (All / Breakfast / Lunch / Dinner / Dessert). |
| `src/components/RecipeList.jsx` | Maps over recipes → renders `<RecipeCard />`. Empty state. |
| `src/components/RecipeCard.jsx` | Title, category, time, ★ favorite toggle, Delete button. |
| `src/components/SummaryBar.jsx` | Two-stat display: total count and favorite count. |

Each file has TODO comments explaining what to build.

---

## TODO Order (Recommended)

Work through the TODOs in this order so you can see progress in the browser after each step.

1. **RecipeCard** — hardcode a dummy recipe first to render one card and check the styling.
2. **RecipeList** — map over the starter recipes and render six cards.
3. **App: recipes state + handleDelete** — wire delete to see state updates in action.
4. **RecipeForm** — controlled inputs + `handleAdd`.
5. **App: handleToggleFavorite** — star button works.
6. **CategoryFilter + App: filter state** — category filter works.
7. **SummaryBar** — plug in `total` and `favorites` counts.
8. **App: three `useEffect`s** — persist recipes, persist filter, sync tab title.

Once step 8 works, refresh the page — nothing should reset.

---

## What's Already Installed

- **React 19** with the Vite plugin
- **Tailwind CSS 3** — `src/index.css` already imports the three layers
- **DaisyUI 4** — configured with the `light` theme in `tailwind.config.js`

You should NOT need to install anything else for this assessment.

---

## Definition of Done

Refer to the **Requirements Checklist** in the assessment handout. Every box must be ticked before submission.

---

## Submission Reminder

1. Push to a **public** GitHub repo named `recipe-manager`.
2. Invite **`jeffdteach`** as a collaborator.
3. Aim for **at least 5 meaningful commits** across the work — not one giant "final" commit.
4. Submit the repo URL through the class submission channel.

Good luck!
