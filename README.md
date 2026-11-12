# My Recipe Manager

My MA 2 recipe app. Search for food on TheMealDB, save meals to your collection,
and edit their preparation time and notes. You can filter saved recipes by
category, delete them, and mark favorites with the star.

This version uses a local API instead of localStorage. Saved recipes are in
`db.json`. The `ma1-final` tag keeps the earlier MA 1 version.

## Run it

Use Node 22.12+ (tested with Node 24). Internet is needed for TheMealDB.

```sh
npm install
cp .env.example .env
```

Keep two terminals open in the project folder.

Terminal 1:

```sh
npm run api
```

Terminal 2:

```sh
npm run dev
```

Open the URL printed by Vite. The recipe API runs on port 3001. It uses
`json-server` version `0.17.4` with an 800 ms delay so the saving and favorite
states are visible. Keep both servers running.

```sh
npm run build
npm test
```

The build checks TypeScript before bundling the app. The tests cover data
conversion, empty search results, controlled edits, duplicate-save controls,
query keys, retrying a search, and favorite rollback.

## How the data works

TheMealDB is read-only. `meals.api.ts` converts its field names into the recipe
shape used by the components and removes empty ingredients. It returns an empty
array when a search has no matches. The saved-recipe API uses GET, POST, PATCH,
and DELETE. Components call hooks instead of making HTTP requests themselves.

## Query keys

I use `["meals", term]` for searches because each search word needs its own
cached results. Searching chicken, then corba, then chicken should show the
correct meals each time. An empty term disables the query. `["categories"]`
holds the category list and `["recipes"]` holds the saved collection, since
neither request takes a changing search value. Saving, editing, and deleting
invalidate the saved collection so it reloads from the server. The category
filter is calculated from that collection without storing a second copy.

## Favorite rollback check

The star changes before the server responds. The hook cancels a pending refetch,
keeps the previous list, and changes the matching recipe without mutating it.
If PATCH fails, the old list is restored. It invalidates the list after either
success or failure.

For this check, the PATCH URL temporarily ended in `${id}-nope`. The server
returned 404 after about 800 ms. The first screenshot shows Brown Stew Chicken
with a filled star while the request is pending:

![Star filled before the failed request returns](docs/rollback-pending.png)

After the failure, it returned to an empty star and the favorite count went
from two back to one:

![Star restored after the failed request](docs/rollback-restored.png)

The temporary URL was removed afterwards. A normal favorite update was checked
against the server and saved successfully.

## Before submitting

- The repository must be public.
- Confirm `jeffdteach` is a collaborator in the repository settings.
- Keep `.env` untracked and commit `.env.example` and `db.json`.
- Run both server commands on your computer and try a search, save, edit, star,
  and delete.
- Check the commits with `git log ma1-final..HEAD --oneline`.

The development session verified a fresh install, build, tests, and live API
operations. Its sandbox could not start the directory watcher (`EMFILE`), so
its temporary preview used the same API without watch mode. The required
`npm run api` command above still includes `--watch` and should be checked in
your normal terminal before submission.
