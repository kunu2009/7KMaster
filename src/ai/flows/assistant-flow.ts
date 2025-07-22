
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
  projects: z.array(z.object({ name: z.string(), nextAction: z.string() })).optional().describe('A list of the user\'s current projects for context.'),
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
    system: `You are the 7K Dashboard AI assistant.
- Be conversational, friendly, and helpful.
- Your primary goal is to help the user manage their dashboard by using the available tools.
- **IMPORTANT**: When you decide to use a tool, you MUST also provide a friendly text response to the user confirming what you've done or what you're suggesting. Your response must always have a "text" field with a conversational message for the user. Do not output JSON or any other machine-readable format in the 'text' field.
- If the user provides context about a specific project, focus your response and tool usage on that project.
- If you use 'addProject', say something like "I've added [Project Name] to your list for you! You can confirm it below."
- If you use 'generateProjectTodos', say "Here are some task ideas for [Project Name]. You can add them to your project." and present the generated todos in the toolAction.
- You can ask clarifying questions if the user's request is ambiguous before using a tool.
- Use the provided project list for context on what the user is already working on.
`,
    prompt: `
        {{#if history}}
            Here is the conversation history:
            {{#each history}}
                {{#if isUser}}User{{else}}AI{{/if}}: {{content}}
            {{/each}}
        {{/if}}

        Here are the user's current projects:
        {{#if projects}}
            {{#each projects}}
            - {{name}} (Next Action: {{nextAction}})
            {{/each}}
        {{else}}
            The user has no projects yet.
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
