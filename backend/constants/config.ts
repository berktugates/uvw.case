export const CONFIG = {
  PORT: process.env.PORT || 3001,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: '7d',
} as const;

