import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { logger } from './logger';

let imageServerUrl: string | null = null;

export async function getImageServerUrl(): Promise<string> {
  if (imageServerUrl) {
    return imageServerUrl;
  }
  
  try {
    imageServerUrl = await invoke<string>('get_image_server_url');
    return imageServerUrl;
  } catch (error) {
    logger.error('Failed to get image server URL:', error);
    
    return 'http://127.0.0.1:5000';
  }
}
export async function buildPreviewImageUrl(directoryPath: string): Promise<string> {
  const baseUrl = await getImageServerUrl();
  
  const encodedPath = encodeURIComponent(directoryPath);
  return `${baseUrl}/preview/${encodedPath}`;
}
export async function checkImageServerHealth(): Promise<boolean> {
  try {
    const baseUrl = await getImageServerUrl();
    const response = await fetch(`${baseUrl}/health`);
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.status === 'healthy';
  } catch (error) {
    logger.error('Image server health check failed:', error);
    return false;
  }
}
export function setupImageServerListeners() {
  
  listen<string>('image-server-ready', (event) => {
    //logger.log('Image server is ready:', event.payload);
    imageServerUrl = event.payload;
  });
  
  listen<string>('image-server-error', (event) => {
    logger.error('Image server error:', event.payload);
  });
}
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}
export async function getPreviewImageWithFallback(
  directoryPath: string,
  fallbackSrc?: string
): Promise<string> {
  try {
    const imageUrl = await buildPreviewImageUrl(directoryPath);
    
    
    await preloadImage(imageUrl);
    return imageUrl;
  } catch (error) {
    logger.warn(`Failed to load preview image for ${directoryPath}:`, error);
    
    if (fallbackSrc) {
      return fallbackSrc;
    }
    
    
    throw new Error(`No preview image available for ${directoryPath}`);
  }
}