
import React from 'react';
import { Angle, GeneratedImage } from '../types';
import { CheckCircleIcon, GenerateIcon, LoadingSpinner } from './Icons';

interface AngleControlsProps {
    angles: Angle[];
    onGenerate: (angle: Angle) => void;
    generatedImages: GeneratedImage[];
    isDisabled: boolean;
}

export const AngleControls: React.FC<AngleControlsProps> = ({ angles, onGenerate, generatedImages, isDisabled }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-cyan-300 tracking-wide">Angles de Caméra</h3>
            <div className="space-y-2">
                {angles.map(angle => {
                    const correspondingImage = generatedImages.find(img => img.id === angle.id);
                    const isLoading = correspondingImage?.isLoading ?? false;
                    const isDone = !!correspondingImage?.url;

                    return (
                        <button
                            key={angle.id}
                            onClick={() => onGenerate(angle)}
                            disabled={isDisabled || isLoading}
                            className={`w-full flex items-center justify-between text-left p-3 rounded-lg transition-all duration-200 ${
                                isDisabled && !isLoading ? 'bg-gray-700 cursor-not-allowed opacity-50' : 
                                isLoading ? 'bg-cyan-900/50 cursor-wait' : 
                                isDone ? 'bg-green-800/60 hover:bg-green-700/80' : 
                                'bg-gray-700/70 hover:bg-gray-600/90'
                            }`}
                        >
                            <span className="font-medium">{angle.name}</span>
                            <div className="w-6 h-6 flex items-center justify-center">
                                {isLoading ? <LoadingSpinner /> : isDone ? <CheckCircleIcon /> : <GenerateIcon />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
