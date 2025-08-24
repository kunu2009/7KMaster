


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

export const initialProjects: Project[] = [];

export const initialSkills: Skill[] = [];

export const initialSelfSpace: SelfSpaceItem[] = [];

export const initialResearchItems: ResearchItem[] = [];

export const initialNotes: Note[] = [];

export const initialHabits: Habit[] = [];

export const initialHabitLogs: Record<string, string[]> = {};

export const initialJournalEntry = "";
export const initialFocusThing = "";
