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
- **Railway** (containerized deployment)
- **PostgreSQL** (managed database)
- **Redis** (managed cache/queue)
- **AWS S3** (media storage)
- **Docker** (containerization)
