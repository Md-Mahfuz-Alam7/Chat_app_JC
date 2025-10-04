import { Platform } from "react-native";

export const API_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

// For physical device testing, use your computer's IP:
// export const API_URL = "http://YOUR_COMPUTER_IP:3000";