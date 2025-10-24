import React from 'react';

interface CreativeModeToggleProps {
    isChecked: boolean;
    onChange: (isChecked: boolean) => void;
    isDisabled: boolean;
}

export const CreativeModeToggle: React.FC<CreativeModeToggleProps> = ({ isChecked, onChange, isDisabled }) => {
    return (
        <div className="space-y-3">
            <h4 className="text-lg font-semibold text-purple-300">Mode Créatif</h4>
            <label htmlFor="creative-toggle" className={`flex items-center justify-between w-full p-3 rounded-lg ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                <span className="text-gray-300">
                    Activer pour des résultats plus surprenants et artistiques.
                </span>
                <div className="relative">
                    <input 
                        type="checkbox" 
                        id="creative-toggle"
                        className="sr-only" 
                        checked={isChecked}
                        onChange={(e) => onChange(e.target.checked)}
                        disabled={isDisabled}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${isChecked ? 'bg-purple-600' : 'bg-gray-600'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isChecked ? 'translate-x-6' : ''}`}></div>
                </div>
            </label>
        </div>
    );
};
