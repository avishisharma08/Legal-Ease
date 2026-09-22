/**
 * Centralized API Base URL Configuration for LegalEase IND
 * Automatically uses VITE_API_URL in production (e.g. on Vercel)
 * and falls back to local development backend on http://localhost:8000.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');
