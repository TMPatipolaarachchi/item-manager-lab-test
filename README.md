# MERN Item Manager Lab Test Project

This is a complete MERN Item Manager project with separate frontend and backend applications.

## Main Feature

The project includes the required new field:

- Serial Number

The Serial Number field is added to:

- Frontend Add Item form
- Backend Mongoose model
- Backend controller/API flow
- Home page item display

## Folder Structure

```text
item-manager-lab-test/
├── backend/
└── frontend/
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Add your MongoDB Atlas URL to `.env`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Run backend:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Run frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Deployment Notes

### Backend

Deploy backend on Render or Railway.

Set environment variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

### Frontend

Deploy frontend on Netlify or Vercel.

Set frontend environment variable:

```env
VITE_API_URL=https://your-backend-live-url
```

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```
