import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

interface FullScreenModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string | null;
}

export const FullScreenModal: React.FC<FullScreenModalProps> = ({ isOpen, onClose, imageUrl }) => {
    
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

    if (!isOpen || !imageUrl) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img src={imageUrl} alt="Full size view" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
            </div>
             <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-cyan-300 transition-colors p-2 bg-black/50 rounded-full" aria-label="Fermer la vue plein écran">
                <CloseIcon />
            </button>
        </div>
    );
};
