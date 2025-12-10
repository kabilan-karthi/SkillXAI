import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- Gemini setup ---------------------------------------------------------

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY env var is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// --- Inngest function -----------------------------------------------------

export const generateIndustryInsights = inngest.createFunction(
  {
    id: "generate-industry-insights", // ✅ id required by Inngest
    name: "Generate Industry Insights",
  },
  { cron: "0 0 * * 0" }, // Run every Sunday at midnight
  async ({ step }) => {
    // 1) Fetch all industries we already have in DB
    const industries = await step.run("Fetch industries", async () => {
      return db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      if (!industry) continue;

      const prompt = `
Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "High" | "Medium" | "Low",
  "topSkills": ["skill1", "skill2"],
  "marketOutlook": "Positive" | "Neutral" | "Negative",
  "keyTrends": ["trend1", "trend2"],
  "recommendedSkills": ["skill1", "skill2"]
}

IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
Include at least 5 common roles for salary ranges.
Growth rate should be a percentage.
Include at least 5 skills and trends.
`;

      // 2) Call Gemini via step.ai.wrap
      const res = await step.ai.wrap(
        "gemini",
        async (p: string) => {
          return model.generateContent(p);
        },
        prompt
      );

      // 3) Safely read the text from response
      const candidates = res.response.candidates;
      if (!candidates?.length) {
        throw new Error(`No candidates returned from Gemini for industry: ${industry}`);
      }

      const firstContent = candidates[0].content;
      const firstPart = firstContent.parts[0];

      // parts is a union: { text } | { inlineData } | { functionCall } etc
      if (!("text" in firstPart) || typeof firstPart.text !== "string") {
        throw new Error(`First part of Gemini response is not text for industry: ${industry}`);
      }

      const rawText = firstPart.text;
      const cleanedText = rawText.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();

      let insights: any;
      try {
        insights = JSON.parse(cleanedText);
      } catch (err) {
        console.error("Failed to parse JSON from Gemini:", cleanedText);
        throw new Error(`Failed to parse Gemini JSON for industry: ${industry}`);
      }

      // 4) Update DB
      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
          },
        });
      });
    }
  }
);
