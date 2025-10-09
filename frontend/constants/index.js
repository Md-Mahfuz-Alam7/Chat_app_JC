// API URL from environment variables
export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.104:3000";

// Cloudinary configuration from environment variables
export const CLOUDINARY_CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME || "dc4xcvsbo";
export const CLOUDINARY_UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "images";