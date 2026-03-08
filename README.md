# GharSeva 🏠

> A local home services booking platform built for the **Cohort 26 Buildathon** — a hackathon organized by [Hitesh Sir](https://github.com/hiteshchoudhary) and [Piyush Sir](https://github.com/piyushgarg-dev), with TAs Akash Kadlag and Anirudh Sir mentoring along the way.

**Problem Statement #1 — Local Services Booking Platform**

GharSeva connects customers with verified local service professionals and manages the complete job lifecycle — from booking to completion — with a clean, role-based workflow for customers, service providers, and admins.

This is a **solo project**. Every line of code, design decision, and bug was handled by one person.

---

## 🚀 Live Demo

> **Deployment link:** _Coming soon / add your hosted link here_

---

## 📸 What it looks like

The landing page has a hero section, service categories, featured providers, how it works section, testimonials, FAQ, and a final CTA — pretty much the whole thing.

---

## ✨ Features Implemented

### 👤 Customer Side
- Browse services by category (Plumbing, Cleaning, Electrical, Carpentry, Painting, Appliance Repair, Pest Control, Gardening)
- Filter service providers by city, area, or category
- View service provider profile — ratings, experience, location, analytics (total jobs, completion rate, avg rating)
- Book a service with address, date/time, and optional image upload
- Transparent pricing shown before confirmation (base price + convenience fee)
- Simulated payment flow (for demo purposes)
- Track booking status in real-time:  
  `Requested → Accepted → Confirmed → In Progress → Completed / Cancelled`
- Reschedule or cancel existing bookings
- Submit rating and review after job completion
- Paginated booking history with status filters

### 🔧 Service Provider Side
- Register as a service provider with a dedicated registration flow
- Profile management (area, city, pincode, base price, description, experience)
- Toggle availability status
- View all incoming booking requests in a table with pagination
- Accept or reject bookings
- Update job status (start job, mark complete)
- Upload before/after images for completed jobs
- Add work notes and cancel reason
- Dashboard with stats — total bookings, revenue, completion rate, recent activity
- Protected routes — pending approval state handled with UI alert

### 🛡️ Admin Side
- Dashboard with platform-wide analytics (overview, booking stats, revenue, user/provider metrics)
- Manage service categories (CRUD)
- Approve or reject service provider registrations
- View and manage all users
- View all bookings across the platform
- Moderate reviews (hide/show/delete)
- Protected admin routes with role-based redirects

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| **Frontend** | React 19, TypeScript, Vite |
| **Routing** | TanStack Router v1 |
| **State Management** | Zustand (auth store with persistence) |
| **Server State** | TanStack Query v5 |
| **HTTP Client** | Axios (with request/response interceptors for auth + token refresh) |
| **Forms** | React Hook Form + Zod |
| **UI Components** | shadcn/ui, Radix UI |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Lucide React |
| **Notifications** | Sonner |
| **Image Carousel** | Embla Carousel |
| **Theme** | next-themes (dark/light mode support) |
| **Backend** | Node.js, Express, MongoDB (separate repo) |
| **Image Upload** | Cloudinary |

---

## 📁 Project Structure

```
src/
├── api/              # Axios instance, interceptors, all endpoint constants
├── assets/           # Images, logos, category/hero illustrations
├── components/
│   ├── admin/        # Admin dashboard, tables, analytics charts
│   ├── auth/         # Login/register dialogs
│   ├── customer/     # Booking list, pagination, status filters
│   ├── landing/      # Hero, categories, how-it-works, testimonials, FAQ, CTA
│   ├── layout/       # Navbar, footer, sidebar, shared layout pieces
│   ├── providers/    # Service provider dashboard, bookings table, stats
│   ├── service-provider/ # Booking actions panel, progress stepper
│   └── ui/           # All shadcn UI primitives
├── hooks/
│   ├── admin/        # Admin-specific data hooks
│   ├── service-provider/ # Provider bookings + status mutations
│   ├── useAuth.ts    # Login, register, logout logic
│   ├── useBookings.ts
│   ├── useCategories.ts
│   ├── useProviders.ts
│   └── useUpload.ts
├── pages/
│   ├── admin/        # AdminDashboard, Users, Providers, Categories, Bookings, Reviews
│   ├── service-provider/ # Dashboard, Bookings, BookingDetail
│   ├── Home.tsx
│   ├── Bookings.tsx
│   ├── ServiceProviders.tsx
│   └── ServiceProviderDetails.tsx
├── router/           # Route definitions with role-based guards and redirects
├── schemas/          # Zod schemas for form validation
├── store/            # Zustand auth store
└── types/            # TypeScript interfaces for all entities
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- A running backend instance (MERN backend, separate repo)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/gahrseva-frontend.git
cd gahrseva-frontend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Replace with your deployed backend URL when going to production.

### 4. Start the dev server

```bash
pnpm run dev
```

App will be running at `http://localhost:5173`

### 5. Build for production

```bash
pnpm run build
```

---

## 🔑 Demo Credentials

> You can use these to test different roles:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@gharseva.com` | `admin123` |
| Service Provider | `provider@gharseva.com` | `provider123` |
| Customer | `customer@gharseva.com` | `customer123` |

_(Update these with your actual seeded credentials)_

---

## 🔄 Booking Status Flow

```
Requested
   ↓
Accepted  ←→  Rejected
   ↓
In Progress
   ↓
Completed  ←→  Cancelled
```

Every transition is handled on the service provider's end. Customers can cancel from their side as long as the job hasn't started.

---

## 🤔 Known Limitations / Things I'd Do Differently

- Payment is simulated (no real payment gateway integrated, would use Razorpay in a real version)
- Notifications are toast-only, no real-time updates (WebSocket/SSE would make this way better)
- Some pages are still in progress (contact, about)
- Image upload works via Cloudinary, but the UX for before/after images could be smoother

---

## 🙏 Acknowledgements

Big thanks to **Hitesh Sir** and **Piyush Sir** for organizing the Cohort 26 Buildathon and pushing us to actually ship something. Also to **Akash Kadlag** and **Anirudh Sir** for helping throughout the cohort.

---

## 📄 License

MIT — do whatever you want with it.
