
import React from 'react';
import { Style } from '../types';

interface StyleSelectorProps {
    styles: Style[];
    selectedStyle: string;
    onStyleChange: (styleId: string) => void;
    isDisabled: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleChange, isDisabled }) => {
    return (
        <div className="space-y-3">
            <h4 className="text-lg font-semibold text-purple-300">Style Artistique</h4>
            <select
                value={selectedStyle}
                onChange={(e) => onStyleChange(e.target.value)}
                disabled={isDisabled}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Sélectionner un style artistique"
            >
                {styles.map(style => (
                    <option key={style.id} value={style.id}>
                        {style.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
