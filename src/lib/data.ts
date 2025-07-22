
import type { TodayTask, Project, Skill, SelfSpaceItem, ChartConfig, ResearchItem } from './types';

export const initialTodayTasks: TodayTask[] = [
  { id: '1', timeBlock: '08:00 - 08:30', task: 'Morning Routine: Journal and hydrate', done: false },
  { id: '2', timeBlock: '09:00 - 11:00', task: 'Focus Block: Skill - React/TypeScript', done: false },
  { id: '3', timeBlock: '11:00 - 12:00', task: 'Focus Block: Project - 7K Life feature', done: false },
  { id: '4', timeBlock: '12:00 - 13:00', task: 'Break: Lunch and walk', done: false },
  { id: '5', timeBlock: '13:00 - 14:00', task: 'Practice: Chess Puzzles', done: false },
  { id: '6', timeBlock: '14:00 - 15:00', task: 'Admin: Reply to emails', done: false },
  { id: '7', timeBlock: '17:00 - 17:30', task: 'Review: Log today\'s work and plan tomorrow', done: false },
];

export const initialProjects: Project[] = [
  { id: '1', name: '7K Life', status: 'In Progress', lastWorked: 'July 20', nextAction: 'Add rewards system', todos: [{id: 't1', text: 'Design database schema', completed: true}, {id: 't2', text: 'Implement auth flow', completed: false}], workLog: [{id: 'w1', date: 'July 20', description: 'Finished DB schema design.'}] },
  { id: '2', name: '7K Studio', status: 'Not Started', lastWorked: '–', nextAction: 'Sketch video UI', todos: [], workLog: [] },
  { id: '3', name: 'Stan AI', status: 'Concept', lastWorked: 'July 19', nextAction: 'Integrate Gemini API', todos: [], workLog: [] },
  { id: '4', name: '7K Game', status: 'Not Started', lastWorked: '–', nextAction: 'Choose engine (Godot?)', todos: [], workLog: [] },
];

export const initialSkills: Skill[] = [
  { id: '1', area: 'Chess', level: '1200', weeklyGoal: '3 analyzed games', progress: 2, maxProgress: 3 },
  { id: '2', area: 'React/TypeScript', level: 'Beginner', weeklyGoal: 'Build Stan\'s chat', progress: 5, maxProgress: 5 },
  { id: '3', area: 'Guitar', level: '0', weeklyGoal: 'Finger practice x3', progress: 1, maxProgress: 3 },
  { id: '4', area: 'Hindi / Tamil', level: 'Basic', weeklyGoal: '5 words/day', progress: 5, maxProgress: 5 },
];

export const initialSelfSpace: SelfSpaceItem[] = [
  { id: '1', area: 'Desk Setup', status: 'Basic', goal: 'Add organizer' },
  { id: '2', area: 'Routine', status: 'Getting Better', goal: '5 days streak' },
  { id: '3', area: 'Mental Health', status: 'Low focus', goal: 'Meditate 5 mins' },
  { id: '4', area: 'Sleep/Health', status: 'Irregular', goal: 'Sleep by 11 PM' },
];

export const initialResearchItems: ResearchItem[] = [
    { id: '1', name: 'Genkit', type: 'Tool', url: 'https://firebase.google.com/docs/genkit', description: 'The GenAI stack for building AI-powered features and applications.' },
    { id: '2', name: 'Shadcn UI', type: 'Website', url: 'https://ui.shadcn.com/', description: 'Beautifully designed components that you can copy and paste into your apps.' },
    { id: '3', name: 'Vercel AI SDK', type: 'Tool', url: 'https://sdk.vercel.ai/', description: 'An open-source library for building AI-powered user interfaces.' },
];

export const initialJournalEntry = "";
export const initialFocusThing = "";

export const progressChartData = [
    { name: 'Week 1', '7K Life': 5, 'Stan AI': 2, '7K Studio': 0 },
    { name: 'Week 2', '7K Life': 7, 'Stan AI': 3, '7K Studio': 1 },
    { name: 'Week 3', '7K Life': 10, 'Stan AI': 5, '7K Studio': 2 },
    { name: 'Week 4', '7K Life': 8, 'Stan AI': 6, '7K Studio': 4 },
];

export const skillProgressData = [
    { name: 'Week 1', Chess: 1150, React: 10, Guitar: 5 },
    { name: 'Week 2', Chess: 1160, React: 25, Guitar: 10 },
    { name: 'Week 3', Chess: 1180, React: 50, Guitar: 15 },
    { name: 'Week 4', Chess: 1200, React: 70, Guitar: 20 },
];

export const progressChartConfig = {
    '7K Life': { label: '7K Life', color: 'hsl(var(--chart-1))' },
    'Stan AI': { label: 'Stan AI', color: 'hsl(var(--chart-2))' },
    '7K Studio': { label: '7K Studio', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

export const skillChartConfig = {
    Chess: { label: 'Chess', color: 'hsl(var(--chart-1))' },
    React: { label: 'React', color: 'hsl(var(--chart-2))' },
    Guitar: { label: 'Guitar', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;
