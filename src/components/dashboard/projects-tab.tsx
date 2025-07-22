
"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialProjects } from "@/lib/data";
import type { Project, ProjectStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewProjectDialog } from "./new-project-dialog";
import { ProjectDetail } from "./project-detail";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

const statusColors: Record<ProjectStatus, string> = {
  "In Progress": "bg-blue-500/20 text-blue-500 border-blue-500/30",
  "Not Started": "bg-gray-500/20 text-gray-500 border-gray-500/30",
  "Concept": "bg-purple-500/20 text-purple-500 border-purple-500/30",
  "Completed": "bg-green-500/20 text-green-500 border-green-500/30",
};

export function ProjectsTab() {
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "projects",
    initialProjects
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const addProject = (newProject: Omit<Project, 'id' | 'lastWorked'>) => {
    setProjects(prev => [...prev, {
      ...newProject,
      id: `${Date.now()}`,
      lastWorked: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      todos: [],
      workLog: [],
    }]);
  }

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prevProjects => prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p));
    setSelectedProject(updatedProject);
  };
  
  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setSelectedProject(null);
    toast({
        title: "Project Deleted",
        description: "The project has been successfully removed.",
    });
  }

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  }

  const handleBackToList = () => {
    setSelectedProject(null);
  }

  if (selectedProject) {
    return <ProjectDetail 
              project={selectedProject} 
              onUpdateProject={handleUpdateProject} 
              onDeleteProject={handleDeleteProject}
              onBack={handleBackToList} 
            />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Projects (7K Ecosystem)</CardTitle>
            <CardDescription>
              Tracking progress on your suite of applications. Click a project to see details.
            </CardDescription>
          </div>
          <NewProjectDialog onAddProject={addProject} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant="outline" className={`${statusColors[project.status]} whitespace-nowrap`}>
                        {project.status}
                    </Badge>
                </div>
                 <CardDescription>Last worked: {project.lastWorked}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <p className="text-sm font-medium">Next Action:</p>
                 <p className="text-sm text-muted-foreground">{project.nextAction}</p>
              </CardContent>
              <CardFooter>
                 <Button onClick={() => handleSelectProject(project)} className="w-full" variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
