





export type TimeBlock = { id: string; name: string; userId?: string; };

export type TodayTask = { id: string; timeBlock: string; task: string; done: boolean; userId?: string; };

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
    description: string;
    status: ProjectStatus;
    lastWorked: string;
    nextAction: string;
    todos: Todo[];
    workLog: WorkLogEntry[];
    attachments: Attachment[];
    userId?: string;
};

export type Skill = { id: string; area: string; level: string; weeklyGoal: string; progress: number; maxProgress: number; userId?: string; };

export type SelfSpaceItem = { id: string; area: string; status: string; goal: string; imageUrl?: string | null; userId?: string; };

export type ResearchType = 'Tool' | 'Website' | 'Article' | 'Video' | 'Course';

export type ResearchItem = {
    id: string;
    name: string;
    type: ResearchType;
    url: string;
    description: string;
    attachment: string | null;
    todos: Todo[];
    userId?: string;
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
  userId?: string;
};

export type Habit = {
    id: string;
    name: string;
    icon: string;
    frequency: 'daily';
    goal: number; // e.g., 7 times a week for a daily habit
    userId?: string;
};

// HabitLog will have a document per habit, containing the log data.
export type HabitLog = {
    habitId: string;
    userId: string;
    dates: string[]; // ['2024-07-28', '2024-07-29']
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
  title: string;
  scenario: string;
  playerRole: string;
}

export type VisualLawItem = {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    aiHint: string;
};


export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  )
}

// 7K Itihas Types
export interface ItihasChapter {
  id: number;
  title: string;
  description: string;
  summary: string;
  mcqs: MCQ[];
  flashcards: LawFlashcard[];
  reels: Reel[];
}

// 7K HSC Types
export interface HscProseChapter {
    id: number;
    title: string;
    author: string;
    contentAvailable: boolean;
    summaries: {
        short: string;
        detailed: string;
    };
    characters: {
        name: string;
        sketch: string;
    }[];
    theme: string;
    glossary: {
        word: string;
        meaning: string;
    }[];
    lineByLineExplanation?: string;
    qa?: {
        seenPassages: {
            passage: string;
            questions: { question: string; answer: string; }[];
        }[];
        shortQuestions: { question: string; answer: string; }[];
        longQuestions: { question: string; answer: string; }[];
        grammarQuestions: { question: string; answer: string; }[];
    };
}

export interface HscPoetryChapter {
    id: number;
    title: string;
    author: string;
    contentAvailable: boolean;
    poemText: string[]; // Array of strings, each for a line or stanza
    summaries: {
        overall: string;
        stanzaWise: string;
    };
    centralIdea: string;
    figuresOfSpeech: {
        name: string;
        line: string;
        explanation: string;
    }[];
    poeticDevices: {
        rhymeScheme: string;
        alliteration?: string;
        repetition?: string;
    };
    appreciation: string;
}


export type Era = {
  id: string;
  name: string;
  period: string;
  description: string;
  imageUrl: string;
  aiHint: string;
};

export type HistoricalFigure = {
  id: string;
  name: string;
  era: string;
  description: string;
  imageUrl: string;
  aiHint: string;
};

export type HistoricalEvent = {
  id: string;
  name: string;
  era: string;
  date: string;
  description: string;
  imageUrl: string;
  aiHint: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  era: string;
};
