import { toPng } from 'html-to-image';

export const convertToPng = async (
  element: HTMLElement,
  filename = 'markdown-image'
): Promise<string | null> => {
  try {
    // Add a slight delay to ensure rendering is complete
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    // Generate the PNG image
    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2, // Higher resolution
      style: {
        // Ensure proper rendering
        margin: '20px',
      },
    });
    
    return dataUrl;
  } catch (error) {
    console.error('Error converting to PNG:', error);
    return null;
  }
};

export const downloadImage = (dataUrl: string, filename = 'markdown-image') => {
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
};

export const copyImageToClipboard = async (dataUrl: string): Promise<boolean> => {
  try {
    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    
    // Copy to clipboard
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    
    return true;
  } catch (error) {
    console.error('Error copying image to clipboard:', error);
    return false;
  }
};