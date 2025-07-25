
import { TodayTab } from "@/components/dashboard/today-tab";
import { ProjectsTab } from "@/components/dashboard/projects-tab";
import { SkillsTab } from "@/components/dashboard/skills-tab";
import { JournalTab } from "@/components/dashboard/journal-tab";
import { WebLinksTab } from "@/components/dashboard/web-links-tab";
import { UtilitiesTab } from "@/components/dashboard/utilities-tab";
import { AssistantTab } from "@/components/dashboard/assistant-tab";
import { StudyTab } from "@/components/dashboard/study-tab";
import { PromptsTab } from "@/components/dashboard/prompts-tab";
import { AppsTab } from "@/components/dashboard/apps-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { ListTodo, GanttChartSquare, BrainCircuit, Bot, Book, Sparkles, AppWindow, Link, Wrench } from "lucide-react";

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
          <TabsContent value="study">
            <StudyTab />
          </TabsContent>
          <TabsContent value="prompts">
            <PromptsTab />
          </TabsContent>
           <TabsContent value="apps">
            <AppsTab />
          </TabsContent>
          <TabsContent value="assistant">
            <AssistantTab />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsTab />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsTab />
          </TabsContent>
          <TabsContent value="web-links">
            <WebLinksTab />
          </TabsContent>
          <TabsContent value="utilities">
            <UtilitiesTab />
          </TabsContent>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <TabsList className="grid h-auto w-full grid-cols-9 rounded-none bg-transparent p-0">
            <TabsTrigger value="today" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <ListTodo className="h-5 w-5" />
                <span className="hidden sm:inline">Today</span>
            </TabsTrigger>
            <TabsTrigger value="study" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <Book className="h-5 w-5" />
                <span className="hidden sm:inline">Study</span>
            </TabsTrigger>
            <TabsTrigger value="prompts" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <Sparkles className="h-5 w-5" />
                <span className="hidden sm:inline">Prompts</span>
            </TabsTrigger>
            <TabsTrigger value="apps" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <AppWindow className="h-5 w-5" />
                <span className="hidden sm:inline">Apps</span>
            </TabsTrigger>
             <TabsTrigger value="assistant" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <Bot className="h-5 w-5" />
                <span className="hidden sm:inline">Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <GanttChartSquare className="h-5 w-5" />
                <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <BrainCircuit className="h-5 w-5" />
                <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="web-links" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <Link className="h-5 w-5" />
                <span className="hidden sm:inline">Links</span>
            </TabsTrigger>
            <TabsTrigger value="utilities" className="flex-col h-16 text-xs gap-1 rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10">
                <Wrench className="h-5 w-5" />
                <span className="hidden sm:inline">Utilities</span>
            </TabsTrigger>
        </TabsList>
      </footer>
    </Tabs>
  );
}
