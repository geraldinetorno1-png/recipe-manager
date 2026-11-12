# MA3 deployment checks

Checked on 12 November 2026.

## 1. Missing environment variable

Temporarily changed VITE_MEALDB_URL from Production and Preview to Preview only in Vercel. This left the variable absent from the production build while preserving its value. Redeployed without build cache.

The Vercel build completed successfully. The production page was blank and the browser console reported:

```text
Error: VITE_MEALDB_URL is not set. Copy .env.example to .env.
```

Deployment: 3C2hawQHMYvzupRyKZwFsPrX6JXg.

This differs from the handout's `.map is not a function` example because this app checks the variable before sending any requests. Without that guard, a relative API request could receive the SPA's HTML instead of JSON.

Restored the variable to Production and Preview with its original value, https://www.themealdb.com/api/json/v1/1. The next production build loaded the app normally.

## 2. Missing SPA rewrite

Renamed vercel.json to vercel.json.bak in commit 9a55734 and pushed to main. Vercel deployed it successfully (FkBSGcBuYh3AfhLchoB7zEoYj62S).

Searched for pasta and clicked Mediterranean Pasta Salad. The recipe opened at /recipe/52777. Refreshing that URL returned Vercel's `404 NOT_FOUND` page. React Router handled the click inside the running app, but the server had no file at that URL when it was requested directly.

Restored vercel.json in commit 189b0e8 and pushed it to main.

## 3. Invalid recipe id

The working deployment shows “No such recipe” at /recipe/99999999. A null lookup result is different from a network failure and has its own message.

## Teacher access

The repository is public. Sent a collaborator invitation to the exact GitHub account jeffdteach with the owner's approval. GitHub shows “Awaiting jeffdteach’s response — Pending Invite”. The teacher must accept before collaborator access becomes active.

## Final restoration

After restoring the rewrite, refreshed /recipe/52777 again: the app loaded Mediterranean Pasta Salad and its ingredients. Rechecked /recipe/99999999: it showed “No such recipe”. All 21 automated tests and the production build passed. The production variable is set for both Production and Preview again.
