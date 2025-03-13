// utils/huggingFaceApi.ts
import axios from 'axios';

const HUGGING_FACE_API_URL = 'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-3.5-large';

/**
 * Generates an image using Hugging Face's Stable Diffusion API
 * @param prompt The text description for image generation
 * @param apiKey Your Hugging Face API key
 * @returns Promise containing the image data
 */
export async function generateImage(prompt: string, apiKey: string) {
  try {
    const response = await axios({
      url: HUGGING_FACE_API_URL,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      data: {
        inputs: prompt,
        parameters: {
          negative_prompt: "blurry, bad quality, distorted",
          num_inference_steps: 30,
          guidance_scale: 7.5
        }
      },
      responseType: 'arraybuffer'
    });

    // Convert to base64 for displaying in the browser
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}