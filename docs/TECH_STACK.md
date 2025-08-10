# Technology Stack

## Backend
- **Django 5.2+** with Django REST Framework (DRF)
- **PostgreSQL** (SQLite for development)
- **Django Simple JWT** with custom cookie-based authentication
- **Celery** (for background AI tasks)
- **Redis** (Celery broker and caching)
- **Pillow** (image processing)
- **google-generativeai** (Gemini API integration)
- **django-cors-headers** (CORS for SPA)
- **django-storages[s3]** (AWS S3 media storage)
- **WhiteNoise** (static file serving fallback)

## Frontend
- **React 19+** with TypeScript
- **React Router v7** (SPA mode with client-side routing)
- **Vite** (build tool and dev server)
- **Tailwind CSS v4** (utility-first styling)
- **Custom AuthContext** (centralized auth state management)
- **Protected Routes** (authentication guards)
- **Cookie-based JWT** (secure token storage)

## Development Tools
- **TypeScript 5.8+** (type safety)
- **ESLint & Prettier** (code quality)
- **npm** (package management)
- **Git** (version control)

## Hosting & Deployment

### Current Options
- **Railway** (containerized deployment with PostgreSQL + Redis)
- **AWS S3** (media storage)
- **Docker** (containerization)

### Frontend Deployment Alternatives
- **Vercel** (automatic deployments, edge functions, analytics)
- **Netlify** (JAMstack optimization, form handling, A/B testing)
- **Railway Frontend Service** (separate container for React app)

### Future Scaling Considerations
- **CDN:** Cloudflare or AWS CloudFront for global performance
- **Database:** PostgreSQL read replicas, connection pooling
- **Caching:** Redis caching layer, browser caching strategies
- **Monitoring:** Sentry error tracking, performance monitoring
- **CI/CD:** GitHub Actions, automatic testing and deployment

### Migration Paths
- **Database:** SQLite → PostgreSQL → Multi-region PostgreSQL
- **Deployment:** Monolithic → Separated services → Microservices
- **Frontend:** SPA → PWA → React Native mobile app
- **AI Processing:** Embedded → Dedicated service → GPU-optimized instances
