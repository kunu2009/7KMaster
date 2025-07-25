
'use server';
/**
 * @fileOverview The main AI assistant flow for the 7K Dashboard.
 *
 * - runAssistant - The primary function that processes user chat messages.
 * - AssistantInput - The input type for the assistant.
 * - AssistantOutput - The return type for the assistant.
 * - AssistantToolAction - A specific type for actions the user can take from the chat.
 */
import { ai } from '@/ai/genkit';
import { z, generate } from 'genkit';
import { ProjectStatus } from '@/lib/types';
import { generateProjectTodos } from './generate-project-todos-flow';
import type { GenerateTodosOutput } from './generate-project-todos-flow';
import type { TodayTask, Skill } from '@/lib/types';


// Schemas for AI Tools
const AddProjectInputSchema = z.object({
  name: z.string().describe('The name of the project.'),
  status: z.nativeEnum(ProjectStatus)
  .describe('The current status of the project.'),
  nextAction: z.string().describe("The very next concrete action to move the project forward."),
});

const GenerateTodosInputSchema = z.object({
  projectName: z.string().describe('The name of the project to generate todos for.'),
  numberOfTodos: z.number().int().positive().describe('The number of todos to generate.'),
  projectContext: z.string().optional().describe('Any additional context about the project provided by the user.'),
});

const TodoSchema = z.object({
    id: z.string().describe("A unique ID for the todo item, generated as a random string."),
    text: z.string().describe("The description of the task. This is the content of the to-do item and cannot be blank."),
    completed: z.boolean().describe("Whether the task is completed. This should always be false initially."),
});

// Defining the Tools
const addProjectTool = ai.defineTool(
  {
    name: 'addProject',
    description: 'Adds a new project to the user\'s project list. Use this when the user wants to create or start a new project.',
    inputSchema: AddProjectInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    // This just signals success. The client will handle the actual data update.
    console.log('AI wants to add project:', input);
    return { success: true };
  }
);

const generateProjectTodosTool = ai.defineTool(
  {
    name: 'generateProjectTodos',
    description: 'Generates a list of to-do items for a given project. Use this when the user wants ideas for tasks or a plan for one of their projects.',
    inputSchema: GenerateTodosInputSchema,
    outputSchema: z.object({ todos: z.array(TodoSchema) }),
  },
  async (input): Promise<GenerateTodosOutput> => {
      // This tool now acts as a wrapper around the dedicated flow.
      return await generateProjectTodos(input);
  }
);

// Types for the main assistant flow
const AssistantToolActionSchema = z.object({
    toolName: z.string().describe("The name of the tool that was called, e.g., 'addProject'."),
    args: z.any().describe('The arguments passed to the tool.'),
    result: z.any().optional().describe('The result returned by the tool call.'),
});
export type AssistantToolAction = z.infer<typeof AssistantToolActionSchema>;

const AssistantInputSchema = z.object({
  message: z.string(),
  history: z.array(z.any()).optional(),
  projects: z.array(z.object({ name: z.string(), nextAction: z.string(), status: z.string() })).optional().describe("A list of the user's current projects for context."),
  skills: z.array(z.object({ area: z.string(), level: z.string(), weeklyGoal: z.string(), progress: z.number(), maxProgress: z.number() })).optional().describe("A list of the user's current skills."),
  todayTasks: z.array(z.object({ task: z.string(), done: z.boolean() })).optional().describe("The user's plan for today."),
});
export type AssistantInput = z.infer<typeof AssistantInputSchema>;

const AssistantOutputSchema = z.object({
  text: z.string().describe('The textual response from the assistant.'),
  toolAction: AssistantToolActionSchema.optional().nullable().describe('An action the user can take based on the assistant\'s response.'),
});
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;


// The main assistant prompt and flow
const assistantPrompt = ai.definePrompt({
    name: 'assistantPrompt',
    input: { schema: z.any() }, // Allow any input for flexibility with template
    output: { schema: AssistantOutputSchema },
    tools: [addProjectTool, generateProjectTodosTool],
    system: `You are the 7K Life AI assistant. You are a helpful, friendly, and insightful productivity coach.
- Your primary goal is to help the user manage their dashboard by using the available tools, or to help them reflect and plan by analyzing their data.
- **IMPORTANT**: When you use a tool, you MUST also provide a friendly text response to the user confirming what you've done. Your response must always have a "text" field.
- If the user asks for a summary or plan, synthesize information from their projects, skills, and tasks to provide a thoughtful and actionable response.
- Be conversational. Do not output JSON or any other machine-readable format in the 'text' field.
- If you use 'addProject', say something like "I've added [Project Name] to your list for you!"
- If you use 'generateProjectTodos', say "Here are some task ideas for [Project Name]." and present the todos in the toolAction.
- Use all the provided context (projects, skills, tasks) to answer questions comprehensively.
`,
    prompt: `
        {{#if history}}
            Here is the conversation history:
            {{#each history}}
                {{#if isUser}}User{{else}}AI{{/if}}: {{content}}
            {{/each}}
        {{/if}}

        Here is the full context of the user's dashboard:
        
        **Projects:**
        {{#if projects}}
            {{#each projects}}
            - {{name}} (Status: {{status}}, Next Action: {{nextAction}})
            {{/each}}
        {{else}}
            The user has no projects yet.
        {{/if}}

        **Skills:**
        {{#if skills}}
            {{#each skills}}
            - {{area}} (Level: {{level}}, Goal: "{{weeklyGoal}}", Progress: {{progress}}/{{maxProgress}})
            {{/each}}
        {{else}}
            The user has no skills yet.
        {{/if}}

        **Today's Tasks:**
        {{#if todayTasks}}
             {{#each todayTasks}}
            - [{{#if done}}x{{else}} {{/if}}] {{task}}
            {{/each}}
        {{else}}
            The user has no tasks for today.
        {{/if}}

        User's new message: {{{message}}}
    `,
});

const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: AssistantInputSchema,
    outputSchema: AssistantOutputSchema,
  },
  async (input) => {
    // Pre-process history for Handlebars
    const processedHistory = (input.history || []).map(m => ({
        isUser: m.role === 'user',
        content: m.content[0]?.text || ''
    }));

    const promptRequest = {
        ...input,
        history: processedHistory
    };

    const response = await assistantPrompt(promptRequest);
    const toolRequest = response.toolRequest;
    
    if (toolRequest) {
        const toolResponse = await toolRequest.run();

        const toolAction: AssistantToolAction = {
            toolName: toolRequest.toolName,
            args: toolRequest.input,
            result: toolResponse,
        };
        
        // Ensure we still have a valid text response from the model even with a tool call.
        const textResponse = response.output?.text || response.text || "I've prepared this action for you.";
        
        return {
            text: textResponse,
            toolAction: toolAction,
        };
    }

    // This handles the case where the AI responds without a tool, ensuring the output format is consistent.
    if (response.output) {
        return response.output;
    }

    // Fallback if the output is not in the expected format
    return {
        text: response.text || "Sorry, I'm not sure how to respond to that.",
        toolAction: null,
    };
  }
);


export async function runAssistant(input: AssistantInput): Promise<AssistantOutput> {
  return assistantFlow(input);
}
