import { NextRequest, NextResponse } from "next/server";
import { tmdbClient } from "@/services/tmdbClient";

export async function GET(req: NextRequest) {
  const { method, url, body } = req;
  const TMDB_API_BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL;
  const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

  if (!TMDB_BEARER_TOKEN) {
    return NextResponse.json(
      { error: "Missing TMDB Bearer Token" },
      { status: 500 }
    );
  }

  if (!TMDB_API_BASE_URL) {
    return NextResponse.json(
      { error: "Missing TMDB API Base URL" },
      { status: 500 }
    );
  }

  try {
    const response = await tmdbClient(url, {
      method,
      data: body,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching data from TMDB" },
      { status: 500 }
    );
  }
}
