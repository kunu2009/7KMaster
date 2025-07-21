import { TodayTab } from "@/components/dashboard/today-tab";
import { ProjectsTab } from "@/components/dashboard/projects-tab";
import { SkillsTab } from "@/components/dashboard/skills-tab";
import { SelfSpaceTab } from "@/components/dashboard/self-space-tab";
import { ProgressTab } from "@/components/dashboard/progress-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { ListTodo, GanttChartSquare, BrainCircuit, Smile, LineChart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
        <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M4 18.5A2.5 2.5 0 0 1 6.5 21a2.5 2.5 0 0 1 0-5 .5.5 0 0 1 .5.5V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 .5-.5 2.5 2.5 0 1 1 0-5 .5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6.5a.5.5 0 0 1 .5-.5 2.5 2.5 0 0 1 5 0 .5.5 0 0 1 .5.5V8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3.5A2.5 2.5 0 0 0 17.5 1 2.5 2.5 0 0 0 15 3.5a.5.5 0 0 1-.5.5H13a1 1 0 0 0-1 1v2.5a.5.5 0 0 1-.5.5 2.5 2.5 0 1 0 0 5 .5.5 0 0 1-.5-.5V12a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2.5a.5.5 0 0 1-.5.5A2.5 2.5 0 0 1 4 18.5Z"/>
            </svg>
            <h1 className="text-xl font-semibold md:text-2xl">7K Master Dashboard</h1>
        </div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-8">
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto">
            <TabsTrigger value="today"><ListTodo className="mr-2 h-4 w-4" />Today</TabsTrigger>
            <TabsTrigger value="projects"><GanttChartSquare className="mr-2 h-4 w-4" />Projects</TabsTrigger>
            <TabsTrigger value="skills"><BrainCircuit className="mr-2 h-4 w-4" />Skills</TabsTrigger>
            <TabsTrigger value="self-space"><Smile className="mr-2 h-4 w-4" />Self & Space</TabsTrigger>
            <TabsTrigger value="progress"><LineChart className="mr-2 h-4 w-4" />Progress</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mt-4">
            <TodayTab />
          </TabsContent>
          <TabsContent value="projects" className="mt-4">
            <ProjectsTab />
          </TabsContent>
          <TabsContent value="skills" className="mt-4">
            <SkillsTab />
          </TabsContent>
          <TabsContent value="self-space" className="mt-4">
            <SelfSpaceTab />
          </TabsContent>
          <TabsContent value="progress" className="mt-4">
            <ProgressTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
