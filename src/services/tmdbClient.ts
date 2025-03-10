import axios from "axios";

const TMDB_API_BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL;
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

export const tmdbClient = axios.create({
  baseURL: TMDB_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    "Content-Type": "application/json",
  },
});
