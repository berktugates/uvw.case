export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
} as const;

