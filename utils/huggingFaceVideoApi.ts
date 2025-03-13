// utils/huggingFaceVideoApi.ts
import { InferenceClient } from "@huggingface/inference";

/**
 * Generates a video using Hugging Face's text-to-video models
 * @param prompt The text description for video generation
 * @param apiKey Your Hugging Face API key
 * @param steps Number of inference steps (higher = better quality but slower)
 * @returns Promise containing the video URL or data
 */
export async function generateVideo(
  prompt: string, 
  apiKey: string,
  steps: number = 5
) {
  try {
    const client = new InferenceClient(apiKey);
    
    const videoBlob = await client.textToVideo({
      model: "Wan-AI/Wan2.1-T2V-14B",
      provider: "replicate",
      inputs: prompt,
      parameters: { 
        num_inference_steps: steps 
      },
    });
    
    // Upload the blob to a storage service or server route that can serve the video
    // For this example, we'll convert to base64 to store in the database
    const base64Video = await blobToBase64(videoBlob);
    
    // Create a data URL that can be used directly in video elements
    return `data:video/mp4;base64,${base64Video}`;
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
}

/**
 * Converts a Blob to base64 string
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (data:video/mp4;base64,)
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}