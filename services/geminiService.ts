
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getBusinessAdvice = async (prompt: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Você é o Mentor Nova Move Pro, um assistente especializado em empreendedorismo jovem e crescimento financeiro em África. 
        Seu tom é motivador, prático e focado em resultados. Você ajuda usuários com:
        1. Criação de planos de negócio.
        2. Uso de cartões virtuais para pagamentos internacionais (Meta Ads, Shopify, AWS).
        3. Marketing digital para o mercado africano (Angola, Nigéria, Quénia, África do Sul).
        4. Literacia financeira.
        Sempre responda em Português, de forma clara e estruturada.`,
        temperature: 0.7,
      }
    });

    return response.text || "Desculpe, não consegui processar sua solicitação no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Houve um erro ao conectar com o Nova Move AI. Verifique sua conexão.";
  }
};
