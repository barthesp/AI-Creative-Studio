
import React from 'react';
import { GenerateIcon, ZipIcon, LoadingSpinner, ClearIcon } from './Icons';

interface GlobalActionsProps {
    onGenerateAll: () => void;
    onDownloadAll: () => void;
    onClear: () => void;
    isGeneratingAll: boolean;
    isZipping: boolean;
    hasGeneratedImages: boolean;
}

export const GlobalActions: React.FC<GlobalActionsProps> = ({ onGenerateAll, onDownloadAll, onClear, isGeneratingAll, isZipping, hasGeneratedImages }) => {
    return (
        <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700 flex flex-wrap gap-4 items-center justify-between">
            <div>
                 <p className="text-lg font-semibold">Actions Globales</p>
                 <p className="text-sm text-gray-400">Générez tout ou téléchargez une archive zip.</p>
            </div>
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={onGenerateAll}
                    disabled={isGeneratingAll}
                    className="flex items-center justify-center px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-800 disabled:cursor-not-allowed"
                >
                    {isGeneratingAll ? <LoadingSpinner /> : <GenerateIcon />}
                    <span className="ml-2">{isGeneratingAll ? "Génération en cours..." : "Tout Générer"}</span>
                </button>
                <button
                    onClick={onDownloadAll}
                    disabled={isZipping || !hasGeneratedImages}
                    className="flex items-center justify-center px-4 py-2 font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isZipping ? <LoadingSpinner /> : <ZipIcon />}
                    <span className="ml-2">{isZipping ? "Compression..." : "Tout Télécharger (.zip)"}</span>
                </button>
                 <button
                    onClick={onClear}
                    className="flex items-center justify-center px-4 py-2 font-semibold text-white bg-red-600/80 rounded-lg hover:bg-red-700/80 transition-colors"
                >
                    <ClearIcon />
                    <span className="ml-2">Changer l'Image</span>
                </button>
            </div>
        </div>
    );
};
