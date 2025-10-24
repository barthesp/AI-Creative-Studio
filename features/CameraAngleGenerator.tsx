import React, { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

import { ImageUpload } from '../components/ImageUpload';
import { Sidebar } from '../components/Sidebar';
import { AngleControls } from '../components/AngleControls';
import { ImageGrid } from '../components/ImageGrid';
import { ComparisonModal } from '../components/ComparisonModal';
import { FullScreenModal } from '../components/FullScreenModal';
import { ApiKeyPrompt } from '../components/ApiKeyPrompt';
import { CAMERA_ANGLES, IMAGE_STYLES, CREATIVE_MODE_PROMPT, FIDELITY_PROMPT } from '../constants';
import { Angle, AppMode, GeneratedImage } from '../types';
import { fileToBase64, getMimeType, downloadImage, downloadAllAsZip, dataUrlToFile } from '../utils/fileUtils';

interface CameraAngleGeneratorProps {
    onImageTransfer: (imageUrl: string, targetMode: AppMode) => void;
    initialImageUrl?: string | null;
    onClearInitialImage?: () => void;
}

export const CameraAngleGenerator: React.FC<CameraAngleGeneratorProps> = ({ onImageTransfer, initialImageUrl, onClearInitialImage }) => {
    const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>(
        CAMERA_ANGLES.map(angle => ({
            id: angle.id,
            name: angle.name,
            url: null,
            isLoading: false,
            error: null,
        }))
    );
    const [selectedStyle, setSelectedStyle] = useState<string>(IMAGE_STYLES[0].id);
    const [isCreativeMode, setIsCreativeMode] = useState<boolean>(false);
    const [isGeneratingAll, setIsGeneratingAll] = useState<boolean>(false);
    const [isZipping, setIsZipping] = useState<boolean>(false);
    const [modalState, setModalState] = useState<{ isOpen: boolean; generatedUrl: string | null }>({
        isOpen: false,
        generatedUrl: null
    });
    const [fullScreenModalState, setFullScreenModalState] = useState<{ isOpen: boolean; imageUrl: string | null }>({
        isOpen: false,
        imageUrl: null
    });
    
    const [apiKeySelected, setApiKeySelected] = useState(false);
    const [apiKeyError, setApiKeyError] = useState<string | null>(null);

    const handleImageUpload = useCallback((file: File) => {
        setOriginalImageFile(file);
        setOriginalImageUrl(URL.createObjectURL(file));
        // When a new image is selected, reset the generated images.
        setGeneratedImages(
            CAMERA_ANGLES.map(angle => ({
                id: angle.id,
                name: angle.name,
                url: null,
                isLoading: false,
                error: null,
            }))
        );
    }, []);

    useEffect(() => {
        const processInitialImage = async () => {
            if (initialImageUrl) {
                const file = await dataUrlToFile(initialImageUrl, 'transfered-image.png');
                handleImageUpload(file);
                onClearInitialImage?.();
            }
        };
        processInitialImage();
    }, [initialImageUrl, onClearInitialImage, handleImageUpload]);

    useEffect(() => {
        const checkKey = async () => {
            if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
                setApiKeySelected(true);
            }
        };
        checkKey();
    }, []);

    const handleSelectKey = async () => {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            setApiKeySelected(true);
            setApiKeyError(null);
        }
    };

    const handleApiError = (e: any): string => {
        console.error(e);
        if (e.message?.includes("API key not valid") || e.message?.includes("Requested entity was not found")) {
            const keyError = "La clé API n'est plus valide ou est incorrecte. Veuillez en sélectionner une nouvelle.";
            setApiKeyError(keyError);
            setApiKeySelected(false);
            return keyError;
        }
        return e.message || 'Une erreur inconnue est survenue.';
    };
    
    const handleClear = () => {
        setOriginalImageFile(null);
        setOriginalImageUrl(null);
        setGeneratedImages(CAMERA_ANGLES.map(angle => ({
            id: angle.id,
            name: angle.name,
            url: null,
            isLoading: false,
            error: null,
        })));
        setIsGeneratingAll(false);
    };

    const handleGenerate = useCallback(async (angle: Angle) => {
        if (!originalImageFile) return;

        setGeneratedImages(prev => prev.map(img =>
            img.id === angle.id ? { ...img, isLoading: true, error: null, url: null } : img
        ));

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const base64Data = await fileToBase64(originalImageFile);
            const mimeType = getMimeType(originalImageFile);

            const stylePrompt = IMAGE_STYLES.find(s => s.id === selectedStyle)?.prompt || "";
            const modePrompt = isCreativeMode ? CREATIVE_MODE_PROMPT : FIDELITY_PROMPT;
            
            const fullPrompt = `${angle.enhancedDescription}. ${stylePrompt}. ${modePrompt}`;
            
            const imagePart = {
                inlineData: { data: base64Data, mimeType: mimeType },
            };

            const textPart = { text: fullPrompt };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            const firstPart = response.candidates?.[0]?.content?.parts?.[0];
            if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
                const generatedBase64 = firstPart.inlineData.data;
                const generatedMimeType = firstPart.inlineData.mimeType;
                const imageUrl = `data:${generatedMimeType};base64,${generatedBase64}`;
                setGeneratedImages(prev => prev.map(img =>
                    img.id === angle.id ? { ...img, url: imageUrl, isLoading: false } : img
                ));
            } else {
                throw new Error("Aucune donnée d'image reçue de l'API.");
            }
        } catch (error: any) {
            const errorMessage = handleApiError(error);
            setGeneratedImages(prev => prev.map(img =>
                img.id === angle.id ? { ...img, isLoading: false, error: errorMessage } : img
            ));
        }
    }, [originalImageFile, selectedStyle, isCreativeMode]);

    const handleGenerateAll = async () => {
        if (!originalImageFile) return;
        setIsGeneratingAll(true);
        for (const angle of CAMERA_ANGLES) {
            const existing = generatedImages.find(img => img.id === angle.id);
            if (!existing || (!existing.url && !existing.isLoading && !existing.error)) {
                 await handleGenerate(angle);
            }
        }
        setIsGeneratingAll(false);
    };
    
    const handleDownloadAll = async () => {
        if (!originalImageFile) return;
        setIsZipping(true);
        const baseFilename = originalImageFile.name.split('.').slice(0, -1).join('.') || 'generated-images';
        await downloadAllAsZip(generatedImages, baseFilename);
        setIsZipping(false);
    };

    const handleDownloadSingle = (url: string, filename: string) => {
        downloadImage(url, `${filename}.png`);
    };
    
    const openCompareModal = (generatedUrl: string) => {
        setModalState({ isOpen: true, generatedUrl });
    };

    const closeCompareModal = () => {
        setModalState({ isOpen: false, generatedUrl: null });
    };

    const openFullScreenModal = (imageUrl: string) => {
        setFullScreenModalState({ isOpen: true, imageUrl });
    };

    const closeFullScreenModal = () => {
        setFullScreenModalState({ isOpen: false, imageUrl: null });
    };

    const isGenerating = isGeneratingAll || generatedImages.some(img => img.isLoading);

    if (!apiKeySelected) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
                <ApiKeyPrompt onSelectKey={handleSelectKey} error={apiKeyError} />
            </div>
        );
    }
    
    if (!originalImageUrl) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
                <ImageUpload onImageUpload={handleImageUpload} />
            </div>
        );
    }
    
    return (
        <div className="flex flex-col lg:flex-row">
            <Sidebar
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
                isCreativeMode={isCreativeMode}
                onCreativeModeChange={setIsCreativeMode}
                isGeneratingAll={isGeneratingAll}
                isDisabled={isGenerating}
            >
                <AngleControls 
                    angles={CAMERA_ANGLES} 
                    onGenerate={handleGenerate}
                    generatedImages={generatedImages}
                    isDisabled={isGenerating}
                />
            </Sidebar>

            <ImageGrid
                originalImageUrl={originalImageUrl}
                generatedImages={generatedImages}
                onCompare={openCompareModal}
                onViewFullSize={openFullScreenModal}
                onDownload={handleDownloadSingle}
                onGenerateAll={handleGenerateAll}
                onDownloadAll={handleDownloadAll}
                onClear={handleClear}
                isGeneratingAll={isGeneratingAll}
                isZipping={isZipping}
                onImageTransfer={onImageTransfer}
                hideCameraAngleButton={true}
            />

            <ComparisonModal
                isOpen={modalState.isOpen}
                onClose={closeCompareModal}
                originalImageUrl={originalImageUrl}
                generatedImageUrl={modalState.generatedUrl}
            />

            <FullScreenModal
                isOpen={fullScreenModalState.isOpen}
                onClose={closeFullScreenModal}
                imageUrl={fullScreenModalState.imageUrl}
            />
        </div>
    );
};
