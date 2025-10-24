import React from 'react';

const iconProps = {
    className: "w-6 h-6",
    strokeWidth: 2,
    stroke: "currentColor",
    fill: "none",
    strokeLinecap: "round" as "round",
    strokeLinejoin: "round" as "round",
};

export const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const CheckCircleIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export const GenerateIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path>
        <path d="m9 11 3 3 3-3"></path>
        <path d="M12 14V7"></path>
        <path d="M5 22h14"></path>
    </svg>
);

export const PencilIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
);

export const VideoIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="m22 8-6 4 6 4V8Z"></path>
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
    </svg>
);

export const FullscreenIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
    </svg>
);

export const CompareIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
        <line x1="6" y1="15" x2="18" y2="15" />
        <line x1="6" y1="9" x2="18" y2="9" />
    </svg>
);

export const DownloadIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

export const ErrorIcon: React.FC = () => (
    <svg {...iconProps} className="w-8 h-8 text-red-400" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

export const CameraIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
        <circle cx="12" cy="13" r="3"></circle>
    </svg>
);

export const EmotionIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
    </svg>
);

export const UploadIcon: React.FC = () => (
    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
    </svg>
);

export const ZipIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <path d="m7.5 9.5 5 5"></path>
        <path d="m16.5 9.5-5 5"></path>
    </svg>
);

export const ClearIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M9 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3"></path>
        <path d="M9 15h3l8.5-8.5a2.121 2.121 0 0 0-3-3L9 12v3"></path>
        <path d="M16 5l3 3"></path>
        <path d="m21.5 6.5-1 1L18 5l1-1a2.121 2.121 0 0 1 3 3Z"></path>
    </svg>
);


export const CloseIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
