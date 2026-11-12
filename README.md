https://recipe-manager-pi-eight.vercel.app

![Saved recipes on the live app](docs/ma3-live.png)

# My recipes

My MA3 recipe app. Search TheMealDB, open a recipe, and save it in this browser. The Saved page has category filters, stars, and an edit form for prep time and notes.

## Run it

Use Node 20 or newer.

```sh
npm install
cp .env.example .env
npm run dev
```

Only one terminal is needed now. There is no recipe API server.

```sh
npm test
npm run build
npm run preview
```

## Pages

- `/`: search meals and save results.
- `/login`: enter a display name.
- `/saved`: saved recipes, behind the login guard.
- `/recipe/:mealId`: a meal from TheMealDB, with its ingredients and a Save button.
- Other paths: the app's 404 page.

Recipe titles use React Router links. A shared layout contains the navigation. The pathless RequireAuth route guards Saved and remembers where the visitor was going. Redirects use replace so Back does not repeatedly enter the guard.

The login is a class demonstration, not security. It has no password or server. The display name is stored as `auth-user`. All display names in the same browser share the `saved-recipes` collection. Clearing browser data removes it, and a different browser starts empty.

## Storage change

The four async functions in recipes.api.ts now read and write localStorage. Their names and arguments stayed the same, and recipes.hooks.ts did not need to change. Each new recipe gets a string UUID. Components read the id type from SavedRecipe instead of repeating a numeric type. Bad stored rows are ignored; failed writes are shown by the existing mutation error states.

TanStack Query still manages loading and changes. Recipes use `["recipes"]`, searches use `["meals", term]`, categories use `["categories"]`, and details use `["meal", mealId]`. Changing a search term gets its own cache entry. Editing, deleting, and saving invalidate recipes. Stars update the cache first and restore it if saving fails.

## Vercel setup

Import `geraldinetorno1-png/recipe-manager`, choose Vite, and set this variable for Production and Preview:

```text
VITE_MEALDB_URL=https://www.themealdb.com/api/json/v1/1
```

The value is included in the JavaScript during the build. Changing it requires a redeploy, not a browser refresh. VITE_ variables are public, so they must not contain secrets.

The committed vercel.json serves index.html for application routes. Without it, clicking a recipe link may work but opening or refreshing that URL directly can return a host 404.

## Checks

Automated tests cover browser storage, corrupt data, failed writes, auth persistence, route redirects, autofocus, missing meals, search retries, edits and optimistic stars. The production preview was checked for saving, editing, starring and refreshing saved recipes.

The Vercel production deployment is live. Direct recipe URLs survive refresh, saving persists after refresh, signed-out Saved redirects to Login and returns after sign-in, unknown paths show the app 404, and /recipe/99999999 shows “No such recipe”. The live browser check reported no console errors or warnings. The deliberate deployment failure exercises are still pending. A missing environment variable should trigger the explicit VITE_MEALDB_URL startup error in this implementation; the handout's HTML-as-JSON example assumes that guard is absent.

The MA2 version, including its original saved data and rollback screenshot, is preserved at the `ma2-final` tag. MA3 commits start after that tag.
