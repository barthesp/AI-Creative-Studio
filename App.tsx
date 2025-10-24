import React, { useState } from 'react';
import { AppMode } from './types';
import { Header } from './components/Header';
import { CameraAngleGenerator } from './features/CameraAngleGenerator';
import { ImageGenerator } from './features/ImageGenerator';
import { ImageEditor } from './features/ImageEditor';
import { VideoGenerator } from './features/VideoGenerator';
import { EmotionGenerator } from './features/EmotionGenerator';

function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('cameraAngles');
  const [transferedImageUrl, setTransferedImageUrl] = useState<string | null>(null);

  const handleImageTransfer = (imageUrl: string, targetMode: AppMode) => {
      setTransferedImageUrl(imageUrl);
      setCurrentMode(targetMode);
  };

  const clearTransferedImage = () => {
      setTransferedImageUrl(null);
  }

  const handleModeChange = (mode: AppMode) => {
      clearTransferedImage();
      setCurrentMode(mode);
  };

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'cameraAngles':
        return <CameraAngleGenerator onImageTransfer={handleImageTransfer} initialImageUrl={transferedImageUrl} onClearInitialImage={clearTransferedImage} />;
      case 'emotionGenerator':
        return <EmotionGenerator onImageTransfer={handleImageTransfer} initialImageUrl={transferedImageUrl} onClearInitialImage={clearTransferedImage} />;
      case 'imageGeneration':
        return <ImageGenerator 
                    initialImageUrl={transferedImageUrl} 
                    onClearInitialImage={clearTransferedImage} 
                    onImageTransfer={handleImageTransfer} 
                />;
      case 'imageEditing':
        return <ImageEditor initialImageUrl={transferedImageUrl} onClearInitialImage={clearTransferedImage} onImageTransfer={handleImageTransfer} />;
      case 'videoGeneration':
        return <VideoGenerator initialImageUrl={transferedImageUrl} onClearInitialImage={clearTransferedImage} />;
      default:
        return <CameraAngleGenerator onImageTransfer={handleImageTransfer} initialImageUrl={transferedImageUrl} onClearInitialImage={clearTransferedImage} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header currentMode={currentMode} onModeChange={handleModeChange} />
      <main>
        {renderCurrentMode()}
      </main>
    </div>
  );
}

export default App;