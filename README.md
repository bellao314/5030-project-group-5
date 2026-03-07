# Next.js & Prisma Postgres Auth Starter

This repository provides a boilerplate to quickly set up a Next.js demo application with authentication using [NextAuth.js v4](https://next-auth.js.org/), [Prisma Postgres](https://www.prisma.io/postgres) and [Prisma ORM](https://www.prisma.io/orm), and deploy it to Vercel. It includes an easy setup process and example routes that demonstrate basic CRUD operations against the database.

## Features

- Next.js 15 app with App Router, Server Actions & API Routes
- Data modeling, database migrations, seeding & querying
- Log in and sign up authentication flows
- CRUD operations to create, view and delete blog posts
- Pagination, filtering & relations queries

## Getting started

### 1. Install dependencies

After cloning the repo and navigating into it, install dependencies:

```
npm install
```

### 1. Create a Prisma Postgres instance

Create a Prisma Postgres instance by running the following command:

```
npx prisma init --db
```

This command is interactive and will prompt you to:

1. Log in to the [Prisma Console](https://console.prisma.io)
1. Select a **region** for your Prisma Postgres instance
1. Give a **name** to your Prisma project

Once the command has terminated, copy the **Database URL** from the terminal output. You'll need it in the next step when you configure your `.env` file.

<!-- Create a Prisma Postgres database instance using [Prisma Data Platform](https://console.prisma.io):

1. Navigate to [Prisma Data Platform](https://console.prisma.io).
2. Click **New project** to create a new project.
3. Enter a name for your project in the **Name** field.
4. Inside the **Prisma Postgres** section, click **Get started**.
5. Choose a region close to your location from the **Region** dropdown.
6. Click **Create project** to set up your database. This redirects you to the database setup page.
7. In the **Set up database access** section, copy the `DATABASE_URL`. You will use this in the next steps. -->

### 2. Set up your `.env` file

You now need to configure your database connection via an environment variable.

First, create an `.env` file:

```bash
touch .env
```

Then update the `.env` file by replacing the existing `DATABASE_URL` value with the one you previously copied. It will look similar to this:

```bash
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=PRISMA_POSTGRES_API_KEY"
```

To ensure your authentication works properly, you'll also need to set [env vars for NextAuth.js](://next-auth.js.org/configuration/optionshttps):

```bash
AUTH_SECRET="RANDOM_32_CHARACTER_STRING"
```

You can generate a random 32 character string for the `AUTH_SECRET` secret with this command:

```
npx auth secret
```

In the end, your entire `.env` file should look similar to this (but using _your own values_ for the env vars):

```bash
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMWEzMjBiYTEtYjg2Yy00ZTA5LThmZTktZDBhODA3YjQwZjBkIiwidGVuYW50X2lkIjoiY2RhYmM3ZTU1NzdmMmIxMmM0ZTI1Y2IwNWJhZmZhZmU4NjAxNzkxZThlMzhlYjI1NDgwNmIzZjI5NmU1NTkzNiIsImludGVybmFsX3NlY3JldCI6ImI3YmQzMjFhLTY2ODQtNGRiMC05ZWRiLWIyMGE2ZTQ0ZDMwMSJ9.JgKXQBatjjh7GIG3_fRHDnia6bDv8BdwvaX5F-XdBfw"

AUTH_SECRET="gTwLSXFeNWFRpUTmxlRniOfegXYw445pd0k6JqXd7Ag="
```

### 3. Migrate the database

Run the following commands to set up your database and Prisma schema:

```bash
npx prisma migrate dev --name init
```

<!--
<details>

<summary>Expand for <code>yarn</code>, <code>pnpm</code> or <code>bun</code></summary>

```bash
# Using yarn
yarn prisma migrate dev --name init

# Using pnpm
pnpm prisma migrate dev --name init

# Using bun
bun prisma migrate dev --name init
```

</details> -->

### 4. Seed the database

Add initial data to your database:

```bash
npx prisma db seed
```

<details>

<summary>Expand for <code>yarn</code>, <code>pnpm</code> or <code>bun</code></summary>

```bash
# Using yarn
yarn prisma db seed

# Using pnpm
pnpm prisma db seed

# Using bun
bun prisma db seed
```

</details>

### 5. Run the app

Start the development server:

```bash
npm run dev
```

<details>

<summary>Expand for <code>yarn</code>, <code>pnpm</code> or <code>bun</code></summary>

```bash
# Using yarn
yarn dev

# Using pnpm
pnpm run dev

# Using bun
bun run dev
```

</details>

Once the server is running, visit `http://localhost:3000` to start using the app.

## Next steps

- [Prisma ORM documentation](https://www.prisma.io/docs/orm)
- [Prisma Client API reference](https://www.prisma.io/docs/orm/prisma-client)
- [Join our Discord community](https://discord.com/invite/prisma)
- [Follow us on Twitter](https://twitter.com/prisma)

## Map View

After running the app, visit http://localhost:3000/map to see the map view of St. Louis County.

## Supabase Property Value Setup

This project now includes a separate map prototype that pulls real property values from Supabase.

### What was added

- A Vite + React map app in `app/`
- A Flask API in `api/interactive-map/geopandas_map.py`
- A Supabase table named `public.mo_property_value`
- A map click flow that looks up a ZIP code and returns:
  - city
  - county
  - property value before the tornado on `4/30/2025`
  - property value after the tornado on `5/31/2025`

### How the data flow works

1. The user clicks a ZIP code region on the map.
2. The React app sends that ZIP code to the Flask API.
3. The Flask API queries `public.mo_property_value` in Supabase.
4. The API returns the matching property values to the info card.

### 1. Install JavaScript dependencies

From the project root:

```bash
npm install
```

From the `app/` folder:

```bash
cd app
npm install
cd ..
```

### 2. Install Python dependencies for the API

From the project root:

```bash
python3 -m venv .venv
.venv/bin/pip install -r api/requirements.txt
```

### 3. Configure environment variables

Create a root `.env` file for the Flask API and Supabase connection:

```bash
DATABASE_URL="postgresql://postgres.<project-ref>:<your-password>@aws-0-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require"
```

Notes:

- Use the Supabase Session Pooler URI if your network is IPv4-only.
- Do not commit real passwords or secrets to git.

Create `app/.env` for the frontend:

```bash
VITE_MAPBOX_ACCESS_TOKEN="<your-mapbox-token>"
VITE_PROPERTY_API_URL="http://127.0.0.1:5001"
```

### 4. Run the Flask API

From the project root:

```bash
.venv/bin/python api/interactive-map/geopandas_map.py
```

The API runs at `http://127.0.0.1:5001`.

### 5. Run the map frontend

In a second terminal:

```bash
cd app
npm run dev
```

Open the local Vite URL shown in the terminal, usually:

```text
http://127.0.0.1:5173/
```

### 6. Test the integration

- Open the map app
- Click a ZIP code region in St. Louis
- Confirm the info card shows real values from Supabase instead of random values

### Troubleshooting

- If Supabase times out on school Wi-Fi, try a phone hotspot or another network.
- If the map loads but values do not, make sure the Flask API is running on port `5001`.
- If the API cannot query Supabase, double-check the `DATABASE_URL` in the root `.env`.