import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Initialize Gemini client safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

try {
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
    });
  } else {
    console.warn("[Aiyan Embroidery] GEMINI_API_KEY is not defined in environment.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI client:", error);
}

// Parse JSON request bodies
app.use(express.json());

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", atelier: "Aiyan Embroidery And Hand Works", time: new Date().toISOString() });
});

// Interactive AI Embroidery Design Consultant
app.post("/api/consultant", async (req, res) => {
  const { occasion, fabric, color, blouseStyle, coverage, customDetails } = req.body;

  if (!ai) {
    return res.status(503).json({
      error: "AI service is currently unavailable on server. Please configure GEMINI_API_KEY in .env.",
    });
  }

  try {
    const systemPrompt = `You are an elite, high-end bridal embroidery master and fashion designer at "Aiyan Embroidery And Hand Works", a prestigious boutique in Bangalore. 
You specialize in premium traditional and contemporary embroidery, including Aari work, Maggam work, Zardosi, Kundan, stone and bead embellishments, cutwork, and thread embroidery for women's designer blouses, bridal saris, and lehengas.

Analyze the user's input variables and generate a personalized, elegant, and highly professional design proposal. 
Your response must be in clean, valid JSON format with the following keys:
- "title": An elegant custom name for this proposed design.
- "embroideryStyle": Recommended type of embroidery (e.g., Antique Zardosi with Aari border, Intricate Kundan & Beadwork, Delicate Floral Threadwork, etc.).
- "designConcept": A detailed, sensory paragraph describing the overall visual theme, neck pattern, sleeve detailing, and back-neck highlight. Explain how it complements the specific saree/garment.
- "recommendedMotifs": An array of 3-4 specific motifs to incorporate (e.g., "Lotus creepers on the sleeves", "Symmetrical matching peacocks on the back", "Doli design", "Delicate floral jaal").
- "embellishments": A description of materials (e.g., antique gold zari thread, pearls, ruby-pink stones, glass beads, sequins).
- "suggestedColorPairings": An array of 3 suggested embroidery color combinations that would pop against the garment fabric.
- "careInstructions": Brief elegant advice on how to store and clean the finished garment.
- "estimateTimeline": Estimated handcrafting duration (e.g., "7-10 Days", "15-18 Days for heavy bridal").

Be encouraging, warm, professional, and evoke the luxury of high-end Indian bridal wear. Maintain authentic Indian ethnic wear vocabulary (Zardosi, Maggam, Aari, Kundan, Jhumka motifs, etc.). Always return valid JSON without markdown fences.`;

    const userPrompt = `
Formulate a designer embroidery concept for:
- Occasion: ${occasion || "Wedding / Bridal"}
- Fabric of Saree/Blouse: ${fabric || "Kanjeevaram / Pure Silk"}
- Fabric Color: ${color || "Deep Crimson Red with Gold Zari"}
- Blouse Neckline Style: ${blouseStyle || "Deep back-neck with elbow-length sleeves"}
- Desired Coverage/Density: ${coverage || "Heavy Bridal Work"}
- Additional wishes or saree detailing: ${customDetails || "No additional notes"}
`;

    let responseText = "";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });
      responseText = response.text || "";
    } catch (primaryErr) {
      console.warn("Primary model attempt failed, trying gemini-2.0-flash:", primaryErr);
      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });
      responseText = fallbackResponse.text || "";
    }

    if (!responseText) {
      throw new Error("Empty response received from Gemini model.");
    }

    const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const resultJson = JSON.parse(cleanedText);
    return res.json(resultJson);

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Failed to generate design advice. Please try again.",
      details: error.message || error,
    });
  }
});

// Start the server and configure Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // In development mode, mount Vite as a middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the compiled static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aiyan Embroidery] Atelier server running at http://localhost:${PORT}`);
  });
}

startServer();
