import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const SYSTEM_PROMPT = `
You are a UI/UX design expert api that generates Tailwind CSS themes.
You will receive a user prompt describing a "vibe" or style.

Your goal is to return a JSON object. 
If the user's request is unsafe, nonsensical, or not visual return a "message" type response explaining why.
If the request is valid, return a "theme" type response with valid hex codes and border radius.

STRICT JSON OUTPUT FORMATS:

OPTION 1 (Success):
{
  "type": "theme",
  "data": {
    "colors": {
      "primary": "#HEX",
      "primaryHover": "#HEX", 
      "secondary": "#HEX",
      "secondaryHover": "#HEX",
      "background": "#HEX", 
      "text": "#HEX"
    },
    "borderRadius": "0.5rem" 
  }
}

OPTION 2 (Failure/Refusal):
{
  "type": "message",
  "content": "Your polite refusal message here."
}
`;

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) return NextResponse.json({ type: 'message', content: "Prompt required" }, { status: 400 });

        // 1. Configure the model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            // This forces the AI to return strictly JSON
            generationConfig: { responseMimeType: "application/json" }
        });

        // 2. Combine system prompt + user prompt
        // Gemini doesn't have a distinct "system" role in the basic chat method
        // the same way OpenAI does, but pre-pending instructions works perfectly.
        const fullPrompt = `${SYSTEM_PROMPT}\n\nUSER REQUEST: Generate a theme for: "${prompt}"`;

        // 3. Generate
        const result = await model.generateContent(fullPrompt);
        const responseText = result.response.text();

        // 4. Parse & Return
        const parsedResponse = JSON.parse(responseText);
        return NextResponse.json(parsedResponse);

    } catch (error) {
        console.error("Gemini Error:", error);
        return NextResponse.json(
            { type: 'message', content: "Sorry, the AI is taking a nap. Try again." },
            { status: 500 }
        );
    }
}