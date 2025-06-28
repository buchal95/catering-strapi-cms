export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      headers: '*',
      origin: [
        'http://localhost:3000', // Development frontend
        'https://localhost:3000', // Development frontend (HTTPS)
        process.env.FRONTEND_URL, // Production frontend (Vercel)
        process.env.STRAPI_ADMIN_BACKEND_URL, // Strapi admin
      ].filter(Boolean), // Remove undefined values
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
