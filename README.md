# SM-FERDOUS-AHMMED

# Pritom Chowdhury | Professional Portfolio & Secure Admin Panel

A modern, dynamic, and responsive full-stack portfolio website engineered with **Next.js (App Router)**, **React 19**, **Node.js**, **Tailwind CSS**, **MongoDB Atlas (Mongoose)**, and **NextAuth.js**.

---

## 🚀 Key Highlights & Architecture

- **Public Facing Portfolio**:
  - **Hero Section**: Profile avatar with glowing ambient effect, dynamic *"Status: Active for Hire / Open to New Projects"* badge, resume download, and direct contact CTAs.
  - **About Me**: Professional narrative, SQA and development philosophy, and live highlight metrics.
  - **Professional Experience**: Career timeline (Klozer.io, Fabcons Techno) with responsibilities and tech stack chips.
  - **Educational Details**: Academic records (BUBT B.Sc. in CSE, Dhaka City College HSC) with results and honors.
  - **Skills Matrix**: Categorized proficiencies (SQA & Automation, Frontend, Backend & Databases, Linux & DevOps) with interactive category filters and animated proficiency bars.
  - **Projects Showcase**: Interactive gallery of automated testing frameworks and web applications with live links, GitHub repos, and detailed architecture modal previews.
  - **Next Target to Work**: Future roadmap detailing Machine Learning architectures, distributed microservices, and ISTQB CTAL milestones.
  - **Hobbies & Extra Activities**: Personal technical interests, Linux security labs, community mentorship, and blogging.
  - **Photo Gallery**: Masonry-style grid with captions and full-screen lightbox preview.
  - **Contact & Direct Message Form**: Direct contact information (Mirpur, Dhaka, Bangladesh) and functional contact form submitting directly to MongoDB.

- **Secure Admin Panel (`/admin`)**:
  - Hidden route protected by **NextAuth.js** Credentials authentication.
  - **Full CRUD Management**: Create, read, update, and delete entries for all sections (Profile, Experience, Education, Skills, Projects, Targets, Hobbies, Gallery).
  - **Media Handling**: Image URL support and client-side Base64 image uploader with preview and size validation.
  - **Direct Messages Viewer**: Dedicated admin inbox to view messages, toggle read/unread status, and delete entries.
  - **One-Click Database Seeding**: Sync or restore sample context at any time.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS v3, Lucide Icons
- **Backend**: Next.js Server Route Handlers (Node.js runtime)
- **Database**: MongoDB Atlas via Mongoose ODM
- **Authentication**: NextAuth.js (JWT session strategy, bcryptjs password hashing)
- **Deployment**: Vercel ready

---

## 📦 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/asifsarkar411/SM-FERDOUS-AHMMED.git
cd SM-FERDOUS-AHMMED
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root (see `.env.local.example`):

```env
# MongoDB Atlas Connection URI
MONGODB_URI="mongodb+srv://asifsarkar411_db_user:dTGMIdsvC88YBskz@cluster0.tcyt4cp.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0"

# NextAuth Secret & Base URL
NEXTAUTH_SECRET="your-super-secret-random-32-character-key"
NEXTAUTH_URL="http://localhost:3000"

# Default Admin Credentials
ADMIN_EMAIL="admin@pritom.dev"
ADMIN_PASSWORD="Admin@123456"
```

### 3. Seed Database with Initial Data
Run the automated seed script to populate MongoDB with Pritom Chowdhury's profile, experience, projects, and create the default admin user:

```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- Public Portfolio: `http://localhost:3000/`
- Admin Login Portal: `http://localhost:3000/admin/login`
- Admin Dashboard: `http://localhost:3000/admin`

---

## 🔐 Default Admin Credentials

- **Email**: `admin@pritom.dev`
- **Password**: `Admin@123456`

*(You can update your credentials and password directly through the environment variables or MongoDB).*

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub:
```bash
git add .
git commit -m "feat: complete portfolio website with secure admin panel"
git branch -M main
git remote add origin https://github.com/asifsarkar411/SM-FERDOUS-AHMMED.git
git push -u origin main
```

2. Import the project into **Vercel** ([vercel.com](https://vercel.com)).
3. Under **Project Settings > Environment Variables**, add:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (Set to your Vercel deployment URL, e.g. `https://your-project.vercel.app`)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
4. Click **Deploy**.
