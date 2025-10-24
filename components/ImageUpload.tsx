
import React, { useCallback } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploadProps {
    onImageUpload: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
    const onDrop = useCallback((acceptedFiles: FileList) => {
        if (acceptedFiles && acceptedFiles[0]) {
            onImageUpload(acceptedFiles[0]);
        }
    }, [onImageUpload]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            onDrop(event.target.files);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if(event.dataTransfer.files) {
            onDrop(event.dataTransfer.files);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            <label 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-800/50 hover:bg-gray-800/80 transition-colors"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon />
                    <p className="mb-2 text-lg text-gray-400"><span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez</p>
                    <p className="text-sm text-gray-500">PNG, JPG, WEBP (max. 10MB)</p>
                </div>
                <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange} 
                />
            </label>
        </div>
    );
};
