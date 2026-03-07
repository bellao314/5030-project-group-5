from pathlib import Path
import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
import psycopg
from psycopg.rows import dict_row


ROOT_DIR = Path(__file__).resolve().parents[2]
load_dotenv(ROOT_DIR / ".env")

app = Flask(__name__)
CORS(app)

BEFORE_COLUMN = '"4/30/2025"'
AFTER_COLUMN = '"5/31/2025"'


def get_database_url() -> str:
    database_url = os.getenv("SUPABASE_DATABASE_URL") or os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL or SUPABASE_DATABASE_URL must be set.")
    return database_url


def fetch_property_values(zip_code: int):
    query = f"""
        SELECT
            "RegionName" AS zip_code,
            "City" AS city,
            "CountyName" AS county_name,
            {BEFORE_COLUMN} AS before_value,
            {AFTER_COLUMN} AS after_value
        FROM public.mo_property_value
        WHERE "RegionName" = %s
        LIMIT 1
    """

    with psycopg.connect(get_database_url(), row_factory=dict_row) as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, (zip_code,))
            return cursor.fetchone()


@app.get("/health")
def health_check():
    return jsonify({"status": "ok"})


@app.get("/property-value/<zip_code>")
def property_value(zip_code: str):
    if not zip_code.isdigit():
        return jsonify({"error": "ZIP code must be numeric."}), 400

    try:
        row = fetch_property_values(int(zip_code))
    except Exception as exc:
        return jsonify({"error": "Failed to query property values.", "details": str(exc)}), 500

    if not row:
        return jsonify({"error": "No property data found for ZIP code.", "zipCode": zip_code}), 404

    return jsonify(
        {
            "zipCode": str(row["zip_code"]),
            "city": row.get("city"),
            "countyName": row.get("county_name"),
            "beforeValue": row.get("before_value"),
            "afterValue": row.get("after_value"),
            "beforeLabel": "4/30/2025",
            "afterLabel": "5/31/2025",
        }
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
