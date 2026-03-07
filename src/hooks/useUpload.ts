import { useState } from 'react';
import { api } from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

export const useUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const uploadImage = async (file: File): Promise<string | null> => {
        setIsUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append('image', file);

        try {
            console.log('Starting image upload for file:', file.name);
            const response = await api.post(ENDPOINTS.UPLOAD.IMAGE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload response:', response.data);
            const imageUrl = response.data.url || response.data.data?.url;

            if (!imageUrl) {
                console.error('URL not found in response:', response.data);
                throw new Error('Image URL not found in server response');
            }

            setIsUploading(false);
            return imageUrl;
        } catch (err: any) {
            console.error('Image upload error:', err);
            console.error('Error response data:', err.response?.data);
            setUploadError(err.response?.data?.message || 'Image upload failed');
            setIsUploading(false);
            return null;
        }
    };

    return {
        uploadImage,
        isUploading,
        uploadError,
    };
};
