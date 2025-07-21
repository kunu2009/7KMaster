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
import type { Project, ProjectStatus, Todo } from '@/lib/types';


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
    id: z.string(),
    text: z.string(),
    completed: z.boolean(),
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
    // In a real app, this would save to a database.
    // Here we just signal success. The client will handle the actual data update.
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
        You are a project management assistant. Generate a list of ${numberOfTodos} actionable to-do items for the project "${projectName}".
        ${projectContext ? `The user has provided this context: "${projectContext}"` : ''}
        The tasks should be broken down into small, concrete steps.
        Return the result as a JSON object with a "todos" array. Each todo should have an id (a random string), text, and completed (default to false).
      `;
      const llmResponse = await generate({
          model: 'googleai/gemini-2.0-flash',
          prompt: prompt,
          output: {
              schema: z.object({ todos: z.array(TodoSchema) })
          }
      });
      return llmResponse.output() || { todos: [] };
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
    input: { schema: AssistantInputSchema },
    output: { schema: AssistantOutputSchema },
    tools: [addProjectTool, generateProjectTodosTool],
    system: `You are the 7K Dashboard AI assistant.
- Be conversational and helpful.
- Your primary goal is to help the user manage their dashboard by using the available tools.
- When you use a tool, provide a friendly text response confirming what you've done or what you're suggesting.
- Before using a tool, you can ask clarifying questions if the user's request is ambiguous.
- Use the provided project list for context on what the user is already working on.
- When generating todos, formulate a clear response and pass the generated todos in the toolAction field.
`,
    prompt: `
        {{#if history}}
            Here is the conversation history:
            {{#each history}}
                {{#if @first}}
                <--
                {{/if}}
                User: {{input}}
                AI: {{output}}
                {{#if @last}}
                -->
                {{/if}}
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
    const response = await assistantPrompt(input);
    const toolRequest = response.toolRequest();
    let toolAction: AssistantToolAction | undefined = undefined;

    if (toolRequest) {
        const toolResponse = await toolRequest.run();

        // Prepare the action for the frontend
        toolAction = {
            toolName: toolRequest.toolName,
            args: toolRequest.input,
            result: toolResponse,
        };

        const followUpResponse = await assistantPrompt({
            ...input,
            history: [
                ...response.history(),
                response.request, // include the original request
                response.response, // and the tool request response
            ],
        });
        return {
            text: followUpResponse.text() || "I've processed that for you.",
            toolAction: toolAction,
        };
    }

    return {
        text: response.text(),
        toolAction: undefined,
    };
  }
);


export async function runAssistant(input: AssistantInput): Promise<AssistantOutput> {
  return assistantFlow(input);
}
