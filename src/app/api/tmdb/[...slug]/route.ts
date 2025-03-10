import { NextRequest, NextResponse } from "next/server";
import { tmdbClient } from "@/services/tmdbClient";

const TMDB_API_BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL;

/**
 * This is proxy route to fetch data from TMDB API
 */
export async function GET(req: NextRequest) {
  const { method, url, body } = req;
  const parsedUrl = new URL(url);
  const path = parsedUrl.pathname;

  if (!TMDB_API_BASE_URL) {
    return NextResponse.json(
      { error: "Missing TMDB API Base URL" },
      { status: 500 }
    );
  }

  try {
    const response = await tmdbClient(path.replace("/api/tmdb", ""), {
      method,
      data: body,
      params: {
        ...tmdbClient.defaults.params,
        ...Object.fromEntries(parsedUrl.searchParams),
      },
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
