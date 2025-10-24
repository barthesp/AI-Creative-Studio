import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { IMAGE_ASPECT_RATIOS, ImageAspectRatio, AppMode } from '../types';
import { LoadingSpinner, CloseIcon, CameraIcon, PencilIcon, VideoIcon, DownloadIcon, EmotionIcon, FullscreenIcon, UploadIcon } from '../components/Icons';
import { ApiKeyPrompt } from '../components/ApiKeyPrompt';
import { ImageUpload } from '../components/ImageUpload';
import { FullScreenModal } from '../components/FullScreenModal';
import { fileToBase64, getMimeType, dataUrlToFile, downloadImage } from '../utils/fileUtils';

interface ImageGeneratorProps {
    initialImageUrl?: string | null;
    onClearInitialImage?: () => void;
    onImageTransfer: (imageUrl: string, targetMode: AppMode) => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ initialImageUrl, onClearInitialImage, onImageTransfer }) => {
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState<ImageAspectRatio>('1:1');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [sourceImageFiles, setSourceImageFiles] = useState<(File | null)[]>(Array(3).fill(null));
    const [sourceImageUrls, setSourceImageUrls] = useState<(string | null)[]>(Array(3).fill(null));

    const [apiKeySelected, setApiKeySelected] = useState(false);
    const [apiKeyError, setApiKeyError] = useState<string | null>(null);
    const [fullScreenModalState, setFullScreenModalState] = useState<{ isOpen: boolean; imageUrl: string | null }>({
        isOpen: false,
        imageUrl: null
    });
    
    const hasSourceImages = sourceImageUrls.some(url => url !== null);

    useEffect(() => {
        const checkKey = async () => {
            if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
                setApiKeySelected(true);
            }
        };
        checkKey();
    }, []);

    const handleImageUpload = useCallback((file: File, index: number) => {
        setSourceImageFiles(prev => {
            const newFiles = [...prev];
            newFiles[index] = file;
            return newFiles;
        });
        setSourceImageUrls(prev => {
            const newUrls = [...prev];
            if (newUrls[index]) {
                URL.revokeObjectURL(newUrls[index]!);
            }
            newUrls[index] = URL.createObjectURL(file);
            return newUrls;
        });
        setGeneratedImage(null);
        setError(null);
    }, []);

    useEffect(() => {
        const processInitialImage = async () => {
            if (initialImageUrl) {
                const file = await dataUrlToFile(initialImageUrl, 'transfered-image.png');
                handleImageUpload(file, 0);
                onClearInitialImage?.();
            }
        };
        processInitialImage();
    }, [initialImageUrl, onClearInitialImage, handleImageUpload]);


    const handleSelectKey = async () => {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            setApiKeySelected(true);
            setApiKeyError(null);
        }
    };

    const handleApiError = (e: any) => {
        console.error(e);
        if (e.message?.includes("API key not valid") || e.message?.includes("Requested entity was not found")) {
            const keyError = "La clé API n'est plus valide ou est incorrecte. Veuillez en sélectionner une nouvelle.";
            setApiKeyError(keyError);
            setApiKeySelected(false);
            setError(keyError);
            return;
        }
        setError(e.message || 'Échec de la génération de l\'image.');
    };

     const handleClearImage = (index: number) => {
        setSourceImageFiles(prev => {
            const newFiles = [...prev];
            newFiles[index] = null;
            return newFiles;
        });
        setSourceImageUrls(prev => {
            const newUrls = [...prev];
            if (newUrls[index]) {
                URL.revokeObjectURL(newUrls[index]!);
            }
            newUrls[index] = null;
            return newUrls;
        });
    };

    const openFullScreenModal = (imageUrl: string) => {
        setFullScreenModalState({ isOpen: true, imageUrl });
    };

    const closeFullScreenModal = () => {
        setFullScreenModalState({ isOpen: false, imageUrl: null });
    };

    const handleGenerate = async () => {
        if (!prompt) {
            setError('Veuillez entrer une description.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const activeSourceFiles = sourceImageFiles.filter((f): f is File => f !== null);

            if (activeSourceFiles.length > 0) {
                // Image-to-Image with Gemini Flash Image
                const parts: any[] = [];
                const fullPrompt = `${prompt}. Veuillez générer l'image avec un rapport d'aspect de ${aspectRatio}.`;
                parts.push({ text: fullPrompt });

                for (const file of activeSourceFiles) {
                    const base64Data = await fileToBase64(file);
                    const mimeType = getMimeType(file);
                    parts.push({
                       inlineData: { data: base64Data, mimeType },
                    });
                }
                
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-image',
                    contents: { parts: parts },
                    config: {
                        responseModalities: [Modality.IMAGE],
                    },
                });

                const firstPart = response.candidates?.[0]?.content?.parts?.[0];
                if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
                    const generatedBase64 = firstPart.inlineData.data;
                    const generatedMimeType = firstPart.inlineData.mimeType;
                    setGeneratedImage(`data:${generatedMimeType};base64,${generatedBase64}`);
                } else {
                    throw new Error("Aucune donnée d'image modifiée n'a été reçue de l'API.");
                }
            } else {
                // Text-to-Image with Imagen
                const response = await ai.models.generateImages({
                    model: 'imagen-4.0-generate-001',
                    prompt: prompt,
                    config: {
                        numberOfImages: 1,
                        outputMimeType: 'image/jpeg',
                        aspectRatio: aspectRatio,
                    },
                });

                if (response.generatedImages && response.generatedImages.length > 0) {
                    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
                    const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
                    setGeneratedImage(imageUrl);
                } else {
                    throw new Error('Aucune image n\'a été générée.');
                }
            }
        } catch (e: any) {
            handleApiError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const renderImageSlot = (index: number) => {
        const imageUrl = sourceImageUrls[index];
        const isMain = index === 0;

        return (
             <div className={`relative group aspect-square bg-gray-800/80 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-600 hover:border-cyan-500 transition-colors`}>
                {imageUrl ? (
                    <>
                        <img src={imageUrl} alt={`Source ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => openFullScreenModal(imageUrl)} className="p-1.5 bg-black/60 rounded-full text-white hover:bg-black/80" aria-label="Voir en plein écran">
                                <FullscreenIcon />
                            </button>
                            <button onClick={() => handleClearImage(index)} className="p-1.5 bg-black/60 rounded-full text-white hover:bg-black/80" aria-label={`Retirer l'image ${index + 1}`}>
                                <CloseIcon />
                            </button>
                        </div>
                    </>
                ) : (
                    <label htmlFor={`image-upload-${index}`} className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-400">
                        <UploadIcon />
                        <span className="text-xs mt-1 text-center">{isMain ? 'Image Principale' : `Référence ${index}`}</span>
                    </label>
                )}
                <input
                    id={`image-upload-${index}`}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0], index);
                        }
                    }}
                />
            </div>
        )
    }

    if (!apiKeySelected) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
                <ApiKeyPrompt onSelectKey={handleSelectKey} error={apiKeyError} />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">Générateur d'Image</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-center">Images de départ (Optionnel)</h3>
                    {!hasSourceImages ? (
                        <ImageUpload onImageUpload={(file) => handleImageUpload(file, 0)} />
                    ) : (
                        <div className="space-y-2">
                            {renderImageSlot(0)}
                            <div className="grid grid-cols-2 gap-2">
                                {renderImageSlot(1)}
                                {renderImageSlot(2)}
                            </div>
                        </div>
                    )}
                </div>
                 <div className="space-y-4">
                     <h3 className="text-xl font-semibold text-center">Image Générée</h3>
                    <div className="relative group aspect-square bg-gray-800 rounded-xl flex items-center justify-center">
                       {isLoading && <LoadingSpinner />}
                       {error && !isLoading && <p className="text-red-400 p-4 text-center">{error}</p>}
                       {generatedImage && (
                           <>
                                <img src={generatedImage} alt="Generated" className="rounded-xl w-full h-full object-contain" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                    <h4 className="text-lg font-bold text-white mb-3 text-center">Actions</h4>
                                    <div className="flex flex-wrap items-center justify-center gap-3">
                                        <button 
                                            onClick={() => openFullScreenModal(generatedImage)}
                                            className="p-2 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors"
                                            title="Voir en plein écran"
                                        >
                                            <FullscreenIcon />
                                        </button>
                                        <button 
                                            onClick={() => onImageTransfer(generatedImage, 'emotionGenerator')}
                                            className="p-2 bg-orange-600 rounded-full hover:bg-orange-500 transition-colors"
                                            title="Générer des Émotions"
                                        >
                                            <EmotionIcon />
                                        </button>
                                        <button 
                                            onClick={() => onImageTransfer(generatedImage, 'cameraAngles')}
                                            className="p-2 bg-cyan-600 rounded-full hover:bg-cyan-500 transition-colors"
                                            title="Envoyer aux Angles de Caméra"
                                        >
                                            <CameraIcon />
                                        </button>
                                        <button 
                                            onClick={() => onImageTransfer(generatedImage, 'imageEditing')}
                                            className="p-2 bg-yellow-600 rounded-full hover:bg-yellow-500 transition-colors"
                                            title="Modifier l'image"
                                        >
                                            <PencilIcon />
                                        </button>
                                        <button 
                                            onClick={() => onImageTransfer(generatedImage, 'videoGeneration')}
                                            className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors"
                                            title="Générer une vidéo"
                                        >
                                            <VideoIcon />
                                        </button>
                                        <button 
                                            onClick={() => downloadImage(generatedImage, 'generated-image.png')}
                                            className="p-2 bg-purple-600 rounded-full hover:bg-purple-500 transition-colors"
                                            title="Télécharger"
                                        >
                                            <DownloadIcon />
                                        </button>
                                    </div>
                                </div>
                           </>
                       )}
                       {!isLoading && !generatedImage && !error && <p className="text-gray-500">Votre image apparaîtra ici.</p>}
                    </div>
                </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 space-y-4">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={hasSourceImages ? "Décrivez comment combiner ou modifier les images..." : "Décrivez l'image que vous souhaitez créer de A à Z..."}
                    className="w-full p-3 h-24 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    disabled={isLoading}
                />
                <div className="flex flex-col sm:flex-row gap-4">
                     <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as ImageAspectRatio)}
                        disabled={isLoading}
                        title="Choisir un rapport d'aspect"
                        className="w-full sm:w-auto p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                     >
                        {IMAGE_ASPECT_RATIOS.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
                     </select>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt}
                        className="flex-grow flex items-center justify-center px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-800 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <><LoadingSpinner /> <span className="ml-2">Génération...</span></> : 'Générer'}
                    </button>
                </div>
            </div>
            <FullScreenModal
                isOpen={fullScreenModalState.isOpen}
                onClose={closeFullScreenModal}
                imageUrl={fullScreenModalState.imageUrl}
            />
        </div>
    );
};