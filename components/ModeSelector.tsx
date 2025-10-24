import React from 'react';
import { AppMode } from '../types';

interface ModeSelectorProps {
    currentMode: AppMode;
    onModeChange: (mode: AppMode) => void;
}

const modes: { id: AppMode; name: string }[] = [
    { id: 'cameraAngles', name: 'Angles de Caméra' },
    { id: 'emotionGenerator', name: 'Émotions' },
    { id: 'imageGeneration', name: "Générateur d'Image" },
    { id: 'imageEditing', name: "Éditeur d'Image" },
    { id: 'videoGeneration', name: 'Générateur de Vidéo' },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 p-1 bg-gray-800/50 rounded-lg">
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => onModeChange(mode.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400 ${
                        currentMode === mode.id
                            ? 'bg-cyan-600 text-white shadow'
                            : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                >
                    {mode.name}
                </button>
            ))}
        </div>
    );
};