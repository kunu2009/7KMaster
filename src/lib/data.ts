

import type { TodayTask, Project, Skill, SelfSpaceItem, ChartConfig, ResearchItem, Note, Habit, HabitLog, TimeBlock } from './types';

export const initialTimeBlocks: TimeBlock[] = [
    { id: 'tb-1', name: "08:00 - 08:30 Morning Routine" },
    { id: 'tb-2', name: "09:00 - 11:00 Focus Block 1" },
    { id: 'tb-3', name: "11:30 - 12:30 Skill Practice" },
    { id: 'tb-4', name: "13:30 - 14:30 Admin & Breaks" },
    { id: 'tb-5', name: "15:00 - 17:00 Focus Block 2" },
    { id: 'tb-6', name: "17:00 - 17:30 Afternoon Wrap-up" },
    { id: 'tb-7', name: "20:00 - 21:00 Evening Review" },
];

export const initialTodayTasks: TodayTask[] = [];

export const initialProjects: Project[] = [
  { id: '1', name: '7K Life', status: 'In Progress', lastWorked: 'July 20', nextAction: 'Add rewards system', todos: [{id: 't1', text: 'Design database schema', completed: true}, {id: 't2', text: 'Implement auth flow', completed: false}], workLog: [{id: 'w1', date: 'July 20', description: 'Finished DB schema design.'}], attachments: [{id: 'a1', name: 'Initial Mockups', url: 'https://www.figma.com'}] },
  { id: '2', name: '7K Studio', status: 'Not Started', lastWorked: '–', nextAction: 'Sketch video UI', todos: [], workLog: [], attachments: [] },
  { id: '3', name: 'Stan AI', status: 'Concept', lastWorked: 'July 19', nextAction: 'Integrate Gemini API', todos: [], workLog: [], attachments: [] },
  { id: '4', name: '7K Game', status: 'Not Started', lastWorked: '–', nextAction: 'Choose engine (Godot?)', todos: [], workLog: [], attachments: [] },
];

export const initialSkills: Skill[] = [
  { id: '1', area: 'Chess', level: '1200', weeklyGoal: '3 analyzed games', progress: 2, maxProgress: 3 },
  { id: '2', area: 'React/TypeScript', level: 'Beginner', weeklyGoal: 'Build Stan\'s chat', progress: 5, maxProgress: 5 },
  { id: '3', area: 'Guitar', level: '0', weeklyGoal: 'Finger practice x3', progress: 1, maxProgress: 3 },
  { id: '4', area: 'Hindi / Tamil', level: 'Basic', weeklyGoal: '5 words/day', progress: 5, maxProgress: 5 },
];

export const initialSelfSpace: SelfSpaceItem[] = [
  { id: '1', area: 'Desk Setup', status: 'Basic', goal: 'Add organizer', imageUrl: 'https://placehold.co/600x400.png' },
  { id: '2', area: 'Routine', status: 'Getting Better', goal: '5 days streak', imageUrl: 'https://placehold.co/600x400.png' },
  { id: '3', area: 'Mental Health', status: 'Low focus', goal: 'Meditate 5 mins', imageUrl: 'https://placehold.co/600x400.png' },
  { id: '4', area: 'Sleep/Health', status: 'Irregular', goal: 'Sleep by 11 PM', imageUrl: 'https://placehold.co/600x400.png' },
];

export const initialResearchItems: ResearchItem[] = [
    { id: '1', name: 'Genkit', type: 'Tool', url: 'https://firebase.google.com/docs/genkit', description: 'The GenAI stack for building AI-powered features and applications.' },
    { id: '2', name: 'Shadcn UI', type: 'Website', url: 'https://ui.shadcn.com/', description: 'Beautifully designed components that you can copy and paste into your apps.' },
    { id: '3', name: 'Vercel AI SDK', type: 'Tool', url: 'https://sdk.vercel.ai/', description: 'An open-source library for building AI-powered user interfaces.' },
];

export const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome Note',
    content: [
      { id: 'b1', type: 'paragraph', content: 'This is your new block-based notepad!' },
      { id: 'b2', type: 'todo', content: 'Explore the new features.', checked: false },
      { id: 'b3', type: 'todo', content: 'Create a new note.', checked: false },
    ],
    createdAt: 'July 25, 2024',
    modifiedAt: 'July 25, 2024',
  }
];

export const initialHabits: Habit[] = [
    { id: 'h1', name: 'Meditate', frequency: 'daily', goal: 7, icon: 'BrainCircuit' },
    { id: 'h2', name: 'Read 10 Pages', frequency: 'daily', goal: 7, icon: 'BookOpen' },
    { id: 'h3', name: 'Morning Walk', frequency: 'daily', goal: 7, icon: 'Sunrise' },
    { id: 'h4', name: 'Review Tasks', frequency: 'daily', goal: 7, icon: 'ClipboardCheck' },
];

export const initialHabitLogs: HabitLog = {};

export const initialJournalEntry = "";
export const initialFocusThing = "";
