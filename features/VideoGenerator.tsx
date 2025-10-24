import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { VIDEO_ASPECT_RATIOS, VideoAspectRatio } from '../types';
import { LoadingSpinner, CloseIcon, DownloadIcon } from '../components/Icons';
import { ApiKeyPrompt } from '../components/ApiKeyPrompt';
import { ImageUpload } from '../components/ImageUpload';
import { fileToBase64, getMimeType } from '../utils/fileUtils';

interface VideoGeneratorProps {
    initialImageUrl?: string | null;
    onClearInitialImage?: () => void;
}

const VIDEO_FILTERS = [
    { id: 'none', name: 'Aucun Filtre', style: 'none' },
    { id: 'bw', name: 'Noir et Blanc', style: 'grayscale(1)' },
    { id: 'noir', name: 'Noir', style: 'grayscale(1) contrast(1.3) brightness(0.8)' },
    { id: 'sepia', name: 'Sépia', style: 'sepia(1)' },
    { id: 'vintage', name: 'Vintage', style: 'sepia(0.6) contrast(0.8) brightness(1.1) saturate(1.2)' },
    { id: 'warm', name: 'Chaud', style: 'sepia(.4) saturate(1.5)' },
    { id: 'cool', name: 'Froid', style: 'sepia(.2) hue-rotate(180deg) saturate(1.2)' },
    { id: 'vivid', name: 'Vif', style: 'saturate(2)' },
    { id: 'high_contrast', name: 'Contraste Élevé', style: 'contrast(1.6)' },
    { id: 'dreamy', name: 'Rêveur', style: 'saturate(1.2) contrast(0.9) blur(1px) brightness(1.1)' },
    { id: 'invert', name: 'Inverser', style: 'invert(1)' }
];

export const VideoGenerator: React.FC<VideoGeneratorProps> = ({ initialImageUrl, onClearInitialImage }) => {
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>('16:9');
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [apiKeySelected, setApiKeySelected] = useState(false);
    const [apiKeyError, setApiKeyError] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState('none');

    const [sourceImageFile, setSourceImageFile] = useState<File | null>(null);
    const [sourceImageUrl, setSourceImageUrl] = useState<string | null>(null);

    const operationRef = useRef<any | null>(null);
    
    useEffect(() => {
        const checkKey = async () => {
            if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
                setApiKeySelected(true);
            }
        };
        checkKey();
    }, []);

    useEffect(() => {
        if (initialImageUrl) {
            // Convert dataURL to File for consistency
            fetch(initialImageUrl)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "transfered-video-source.png", { type: blob.type });
                    handleImageUpload(file);
                });
            onClearInitialImage?.(); 
        }
    }, [initialImageUrl, onClearInitialImage]);

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
        setError(e.message || 'Échec de la génération de la vidéo.');
    };

    const pollOperation = async (operation: any, ai: GoogleGenAI) => {
        let currentOperation = operation;
        while (!currentOperation.done) {
            setLoadingMessage('Opération en cours... La génération de vidéo peut prendre quelques minutes.');
            await new Promise(resolve => setTimeout(resolve, 10000));
            try {
                currentOperation = await ai.operations.getVideosOperation({ operation: currentOperation });
            } catch (e) {
                handleApiError(e);
                setIsLoading(false);
                return;
            }
        }
        operationRef.current = null;

        if (currentOperation.error) {
            setError(`Erreur lors de la génération: ${currentOperation.error.message}`);
            setIsLoading(false);
            return;
        }

        const downloadLink = currentOperation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
            setLoadingMessage('Téléchargement de la vidéo...');
            try {
                const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                if (!response.ok) {
                    throw new Error(`Erreur de téléchargement: ${response.statusText}`);
                }
                const blob = await response.blob();
                const videoUrl = URL.createObjectURL(blob);
                setGeneratedVideoUrl(videoUrl);
            } catch (e: any) {
                setError(e.message);
            }
        } else {
            setError('Aucun lien de téléchargement de vidéo trouvé dans la réponse.');
        }
        setIsLoading(false);
    };

    const handleImageUpload = (file: File) => {
        setSourceImageFile(file);
        setSourceImageUrl(URL.createObjectURL(file));
        setGeneratedVideoUrl(null);
        setError(null);
        setSelectedFilter('none');
    };

    const handleClearImage = () => {
        setSourceImageFile(null);
        setSourceImageUrl(null);
        setGeneratedVideoUrl(null);
        setError(null);
        setSelectedFilter('none');
    }

    const handleGenerate = async () => {
        if (!prompt && !sourceImageFile) {
            setError('Veuillez entrer une description ou fournir une image de départ.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedVideoUrl(null);
        setSelectedFilter('none');
        setLoadingMessage('Initialisation de la génération de la vidéo...');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            const requestPayload: any = {
              model: 'veo-3.1-fast-generate-preview',
              prompt: prompt,
              config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: aspectRatio
              }
            };

            if (sourceImageFile) {
                const base64Data = await fileToBase64(sourceImageFile);
                const mimeType = getMimeType(sourceImageFile);
                requestPayload.image = {
                    imageBytes: base64Data,
                    mimeType: mimeType
                };
            }

            let operation = await ai.models.generateVideos(requestPayload);
            operationRef.current = operation;
            await pollOperation(operation, ai);

        } catch (e: any) {
            handleApiError(e);
            setIsLoading(false);
        }
    };

    if (!apiKeySelected) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
                <ApiKeyPrompt onSelectKey={handleSelectKey} error={apiKeyError} />
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-4xl">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 space-y-6">
                <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">Générateur de Vidéo</h2>
                
                {sourceImageUrl ? (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-300">Image de départ</h3>
                        <div className="relative group">
                            <img src={sourceImageUrl} alt="Source" className="rounded-lg w-full max-h-80 object-contain mx-auto bg-gray-900/50" />
                            <button onClick={handleClearImage} className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors" aria-label="Retirer l'image">
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-300">Image de départ (Optionnel)</h3>
                        <ImageUpload onImageUpload={handleImageUpload} />
                    </div>
                )}
                
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Décrivez la vidéo que vous souhaitez créer (optionnel si une image est fournie)..."
                    className="w-full p-3 h-32 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    disabled={isLoading}
                />
                <div className="flex flex-col sm:flex-row gap-4">
                     <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as VideoAspectRatio)}
                        disabled={isLoading}
                        className="w-full sm:w-auto p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                     >
                        {VIDEO_ASPECT_RATIOS.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
                     </select>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || (!prompt && !sourceImageFile)}
                        className="flex-grow flex items-center justify-center px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-800 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <><LoadingSpinner /> <span className="ml-2">Génération...</span></> : 'Générer la vidéo'}
                    </button>
                </div>
                 {error && <p className="text-red-400 text-center">{error}</p>}
            </div>

            <div className="mt-8">
                {isLoading && (
                     <div className="aspect-video w-full max-w-lg mx-auto bg-gray-800 rounded-xl flex flex-col items-center justify-center text-center p-4">
                        <LoadingSpinner />
                        <p className="mt-4 text-lg font-semibold">{loadingMessage}</p>
                        <p className="text-sm text-gray-400">Cela peut prendre plusieurs minutes. Merci de votre patience.</p>
                    </div>
                )}
                {generatedVideoUrl && (
                    <div className="w-full max-w-lg mx-auto space-y-4">
                        <video 
                            src={generatedVideoUrl}
                            key={generatedVideoUrl}
                            controls 
                            autoPlay 
                            loop 
                            className="rounded-xl shadow-lg w-full h-full transition-all duration-300"
                            style={{ filter: VIDEO_FILTERS.find(f => f.id === selectedFilter)?.style }}
                         />
                        <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col sm:flex-row gap-4 items-center">
                            <label htmlFor="video-filter" className="font-semibold text-gray-300 flex-shrink-0">Appliquer un filtre :</label>
                            <select
                                id="video-filter"
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className="w-full sm:flex-grow p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                {VIDEO_FILTERS.map(filter => (
                                    <option key={filter.id} value={filter.id}>{filter.name}</option>
                                ))}
                            </select>
                            <a 
                                href={generatedVideoUrl} 
                                download="generated-video.mp4"
                                className="flex items-center justify-center px-4 py-2 font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors flex-shrink-0 w-full sm:w-auto"
                            >
                                <DownloadIcon />
                                <span className="ml-2">Télécharger</span>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};