import { GoogleGenAI } from "@google/genai";

const getAI = () =>
  new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || "",
  });

export const generateLoveLetter = async (
  partnerName: string,
  specialTrait: string,
  relationshipDuration: string
): Promise<string> => {
  const ai = getAI();

  const prompt = `Write a deeply touching, emotional, and romantic Valentine's letter for my boyfriend named ${partnerName}.
Mention that he is my best friend.
Highlight that I love his ${specialTrait}.
We have been together for ${relationshipDuration}.
The tone should be sincere, heartwarming, and make him feel incredibly special.
Keep it around 150-200 words.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    return (
      response.text ||
      "My heart is so full of love for you that words sometimes fail me. You are my world."
    );
  } catch (error) {
    console.error("Error generating letter:", error);

    return "Even when the AI fails to find words, my heart knows exactly how much I love you. You are my best friend and my soulmate.";
  }
};
