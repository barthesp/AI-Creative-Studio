
export interface Angle {
  id: string;
  name: string;
  description: string;
  enhancedDescription: string;
}

export interface Emotion {
  id: string;
  name: string;
  prompt: string;
}

export interface GeneratedImage {
  id: string;
  name: string;
  url: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface Style {
  id: string;
  name: string;
  prompt: string;
}

export type AppMode = 'cameraAngles' | 'imageGeneration' | 'imageEditing' | 'videoGeneration' | 'emotionGenerator';

export const IMAGE_ASPECT_RATIOS = ["1:1", "3:4", "4:3", "9:16", "16:9"] as const;
export type ImageAspectRatio = typeof IMAGE_ASPECT_RATIOS[number];

export const VIDEO_ASPECT_RATIOS = ["16:9", "9:16"] as const;
export type VideoAspectRatio = typeof VIDEO_ASPECT_RATIOS[number];