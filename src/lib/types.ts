

export type TodayTask = { id: string; timeBlock: string; task: string; done: boolean };

export type AggregatedTodo = {
    id: string;
    text: string;
    source: string; // e.g., 'Daily Plan' or Project Name
    completed: boolean;
};

export enum ProjectStatus {
    InProgress = 'In Progress',
    NotStarted = 'Not Started',
    Concept = 'Concept',
    Completed = 'Completed'
};

export type Todo = { id: string; text: string; completed: boolean };
export type WorkLogEntry = { id: string; date: string; description: string };
export type Attachment = { id: string; name: string; url: string; };

export type Project = {
    id: string;
    name: string;
    status: ProjectStatus;
    lastWorked: string;
    nextAction: string;
    todos: Todo[];
    workLog: WorkLogEntry[];
    attachments: Attachment[];
};

export type Skill = { id: string; area: string; level: string; weeklyGoal: string; progress: number; maxProgress: number };

export type SelfSpaceItem = { id: string; area: string; status: string; goal: string; imageUrl?: string };

export type ResearchType = 'Tool' | 'Website' | 'Article' | 'Video' | 'Course';

export type ResearchItem = {
    id: string;
    name: string;
    type: ResearchType;
    url: string;
    description: string;
    attachment?: string;
};

export type NoteBlock = {
  id: string;
  type: 'paragraph' | 'todo';
  content: string;
  checked?: boolean; // Only for 'todo' type
};

export type Note = {
  id: string;
  title: string;
  content: NoteBlock[];
  createdAt: string;
  modifiedAt: string;
};

export type LawNote = {
  topic: string;
  category: 'Constitution' | 'Legal Aptitude' | 'Legal Maxims' | 'General Knowledge' | 'English' | 'Current Affairs' | 'Logical Reasoning';
  content: string;
  links: { title: string; url: string }[];
};

export type LawFlashcard = {
  id: string;
  term: string;
  definition: string;
  topic: string;
};

export type CareerPath = {
  id: string;
  title: string;
  description: string;
  steps: {
    title: string;
    content: string;
  }[];
};

export type MCQ = {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
};

export interface StudyEvent {
  date: Date;
  title: string;
  description: string;
}

export interface ProgressState {
  attempted: number;
  correct: number;
  history: { [mcqId: string]: 'correct' | 'incorrect' };
}

export interface Reel {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface CaseSimulation {
  id: string;
  scenario: string;
  playerRole: string;
}


export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  )
}
