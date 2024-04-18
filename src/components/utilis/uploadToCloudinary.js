import axios from "axios";

export async function uploadToCloudinary(image, folder) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', folder);

    const response = await axios.post('https://api.cloudinary.com/v1_1/uaofakirhat/image/upload', formData);
    return response.data.secure_url;
}