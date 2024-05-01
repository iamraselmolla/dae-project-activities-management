import ImageCompressor from 'image-compressor.js';
const compressAndUploadImage = async (file) => {
    try {
        // Create an instance of ImageCompressor
        const compressor = new ImageCompressor();

        // Compress the image
        const compressedFile = await compressor.compress(file, {
            quality: 0.5, // Adjust the quality as needed (0.6 means 60% quality)
            maxWidth: 1000, // Set max width if needed
            maxHeight: 700, // Set max height if needed
            mimeType: 'image/jpeg', // Output format
            convertSize: 200 * 1024, // Maximum output size in bytes (e.g., 200kb)
        });
        // Now, upload the compressed image to Cloudinary or perform further actions
        // Example upload function to Cloudinary (this might vary based on your setup)
        return compressedFile
    } catch (error) {
        console.error('Error compressing image:', error);
    }
};

export default compressAndUploadImage;