import axios from "axios";

const TMDB_API_BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const tmdbClient = axios.create({
  baseURL: TMDB_API_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});
