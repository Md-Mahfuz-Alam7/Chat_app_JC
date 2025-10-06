import { Platform } from "react-native";

export const API_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";


export const CLOUDINARY_CLOUD_NAME = "dc4xcvsbo";
export const CLOUDINARY_UPLOAD_PRESET = "images";
// For physical device testing, use your computer's IP:
// export const API_URL = "http://YOUR_COMPUTER_IP:3000";