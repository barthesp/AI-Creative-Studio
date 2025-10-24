import React from 'react';

interface ApiKeyPromptProps {
    onSelectKey: () => void;
    featureDescription?: string;
    error?: string | null;
}

export const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSelectKey, featureDescription, error }) => (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl text-center">
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 space-y-4">
            <h2 className="text-2xl font-bold">Clé API requise</h2>
            <p className="text-gray-300">
                {featureDescription || "Pour utiliser cette fonctionnalité, vous devez sélectionner une clé API depuis un projet avec la facturation activée."}
            </p>
            <p className="text-sm text-gray-400">Pour plus d'informations, consultez la <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">documentation sur la facturation</a>.</p>
            {error && <p className="text-red-400">{error}</p>}
            <button onClick={onSelectKey} className="px-6 py-3 font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors">
                Sélectionner une Clé API
            </button>
        </div>
    </div>
);