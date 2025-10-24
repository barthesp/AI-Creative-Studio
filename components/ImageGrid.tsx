import React from 'react';
import { GeneratedImage as GeneratedImageType, AppMode } from '../types';
import { GeneratedImage } from './GeneratedImage';
import { GlobalActions } from './GlobalActions';
import { PencilIcon, VideoIcon, FullscreenIcon } from './Icons';

interface ImageGridProps {
    originalImageUrl: string | null;
    generatedImages: GeneratedImageType[];
    onCompare: (generatedImageUrl: string) => void;
    onViewFullSize: (imageUrl: string) => void;
    onDownload: (imageUrl: string, filename: string) => void;
    onGenerateAll: () => void;
    onDownloadAll: () => void;
    onClear: () => void;
    isGeneratingAll: boolean;
    isZipping: boolean;
    onImageTransfer: (imageUrl: string, targetMode: AppMode) => void;
    hideCameraAngleButton?: boolean;
    hideEmotionButton?: boolean;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ 
    originalImageUrl, 
    generatedImages, 
    onCompare, 
    onViewFullSize,
    onDownload,
    onGenerateAll,
    onDownloadAll,
    onClear,
    isGeneratingAll,
    isZipping,
    onImageTransfer,
    hideCameraAngleButton,
    hideEmotionButton
}) => {
    
    const hasGeneratedImages = generatedImages.some(img => !!img.url);

    return (
        <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
            <GlobalActions
                onGenerateAll={onGenerateAll}
                onDownloadAll={onDownloadAll}
                onClear={onClear}
                isGeneratingAll={isGeneratingAll}
                isZipping={isZipping}
                hasGeneratedImages={hasGeneratedImages}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Original Image */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="sticky top-24 space-y-4">
                         <h3 className="text-xl font-semibold text-cyan-300 tracking-wide">Image Originale</h3>
                        <div className="relative group aspect-square bg-gray-800 rounded-xl overflow-hidden border-2 border-cyan-700/50 shadow-lg">
                            {originalImageUrl && (
                                <>
                                    <img src={originalImageUrl} alt="Original Upload" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                        <h4 className="text-lg font-bold text-white mb-2 text-center">Original</h4>
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => onViewFullSize(originalImageUrl!)}
                                                className="p-2 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors"
                                                title="Voir en plein écran"
                                            >
                                                <FullscreenIcon />
                                            </button>
                                            <button 
                                                onClick={() => onImageTransfer(originalImageUrl!, 'imageEditing')}
                                                className="p-2 bg-yellow-600 rounded-full hover:bg-yellow-500 transition-colors"
                                                title="Modifier l'image"
                                            >
                                                <PencilIcon />
                                            </button>
                                            <button 
                                                onClick={() => onImageTransfer(originalImageUrl!, 'videoGeneration')}
                                                className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors"
                                                title="Générer une vidéo"
                                            >
                                                <VideoIcon />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Generated Images */}
                <div className="lg:col-span-8 xl:col-span-9">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {generatedImages.map(image => (
                            <GeneratedImage 
                                key={image.id} 
                                image={image} 
                                onCompare={onCompare} 
                                onDownload={onDownload}
                                onImageTransfer={onImageTransfer}
                                onViewFullSize={onViewFullSize}
                                hideCameraAngleButton={hideCameraAngleButton}
                                hideEmotionButton={hideEmotionButton}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
