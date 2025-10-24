import React from 'react';
import { GeneratedImage as GeneratedImageType, AppMode } from '../types';
import { LoadingSpinner, CompareIcon, DownloadIcon, ErrorIcon, PencilIcon, VideoIcon, CameraIcon, EmotionIcon, FullscreenIcon } from './Icons';

interface GeneratedImageProps {
    image: GeneratedImageType;
    onCompare: (imageUrl: string) => void;
    onDownload: (imageUrl: string, filename: string) => void;
    onImageTransfer: (imageUrl: string, targetMode: AppMode) => void;
    onViewFullSize: (imageUrl: string) => void;
    hideCameraAngleButton?: boolean;
    hideEmotionButton?: boolean;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ image, onCompare, onDownload, onImageTransfer, onViewFullSize, hideCameraAngleButton, hideEmotionButton }) => {

    return (
        <div className="relative aspect-square bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-700/80 shadow-lg group">
            {image.isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <LoadingSpinner />
                </div>
            )}
            {image.error && !image.isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/50 p-4 text-center">
                    <ErrorIcon />
                    <p className="mt-2 text-sm text-red-200">{image.error}</p>
                </div>
            )}
            {image.url && (
                <>
                    <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                        <h4 className="text-lg font-bold text-white mb-2 text-center">{image.name}</h4>
                        <div className="flex flex-wrap justify-center gap-2">
                            {!hideEmotionButton && (
                                <button 
                                    onClick={() => onImageTransfer(image.url!, 'emotionGenerator')}
                                    className="p-2 bg-orange-600 rounded-full hover:bg-orange-500 transition-colors"
                                    title="Générer des Émotions"
                                >
                                    <EmotionIcon />
                                </button>
                            )}
                            {!hideCameraAngleButton && (
                                 <button 
                                    onClick={() => onImageTransfer(image.url!, 'cameraAngles')}
                                    className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
                                    title="Angles de Caméra"
                                >
                                    <CameraIcon />
                                </button>
                            )}
                             <button 
                                onClick={() => onImageTransfer(image.url!, 'imageEditing')}
                                className="p-2 bg-yellow-600 rounded-full hover:bg-yellow-500 transition-colors"
                                title="Modifier l'image"
                            >
                                <PencilIcon />
                            </button>
                            <button 
                                onClick={() => onImageTransfer(image.url!, 'videoGeneration')}
                                className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors"
                                title="Générer une vidéo"
                            >
                                <VideoIcon />
                            </button>
                            <button 
                                onClick={() => onViewFullSize(image.url!)}
                                className="p-2 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors"
                                title="Voir en plein écran"
                            >
                                <FullscreenIcon />
                            </button>
                             <button 
                                onClick={() => onCompare(image.url!)}
                                className="p-2 bg-cyan-600 rounded-full hover:bg-cyan-500 transition-colors"
                                title="Comparer"
                            >
                                <CompareIcon />
                            </button>
                            <button 
                                onClick={() => onDownload(image.url!, image.name)}
                                className="p-2 bg-purple-600 rounded-full hover:bg-purple-500 transition-colors"
                                title="Télécharger"
                            >
                                <DownloadIcon />
                            </button>
                        </div>
                    </div>
                </>
            )}
            {!image.url && !image.isLoading && !image.error && (
                <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 text-sm">{image.name}</span>
                </div>
            )}
        </div>
    );
};
