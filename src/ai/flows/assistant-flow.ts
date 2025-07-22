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
import type { Project, ProjectStatus } from '@/lib/types';


// Schemas for AI Tools
const AddProjectInputSchema = z.object({
  name: z.string().describe('The name of the project.'),
  status: z.nativeEnum(Object.values({
    Concept: 'Concept',
    NotStarted: 'Not Started',
    InProgress: 'In Progress',
    Completed: 'Completed',
  }).reduce((acc, curr) => ({...acc, [curr]: curr}), {}) as { [key in ProjectStatus]: key })
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
    text: z.string().describe("The description of the task."),
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
  async ({ projectName, numberOfTodos, projectContext }) => {
      const prompt = `
        You are a world-class project manager. A user needs help breaking down a project into tasks.
        Generate a list of exactly ${numberOfTodos} actionable to-do items for the project named "${projectName}".

        ${projectContext ? `The user has provided this context about the project: "${projectContext}"` : ''}
        
        The tasks should be concrete, actionable, and clear. For example, instead of "code the backend", a good task would be "Set up Express server with TypeScript".
        Return the result as a JSON object with a "todos" array. Each todo must have:
        - an "id" (a unique random string)
        - a "text" (the task description)
        - a "completed" field (which must be false).
      `;
      const llmResponse = await generate({
          model: 'googleai/gemini-2.0-flash',
          prompt: prompt,
          output: {
              schema: z.object({ todos: z.array(TodoSchema) })
          }
      });
      return llmResponse.output || { todos: [] };
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
  toolAction: AssistantToolActionSchema.optional().describe('An action the user can take based on the assistant\'s response.'),
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
- When you decide to use a tool, you MUST provide a friendly text response to the user confirming what you've done or what you're suggesting. For example, if you use 'addProject', say "I've added [Project Name] to your list for you!". If you use 'generateProjectTodos', say "Here are some task ideas for [Project Name]. You can add them to your project."
- You can ask clarifying questions if the user's request is ambiguous before using a tool.
- Use the provided project list for context on what the user is already working on.
- When generating todos, you must formulate a clear response and pass the generated todos in the toolAction field.
`,
    prompt: `
        {{#if history}}
            Here is the conversation history:
            {{#each history}}
                {{#if @first}}<--{{/if}}
                {{#if isUser}}User{{else}}AI{{/if}}: {{#each content}}{{#if text}}{{text}}{{/if}}{{/each}}
                {{#if @last}}-->{{/if}}
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
        ...m,
        isUser: m.role === 'user'
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
        
        // The prompt should have already generated a user-facing message.
        // We just return it along with the tool action.
        return {
            text: response.text,
            toolAction: toolAction,
        };
    }

    return {
        text: response.text,
        toolAction: undefined,
    };
  }
);


export async function runAssistant(input: AssistantInput): Promise<AssistantOutput> {
  return assistantFlow(input);
}
