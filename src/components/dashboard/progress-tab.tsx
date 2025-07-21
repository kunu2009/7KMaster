"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Rocket, Trophy, Archive } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  initialTodayTasks,
  progressChartData,
  progressChartConfig,
  skillProgressData,
  skillChartConfig,
} from "@/lib/data";
import type { TodayTask } from "@/lib/types";

export function ProgressTab() {
  const [tasks] = useLocalStorage<TodayTask[]>(
    "todayTasks",
    initialTodayTasks
  );

  const completedTasks = tasks.filter((task) => task.done);

  const handleExport = () => {
    try {
      const data = {
        todayTasks: JSON.parse(localStorage.getItem('todayTasks') || '[]'),
        projects: JSON.parse(localStorage.getItem('projects') || '[]'),
        skills: JSON.parse(localStorage.getItem('skills') || '[]'),
        selfSpace: JSON.parse(localStorage.getItem('selfSpace') || '[]'),
      };
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 2)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "7k-master-dashboard-backup.json";
      link.click();
    } catch (error) {
      console.error("Failed to export data", error);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Time Spent Per App (Weekly)</CardTitle>
          <CardDescription>Mock data showing hours logged.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={progressChartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={progressChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
               <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="7K Life" fill="var(--color-7K Life)" radius={4} />
              <Bar dataKey="Stan AI" fill="var(--color-Stan AI)" radius={4} />
              <Bar dataKey="7K Studio" fill="var(--color-7K Studio)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Progress (Weekly)</CardTitle>
          <CardDescription>Mock data showing skill rating changes.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={skillChartConfig} className="h-[250px] w-full">
            <LineChart accessibilityLayer data={skillProgressData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="Chess" stroke="var(--color-Chess)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="React" stroke="var(--color-React)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Guitar" stroke="var(--color-Guitar)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Routine Streak</CardTitle>
                <Rocket className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5 Days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                <Trophy className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{completedTasks.length} This Cycle</div>
                <p className="text-xs text-muted-foreground">Total from current task list</p>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Data &amp; Backups</CardTitle>
          <CardDescription>Manage your application data.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <h3 className="font-medium">Export Progress</h3>
                    <p className="text-sm text-muted-foreground">Download all your data as a JSON file.</p>
                </div>
                <Button onClick={handleExport} size="sm">
                    <Download className="mr-2 h-4 w-4" /> Export
                </Button>
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <h3 className="font-medium">Completed Task Archive</h3>
                    <p className="text-sm text-muted-foreground">View all your completed tasks.</p>
                </div>
                <Button size="sm" variant="outline" disabled>
                    <Archive className="mr-2 h-4 w-4" /> View Archive
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
