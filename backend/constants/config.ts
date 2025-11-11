export const CONFIG = {
  PORT: process.env.PORT || 3001,
  FRONTEND_URL: 'https://uvw-case-365l.vercel.app',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: '7d',
} as const;

