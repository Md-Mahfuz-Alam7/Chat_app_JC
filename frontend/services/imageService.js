import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../constants";

const CLOUDINARY_API_URL =  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

export const uploadFileToCloudinary = async (
    file,
    folderName
) => {
    try{
        if(!file) return {success: true, data: null};

        // already uploaded file url
        if(typeof file == 'string') return {success: true, data: file};

        if(file && file.uri){
            // Better file object construction for React Native
            let fileType = file.mimeType || 'image/jpeg';
            // If type is just "image", convert to proper MIME type
            if (file.type === 'image' || fileType === 'image') {
                fileType = 'image/jpeg';
            }

            const fileObject = {
                uri: file.uri,
                type: fileType,
                name: file.fileName || file.name || file.uri.split('/').pop() || `image_${Date.now()}.jpg`,
            };

            const formData = new FormData();
            formData.append('file', fileObject);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append("folder", folderName);

            const response = await axios.post(CLOUDINARY_API_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                timeout: 30000, // Reduced timeout for faster response
            });

            if(response?.data?.secure_url) {
                return {success: true, data: response.data.secure_url};
            } else {
                throw new Error("Invalid response from Cloudinary");
            }
        }

        return {success: true, data: null};
    }catch(error){
        console.log("Error uploading file:", error.message);

        let errorMessage = "Could not upload file";

        if(error.code === 'ECONNABORTED') {
            errorMessage = "Upload timeout. Please check your internet connection.";
        } else if(error.response?.status === 400) {
            errorMessage = "Invalid file format. Please select a valid image.";
        } else if(error.response?.status === 401) {
            errorMessage = "Upload configuration error. Please try again.";
        } else if(error.message.includes('Network Error')) {
            errorMessage = "Network error. Please check your internet connection and try again.";
        }

        return {success: false, msg: errorMessage};
    }
}
   


// Backward compatibility alias
export const uploadFIleToClodinary = uploadFileToCloudinary;

export const getAvatarPath = (file, isGroup = false) => {
    if(file && typeof file == 'string') return file;

    if(file && typeof file == 'object') return file.uri;

    if(isGroup) return require('../assets/defaultGroupAvatar.png');

    return require('../assets/defaultAvatar.png');
}