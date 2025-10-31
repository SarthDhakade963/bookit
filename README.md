# **BookIt – Travel Experience Booking Platform**

A full-stack booking platform where users can discover and book travel experiences.
Built with **Next.js**, **Express**, **PostgreSQL**, and **Prisma**.
Deployed with **CI/CD** and environment-based auto deployment.

---

## 🚀 **Tech Stack**

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Frontend   | Next.js (App Router), TailwindCSS |
| Backend    | Express.js (REST API)             |
| Database   | PostgreSQL                        |
| ORM        | Prisma                            |                |
| Deployment | Render                            |
| CI/CD      | GitHub Actions                    |

---

## 📂 **Project Structure**

```
bookit/
 ├── client/        # Next.js frontend
 └── server/        # Express backend
```

---

## ⚙️ **Environment Variables**

### **Frontend (`.env.local`)**

```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com/api
```

### **Backend (`.env`)**

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"
PORT=5000
```

---

## 📦 **Installation & Setup**

### ✅ **Clone Repo**

```bash
git clone https://github.com/yourusername/bookit.git
cd bookit
```

---

### ✅ **Install Frontend Dependencies**

```bash
cd client
npm install
npm run dev
```

---

### ✅ **Install Backend Dependencies**

```bash
cd ../server
npm install
npx prisma migrate dev
npm run dev
```

---

## 🛠️ **Scripts**

### Frontend

| Command         | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Start Next.js app    |
| `npm run build` | Build for production |

### Backend

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Run server with nodemon |
| `npm run build` | Build server            |
| `npm run lint`  | Run ESLint              |
| `npm run start` | Start production server |

---

## 🧪 **Linting**

```bash
npm run lint
```

---

## 💡 **Features**

* ✅ Display curated travel experiences
* ✅ Fetch data from Express API
* ✅ Responsive UI with TailwindCSS
* ✅ Prisma ORM with PostgreSQL
* ✅ Proper error handling (no `any`)
* ✅ Auto deployment (GitHub → Platform)

---

## 🔐 **API Endpoints (Sample)**

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | `/experiences` | Get all experiences |
| POST   | `/booking`     | Create booking      |

---

## 🌍 **Deployment**

### **Frontend:** Vercel

### **Backend + DB:** Render

Auto deploy triggered on push to `main`.

---

### 🎯 Next Steps

* Add authentication
* Add booking calendar
* Add admin dashboard
* Add Redis caching + Docker

---

