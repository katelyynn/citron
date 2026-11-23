## citron

A future, work-in-progress, music tracking service built following my work on [bleh](https://github.com/katelyynn/bleh). It is still very early in development and I have a lot of ideas on what to implement, so please stay tuned and leave feedback! The site will eventually be online in some form of alpha closed or open.

Matching listens to songs in the database is a very WIP area. There have been a lot of talks on name->name (Last.fm style) or closer to ListenBrainz-style. Both have their upsides and downsides, so it will be worked on overtime.

Follow updates in the [Discord](https://discord.gg/xU9KxGQpVw) for bleh.

---

The project is split into two separate apps, the API and the website. The API is built using Drizzle and Hono to create a database and public API that is then used by the website. The website is built with Vite and React Router for server-side rendering and also because I prefer how Vite works to Next.js. The database is probably really weirdly developed I am pretty new to this but I will get used to it overtime so don't worry (it'll be refactored i bet).

(˶˃ ᵕ ˂˶) .ᐟ.ᐟ

## requirements

### API

.env:
```.env
POSTGRES_PASSWORD=
DATABASE_URL=
JWT_SECRET=
```

Use `pnpm docker:up` and `pnpm db:migrate` to manage database nonsense, along with obviously `pnpm dev` to start the API.
