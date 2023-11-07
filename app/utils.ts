import OpenAI from "openai";
import { useState } from "react";

export function useUtils() {
  const [responseCampaign, setResponseCampaign] = useState<string>();
  const [responseImage, setResponseImage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const API_KEY = "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";

  const client = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
  });

  async function createCampaignChat(input: string) {
    setIsLoading(true);
    try {
      const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Eres un experto en marketing preparado para ayudar a los usuarios a crear una campaña de marketing relacionada con el tema que ellos te presentan, debes tener en cuenta cada detalle descrito por y actuar en consecuencia, ademas debes incluir al menos 2 ideas de imagenes promocionales para el producto que te estan presentando, ademas debes generar la respuesta con caracteres de salto de linea.",
          },
          {
            role: "user",
            content: input,
          },
        ],
      });

      if (!response.choices[0].message.content) {
        return;
      }

      setResponseCampaign(response.choices[0].message.content);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function createImages(input: string) {
    setIsLoading(true);
    try {
      const response = await client.images.generate({
        model: "dall-e-3",
        prompt: input,
      });

      if (!response.data[0].url) {
        return;
      }

      setResponseImage(response.data[0].url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    responseCampaign,
    responseImage,
    createCampaignChat,
    createImages,
  };
}
