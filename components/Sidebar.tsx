import React from 'react';
import { StyleSelector } from './StyleSelector';
import { IMAGE_STYLES } from '../constants';
import { CreativeModeToggle } from './CreativeModeToggle';

interface SidebarProps {
    children: React.ReactNode;
    selectedStyle: string;
    onStyleChange: (styleId: string) => void;
    isCreativeMode: boolean;
    onCreativeModeChange: (isEnabled: boolean) => void;
    isGeneratingAll: boolean;
    isDisabled: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    children, 
    selectedStyle, 
    onStyleChange,
    isCreativeMode,
    onCreativeModeChange,
    isGeneratingAll,
    isDisabled 
}) => {
    return (
        <aside className="w-full lg:w-80 xl:w-96 p-4 md:p-6 lg:p-8 bg-gray-800/50 lg:h-screen lg:overflow-y-auto border-t lg:border-t-0 lg:border-r border-gray-700/50">
            <div className="space-y-8">
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 space-y-4">
                    <CreativeModeToggle
                        isChecked={isCreativeMode}
                        onChange={onCreativeModeChange}
                        isDisabled={isDisabled}
                    />
                    <StyleSelector 
                        styles={IMAGE_STYLES}
                        selectedStyle={selectedStyle}
                        onStyleChange={onStyleChange}
                        isDisabled={isDisabled}
                    />
                </div>
                
                {children}

                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 space-y-3">
                    <h4 className="text-lg font-semibold text-purple-300">Options Avancées</h4>
                    <div className="text-sm text-gray-400 space-y-2">
                        <p>Plus d'outils à venir !</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};