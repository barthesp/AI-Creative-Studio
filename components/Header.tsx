import React from 'react';
import { AppMode } from '../types';
import { ModeSelector } from './ModeSelector';

interface HeaderProps {
    currentMode: AppMode;
    onModeChange: (mode: AppMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentMode, onModeChange }) => {
    return (
        <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 p-4 sticky top-0 z-10">
            <div className="max-w-8xl mx-auto flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
                    AI Creative Suite
                </h1>
                <ModeSelector currentMode={currentMode} onModeChange={onModeChange} />
            </div>
        </header>
    );
};