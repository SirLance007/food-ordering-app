# BrewHaven - Premium Coffee Experience (Full Stack Next.js Application)

**Project Overview**
BrewHaven is a modern, full-stack web application designed to deliver a premium digital experience for a high-end coffee brand. Built with performance and aesthetics in mind, it bridges e-commerce functionality with cinematic storytelling.

---

### 🛠️ Tech Stack & Key Tools
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS Variables
- **Animations**: Framer Motion (Page transitions, scroll reveals)
- **Authentication**: NextAuth.js (Credentials + Google OAuth)
- **Database**: PostgreSQL (hosted on Render/Supabase)
- **ORM**: Sequelize (Schema management & migrations)
- **Design System**: Custom "Dark Mode" aesthetic with Glassmorphism

---

### ✨ Key Features Implemented

#### 1. Cinematic Auth Experience
Developed a custom authentication flow with a "Pro-Level" UI that goes beyond standard templates:
- **Design**: Implemented a "Standard Professional Card" layout featuring a solid dark theme (`#121212`) with Coffee Brown accents (`#C67C4E`).
- **UX**: Features include auto-focused inputs, left-aligned icons for scannability, and smooth entry animations using Framer Motion.
- **Security**: Robust backend validation with `bcrypt` password hashing and secure session management.

#### 2. Immersive Visual Design
- **Theme**: A cohesive "Dark Luxury" aesthetic using a deep black palette and warm coffee tones.
- **Micro-interactions**: Subtle hover effects, focus rings, and loading states that enhance perceived performance.
- **Responsive**: Fully optimized for mobile devices with touch-friendly targets and adaptive layouts.

#### 3. Full-Stack Data Handling
- **API Routes**: Custom Next.js API routes handling user registration (`/api/auth/signup`) and session data.
- **Database Integration**: Seamless connection to a PostgreSQL database using Sequelize models for Users, Menu Items, and Orders.

---

### 💡 Challenges & Solutions
- **Authentication Flexibility**: Integrated both social login (Google) and traditional Credentials login seamlessly within a single UI component.
- **Design Consistency**: Iterated on the UI multiple times (moving from split layouts to a centered card) to achieve perfect visual balance and ensure the login modal sits perfectly above other page elements using advanced z-indexing strategies.

---

### 🎨 Design Philosophy
*"The goal was not just to build a functional app, but to create a digital extension of the coffee shop's physical ambiance—warm, inviting, and meticulously crafted."*

---

### 🏷️ Skills & Tags
`Next.js 15` `React` `TypeScript` `Tailwind CSS` `Framer Motion` `PostgreSQL` `Sequelize` `NextAuth.js` `Full Stack Development` `UI/UX Design` `Responsive Web Design` `Performance Optimization` `Authentication` `API Design` `Modern Web Apps`
