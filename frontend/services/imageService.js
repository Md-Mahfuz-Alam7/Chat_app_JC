import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../constants";

const CLOUDINARY_API_URL =  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

export const uploadFIleToClodinary = async (
    file,
    folderName
) => {
    try{
        if(!file) return {success:true, data: null};

        // already uploaded file url
        if(typeof file == 'string') return {success:true, data: file};

        if(file && file.uri){
            // ready to upload
            const formData = new FormData();
            formData.append('file', {
                uri: file?.uri,
                type: 'image/jpeg',
                name: file?.uri?.split('/').pop() || 'file.jpg',
            });

            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append("folder", folderName);

            const responese = await axios.post(CLOUDINARY_API_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                timeout: 6000
            });
            
            return {success:true, data: responese?.data?.secure_url};
        }

        return{success: true, data: null };
    }catch(error){
        console.log("got errror uploading fil:" , error);
        return {success:false, msg:error.message || "Could not upload file"}
        
    }
}
   


export const getAvatarPath = (file, isGroup = false) => {
    if(file && typeof file == 'string') return file;

    if(file && typeof file == 'object') return file.uri;

    if(isGroup) return require('../assets/defaultGroupAvatar.png');

    return require('../assets/defaultAvatar.png');
}