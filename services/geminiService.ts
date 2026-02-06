
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

export class ScaleDownAI {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  /**
   * Generates a scientific hypothesis or technical answer.
   * Uses Gemini 3 Pro for complex reasoning.
   */
  async generateHypothesis(query: string, language: string = 'English') {
    const systemInstruction = `
      Your name is Gene. You are the high-level ScaleDown Genomic Research Assistant. 
      Core Mission: Resolve any genomic query with high-throughput multi-omics synthesis and semantic reasoning.
      
      Language Protocol:
      - You are fluently multilingual in ALL Indian languages (Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Odia, Malayalam, Punjabi, etc.).
      - User language preference: ${language}. 
      - If the user asks in an Indian language, respond perfectly in that language.
      
      Technical Protocol:
      - Reference RSIDs, HGNC symbols, and Pathway IDs.
      - Use "Semantic Genomic Compression" logic: explain how large datasets are clumped into latent features.
      - Provide "VEP" (Variant Effect Predictor) insights for mutations.
      - Be helpful, accurate, and research-grade.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: query,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      
      return response.text || "I'm sorry, I couldn't synthesize a proper response. Please try rephrasing your genomic query.";
    } catch (error: any) {
      console.error("ScaleDown AI Reasoning Error:", error);
      return `[System Error]: ${error.message || "Failed to connect to the reasoning engine."}`;
    }
  }

  /**
   * Creates a persistent chat session for the Gene Bot.
   */
  createChat(language: string = 'English'): Chat {
    return this.ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `
          Your name is Gene. You are the ScaleDown project's flagship AI.
          You help everyone from students to lead bioinformaticians.
          You support all Indian languages flawlessly. 
          Current language preference: ${language}.
          Always keep the conversation genomic-focused but accessible when needed.
          Help users resolve queries about the ScaleDown framework, VEP, GWAS, and multi-omics.
        `,
        temperature: 0.8,
      }
    });
  }

  /**
   * Simulates the 85% token reduction by summarizing dense variant data.
   */
  async simulateCompression(data: string) {
    const prompt = `Perform Semantic Genomic Compression on this data. 
    1. Identify key variants. 2. Map to latent pathways. 3. Summarize features.
    Target: 85% token reduction while preserving significance.
    Data: ${data}`;
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.1,
        }
      });
      return response.text;
    } catch (error) {
      return "Compression logic interrupted. Please check input density.";
    }
  }

  async generateEducationalVideo(prompt: string) {
    try {
      let operation = await this.ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic 3D animation: ${prompt}. Educational, scientific, cellular level detail.`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });
      
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await this.ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      return `${downloadLink}&key=${process.env.API_KEY}`;
    } catch (error) {
      console.error("ScaleDown Video Lab Error:", error);
      throw error;
    }
  }
}
