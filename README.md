# Movies Site

A backend for a movie streaming/catalog platform — a 4-month backend exam project. Users can browse movies, subscribe to a plan, save favorites, leave reviews, and pick up watch history; admins manage the catalog through a dedicated admin panel.

## Tech stack

- **NestJS** + **TypeScript**
- **PostgreSQL** with **Prisma**
- **Redis** (via `ioredis`)
- **Cloudinary** for movie file storage
- **JWT** auth + role guards (User / Admin / Superadmin)
- **Swagger/OpenAPI** for interactive API docs
- Nodemailer + Handlebars for transactional/OTP emails

## Features

- **Auth**: register, OTP email verification, login
- **Movies**: browse & filter for regular users; admin/superadmin panel to create movies and upload video files via Cloudinary
- **Subscriptions**: list plans, purchase a plan
- **Favorites**: save/remove movies
- **Reviews**: leave and read reviews on a movie
- **Watch history**: track what a user has watched
- **Profile**: view/update user profile
- **Categories**: organize movies by category

## API overview

| Area | Example endpoints |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, OTP verification |
| Movies | `GET /movies`, `POST /movies/:id/watch-history` |
| Admin | `GET/POST /admin/movies` *(admin/superadmin only, multipart upload)* |
| Subscriptions | `GET /subscriptions/plans`, `POST /subscriptions/purchase` |
| Favorites | `GET/POST/DELETE /favourites` |
| Reviews | `GET/POST /reviews` |
| Categories | `GET/POST /categories` |

Full interactive docs are available via Swagger once the app is running (`/api`).

## Running locally

```bash
git clone https://github.com/SabinaNorbekova/Movies_Site.git
cd Movies_Site
npm install
cp .env.example .env   # DATABASE_URL, JWT secret, Redis URL, Cloudinary + SMTP credentials
npx prisma migrate deploy
npm run start:dev
```

## Notes

Built to practice role-based access control, file uploads, caching with Redis, and structuring a larger NestJS app into feature modules.
