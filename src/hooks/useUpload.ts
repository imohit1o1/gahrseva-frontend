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
            const response = await api.post(ENDPOINTS.UPLOAD.IMAGE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = response.data.data.url;
            setIsUploading(false);
            return imageUrl;
        } catch (err: any) {
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
