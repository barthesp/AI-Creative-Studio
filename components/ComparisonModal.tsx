import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

interface ComparisonModalProps {
    isOpen: boolean;
    onClose: () => void;
    originalImageUrl: string | null;
    generatedImageUrl: string | null;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, originalImageUrl, generatedImageUrl }) => {
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !originalImageUrl || !generatedImageUrl) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="relative w-full max-w-6xl bg-gray-900/70 border border-gray-700 rounded-xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-center text-cyan-300">Avant</h2>
                        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-600 aspect-square">
                             <img src={originalImageUrl} alt="Original" className="w-full h-full object-contain" />
                        </div>
                    </div>
                     <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold text-center text-purple-300">Après</h2>
                         <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-600 aspect-square">
                            <img src={generatedImageUrl} alt="Generated" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </div>
             <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-cyan-300 transition-colors p-2 bg-black/50 rounded-full" aria-label="Fermer la vue de comparaison">
                <CloseIcon />
            </button>
        </div>
    );
};
