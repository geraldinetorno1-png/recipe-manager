# My Recipe Manager

My MA 1 recipe app. It starts with six recipes, and you can add your own,
choose a category, set the cooking time, mark favorites, or delete a recipe.

Recipes and the selected category are saved in the browser, so they stay after
refreshing. Opening the app in another browser gives you a separate list.

## Run the app

```sh
npm install
npm run dev
```

Open the address shown in the terminal.

```sh
npm run build
```

This checks that the app can build for production.

## Files

- `App.jsx` handles the recipe list, category filter, and localStorage.
- `RecipeForm` is the form for adding food.
- `RecipeCard` shows a recipe with the star and delete buttons.
- `RecipeList`, `CategoryFilter`, and `SummaryBar` display the list, filters, and counts.

Built with React, Vite, Tailwind CSS, and DaisyUI.

## Things to check

- Add a recipe and check its name, category, and time.
- Try submitting a title with only spaces. It should not be added.
- Click a star and check that the favorite count changes.
- Select a category, then refresh. The category and recipes should stay saved.
- Delete a recipe and check the count. An empty category should show a message.

## Assessment status

This is the MA 1 version using localStorage. The MA 2 API features are not
implemented yet.
