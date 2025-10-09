# Syntonic Chat App - Backend

Node.js/Express backend for the Syntonic chat application with Socket.io for real-time messaging.

## Features

- User authentication with JWT
- Real-time messaging with Socket.io
- MongoDB database integration
- RESTful API endpoints
- CORS enabled for cross-origin requests

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   - `MONGO_URL`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `PORT`: Server port (optional, defaults to 3000)

5. Start the development server:
   ```bash
   npm run dev
   ```

## Production Deployment

1. Set environment variables on your hosting platform
2. Use `npm start` to run the production server

## API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /` - Health check

## Socket Events

- Connection handling
- Real-time message broadcasting
- User status management
