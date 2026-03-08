# Group 5 STL ROI Dashboard

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