var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
var ai = null;
var apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
try {
  if (apiKey) {
    ai = new import_genai.GoogleGenAI({
      apiKey
    });
  } else {
    console.warn("[Aiyan Embroidery] GEMINI_API_KEY is not defined in environment.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI client:", error);
}
app.use(import_express.default.json());
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", atelier: "Aiyan Embroidery And Hand Works", time: (/* @__PURE__ */ new Date()).toISOString() });
});
app.post("/api/consultant", async (req, res) => {
  const { occasion, fabric, color, blouseStyle, coverage, customDetails } = req.body;
  if (!ai) {
    return res.status(503).json({
      error: "AI service is currently unavailable on server. Please configure GEMINI_API_KEY in .env."
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
          temperature: 0.7
        }
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
          temperature: 0.7
        }
      });
      responseText = fallbackResponse.text || "";
    }
    if (!responseText) {
      throw new Error("Empty response received from Gemini model.");
    }
    const cleanedText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const resultJson = JSON.parse(cleanedText);
    return res.json(resultJson);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Failed to generate design advice. Please try again.",
      details: error.message || error
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aiyan Embroidery] Atelier server running at http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
