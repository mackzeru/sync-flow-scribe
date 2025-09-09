// utils/aiSummary.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // put your key in a Vite env var
  dangerouslyAllowBrowser: true,              // unlock browser usage
});
export const generateMeetingSummary = async (meeting: any, responses: any[]) => {
  const systemPrompt = `
You are an assistant that analyzes team meeting notes and task updates. 
Generate a professional but easy-to-read summary that includes:
- Meeting agenda, progress, and decisions
- Completed vs incomplete tasks
- Key insights and blockers
- Next action items
Format clearly with markdown sections and keep it concise but realistic.
  `;

  const userPrompt = `
Meeting Title: ${meeting.title}
Agenda: ${meeting.agenda}
Updates: ${meeting.updates}
Decisions: ${meeting.decisions}
Blockers: ${meeting.blockers}

Tasks and Responses:
${responses.map((r, i) => {
  const task = meeting.tasks[i];
  return `Task: ${task.title} (Assigned to ${task.assignee})
Status: ${r.completed ? "Completed ✅" : "Not Completed ❌"}
Reason: ${r.reason}`;
}).join("\n\n")}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini", // or your `AI_MODEL`
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message?.content || "AI could not generate a summary.";
};
