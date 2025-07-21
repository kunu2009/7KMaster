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
    <Tabs defaultValue="today" className="flex min-h-screen w-full flex-col">
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
            <h1 className="text-lg font-semibold md:text-xl">7K Dashboard</h1>
        </div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 mb-20">
          <TabsContent value="today">
            <TodayTab />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsTab />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsTab />
          </TabsContent>
          <TabsContent value="self-space">
            <SelfSpaceTab />
          </TabsContent>
          <TabsContent value="progress">
            <ProgressTab />
          </TabsContent>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <TabsList className="grid h-auto w-full grid-cols-5 rounded-none bg-transparent p-0">
            <TabsTrigger value="today" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <ListTodo className="h-5 w-5" />
                <span className="hidden sm:inline">Today</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <GanttChartSquare className="h-5 w-5" />
                <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <BrainCircuit className="h-5 w-5" />
                <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="self-space" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <Smile className="h-5 w-5" />
                <span className="hidden sm:inline">Self & Space</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <LineChart className="h-5 w-5" />
                <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
        </TabsList>
      </footer>
    </Tabs>
  );
}
