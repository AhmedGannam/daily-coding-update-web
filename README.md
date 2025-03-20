
# MemberTrackr

A web application for tracking member reports, built with React, TypeScript, Tailwind CSS, and MongoDB.

## Features

- User authentication (login/register)
- Member management
- Report creation and editing
- Member report viewing
- Responsive design

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas cluster)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies for both frontend and backend:
   ```
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   ```

3. Create environment files:
   - Create `.env` in the root directory 
   - Create `.env` in the server directory with:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. Start the development servers:
   ```
   # Start backend server
   cd server
   npm start

   # In a separate terminal, start frontend server
   cd ..
   npm run dev
   ```


## Deployment

### Backend Deployment

1. Deploy the backend to a service like Render, Vercel, Railway, or Heroku
2. Ensure MongoDB Atlas is set up for production
3. Configure environment variables on the hosting platform

### Frontend Deployment

1. Build the frontend:
   ```
   npm run build
   ```
2. Deploy the `dist` directory to a service like Vercel, Netlify, or GitHub Pages
3. Configure the `VITE_API_URL` to point to your deployed backend API

## Project Structure

```
├── public/                 # Static assets
├── server/                 # Backend code
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   └── server.js           # Main server file
├── frontend/                    # Frontend code
│   ├── components/         # React components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API service functions
│   └── main.tsx            # Main entry point
└── package.json            # Dependencies and scripts
```

## License

[MIT License](LICENSE)
