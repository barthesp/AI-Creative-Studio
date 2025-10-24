
import { GeneratedImage } from '../types';
import JSZip from 'jszip';
import saveAs from 'file-saver';


export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                // remove data:image/jpeg;base64, prefix
                resolve(reader.result.split(',')[1]);
            } else {
                reject(new Error("Failed to read file as base64 string"));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};

export const dataUrlToFile = async (dataUrl: string, filename: string): Promise<File> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const mimeType = blob.type || 'image/png';
    const finalFilename = filename.includes('.') ? filename : `${filename}.${mimeType.split('/')[1] || 'png'}`;
    return new File([blob], finalFilename, { type: mimeType });
};

export const getMimeType = (file: File): string => {
    return file.type;
};

export const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


export const downloadAllAsZip = async (images: GeneratedImage[], baseFilename: string) => {
    try {
        const zip = new JSZip();
        const imageFetchPromises = images
            .filter(img => img.url)
            .map(async (img) => {
                try {
                    const response = await fetch(img.url!);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image: ${response.statusText}`);
                    }
                    const blob = await response.blob();
                    const fileExtension = blob.type.split('/')[1] || 'png';
                    return { name: `${baseFilename}-${img.name}.${fileExtension}`, blob };
                } catch (error) {
                    console.error(`Failed to process image for ${img.name}:`, error);
                    return null; // Return null for failed images
                }
            });

        const results = await Promise.all(imageFetchPromises);

        results.forEach(result => {
            if (result) {
                zip.file(result.name, result.blob);
            }
        });
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `${baseFilename}-creative-suite.zip`);

    } catch (error) {
        console.error("Failed to create or download zip file:", error);
        alert("Une erreur est survenue lors de la création du fichier zip.");
    }
};
