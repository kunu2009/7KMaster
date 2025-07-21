export type TodayTask = { id: string; timeBlock: string; task: string; done: boolean };

export type ProjectStatus = 'In Progress' | 'Not Started' | 'Concept' | 'Completed';
export type Project = { id: string; name: string; status: ProjectStatus; lastWorked: string; nextAction: string };

export type Skill = { id: string; area: string; level: string; weeklyGoal: string; progress: number; maxProgress: number };

export type SelfSpaceItem = { id: string; area: string; status: string; goal: string };

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  )
}
