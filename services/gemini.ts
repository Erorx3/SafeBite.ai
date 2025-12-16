import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";

// Helper to clean JSON from Markdown code blocks often returned by LLMs
const cleanJson = (text: string): string => {
  // 1. Try to extract from markdown code blocks
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (match) {
    return match[1].trim();
  }
  
  // 2. Locate the first '{' and the last '}' to handle preamble/postscript text
  const firstOpen = text.indexOf('{');
  const lastClose = text.lastIndexOf('}');
  
  if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
    return text.substring(firstOpen, lastClose + 1);
  }

  // 3. Fallback cleanup
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

const SYSTEM_INSTRUCTION = `
You are SafeBite AI, a highly advanced food safety expert.
Your mission is to protect users by identifying food, detecting potential fraud/adulteration, and explaining health impacts.

CRITICAL RULES:
1. ALWAYS output valid JSON.
2. OUTPUT ONLY JSON. Do not include conversational text, markdown formatting, or explanations outside the JSON object.
3. NEVER say "Cannot be determined". If unsure, provide the "Potential Risks" for this food category based on your search data.
4. If the image is safe, "shortTermEffects" should be "None, safe for consumption." and "longTermRisks" should be "None".
5. If Adulterated or Inconclusive, you MUST detail the medical symptoms of the likely contaminants.

JSON STRUCTURE:
{
  "sampleName": "string",
  "status": "Safe" | "Adulterated" | "Inconclusive",
  "confidenceScore": number (0-100),
  "adulterants": [
    {
      "name": "string",
      "type": "string",
      "isToxic": boolean,
      "matchPercentage": number,
      "description": "string"
    }
  ],
  "shortTermEffects": "string (Detailed immediate symptoms on the body)",
  "longTermRisks": "string (Detailed chronic health impacts on organs/systems)",
  "summary": "string"
}
`;

export const analyzeImage = async (file: File, category: string, notes?: string): Promise<AnalysisResult> => {
  const apiKey = "AIzaSyAuKgtfSnnr8ExhU-DvAP2KEzvL5szqHbA";
  if (!apiKey) throw new Error("API Key is missing.");

  // Convert file to base64
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  
  const dataUrl = `data:${file.type};base64,${base64Data}`;

  try {
    const ai = new GoogleGenAI({ apiKey });

    // STRICT 3-STEP WORKFLOW PROMPT
    const prompt = `
      Perform a deep forensic analysis on this image of a ${category} item.
      User Notes: "${notes || 'None'}".

      STEP 1: IDENTIFY & STRUCTURE
      - Analyze the image to identify the exact food product (e.g., "Raw Cow Milk", "Chili Powder", "Apple").
      - Observe its physical structure, texture, viscosity, and color distribution.

      STEP 2: RESEARCH (Google Search)
      - Search for "common adulterants in [Product Name] [Current Year]".
      - Search for "health effects of consuming adulterated [Product Name]".
      - Search for "visual signs of fake [Product Name]".

      STEP 3: SYNTHESIS & BODY IMPACT
      - Compare the visual evidence in the image against the search findings.
      - If you see signs like "chalky texture in milk" or "bright artificial red in spice", flag it.
      - EXPLAIN THE BODY IMPACT: Based on the *potential* adulterants found in research for this product, what happens to the human body if consumed?

      Output the final result in the required JSON format only.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType: file.type, data: base64Data } }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }], // Enable Grounding
        temperature: 0.3 // Low temperature for factual, rigid adherence to schema
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    let data;
    try {
      const cleaned = cleanJson(text);
      console.log("Cleaned JSON string:", cleaned); // Debug log
      data = JSON.parse(cleaned);
    } catch (e) {
      console.error("Failed to parse JSON", text);
      throw new Error("AI response was not valid JSON. Please try again.");
    }

    // Extract grounding links if available
    const sourceLinks: string[] = [];
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      response.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
        if (chunk.web?.uri) sourceLinks.push(chunk.web.uri);
      });
    }
    
    return {
      id: Math.floor(Math.random() * 1000000).toString(),
      date: new Date().toLocaleString(),
      imageUrl: dataUrl,
      category,
      sourceLinks: [...new Set(sourceLinks)], // Deduplicate
      ...data
    };

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    throw error;
  }
};

export const analyzeText = async (textInput: string, category: string): Promise<AnalysisResult> => {
  const apiKey = "AIzaSyAuKgtfSnnr8ExhU-DvAP2KEzvL5szqHbA";
  if (!apiKey) throw new Error("API Key is missing.");

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      Analyze this text description of a ${category} food item: "${textInput}".
      
      STEP 1: RESEARCH
      - Use Google Search to investigate the symptoms/characteristics described.
      - Find common adulterants that match this description.

      STEP 2: HEALTH IMPACT
      - What does valid medical research say about consuming these specific adulterants?
      - List immediate (nausea, etc.) and chronic (organ failure, cancer, etc.) effects.

      STEP 3: JSON OUTPUT
      - Provide the response in the strict JSON schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        role: 'user',
        parts: [{ text: prompt }]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        temperature: 0.3
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    let data;
    try {
      const cleaned = cleanJson(text);
      data = JSON.parse(cleaned);
    } catch (e) {
      console.error("Failed to parse JSON", text);
      throw new Error("AI response was not valid JSON.");
    }

    const sourceLinks: string[] = [];
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      response.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
        if (chunk.web?.uri) sourceLinks.push(chunk.web.uri);
      });
    }

    return {
      id: Math.floor(Math.random() * 1000000).toString(),
      date: new Date().toLocaleString(),
      sampleName: data.sampleName || "Text Analysis",
      imageUrl: "", // No image
      category,
      sourceLinks: [...new Set(sourceLinks)],
      ...data
    };

  } catch (error) {
    console.error("Text analysis failed:", error);
    throw error;
  }
};
