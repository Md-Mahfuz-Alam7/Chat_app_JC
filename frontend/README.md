# Syntonic Chat App - Frontend

React Native mobile application built with Expo for real-time chat functionality.

## Features

- Real-time messaging
- User authentication
- Image sharing with Cloudinary
- Group conversations
- Profile management
- Modern UI with custom themes

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

4. Update the `.env` file:
   - `EXPO_PUBLIC_API_URL`: Your backend API URL

5. Start the development server:
   ```bash
   npx expo start
   ```

## Building for Production

1. Update `.env` with production backend URL
2. Build APK:
   ```bash
   npx eas build --platform android --profile production
   ```

## Tech Stack

- React Native with Expo
- Expo Router for navigation
- Socket.io client for real-time communication
- Expo Image Picker for media handling
- AsyncStorage for local data
- Ionicons for UI icons

## Environment Variables

- `EXPO_PUBLIC_API_URL`: Backend API endpoint
