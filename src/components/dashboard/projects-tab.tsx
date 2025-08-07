
"use client";

import { useState, useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialProjects } from "@/lib/data";
import type { Project, ProjectStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewProjectDialog } from "./new-project-dialog";
import { ProjectDetail } from "./project-detail";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { EmptyState } from "./empty-state";


const statusColors: Record<ProjectStatus, string> = {
  "In Progress": "bg-blue-500/20 text-blue-500 border-blue-500/30",
  "Not Started": "bg-gray-500/20 text-gray-500 border-gray-500/30",
  "Concept": "bg-purple-500/20 text-purple-500 border-purple-500/30",
  "Completed": "bg-green-500/20 text-green-500 border-green-500/30",
};

type SortOption = 'lastWorked' | 'name_asc' | 'name_desc' | 'status';

interface ProjectsTabProps {
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
}

export function ProjectsTab({ selectedProject, onSelectProject }: ProjectsTabProps) {
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "projects",
    initialProjects
  );
  const { toast } = useToast();
  const [sortBy, setSortBy] = useLocalStorage<SortOption>('projectSortOrder', 'lastWorked');

  const addProject = (newProject: Omit<Project, 'id' | 'lastWorked'>) => {
    const fullProject = {
      ...newProject,
      id: `${Date.now()}`,
      lastWorked: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      todos: [],
      workLog: [],
      attachments: [],
    };
    setProjects(prev => [...prev, fullProject]);
    onSelectProject(fullProject); // Automatically open the new project
  }

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prevProjects => prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p));
    onSelectProject(updatedProject);
  };
  
  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    onSelectProject(null);
    toast({
        title: "Project Deleted",
        description: "The project has been successfully removed.",
    });
  }

  const handleBackToList = () => {
    onSelectProject(null);
  }
  
  const sortedProjects = useMemo(() => {
    const sortableProjects = [...projects];
    switch (sortBy) {
        case 'lastWorked':
            return sortableProjects.sort((a, b) => {
                const dateA = new Date(`${a.lastWorked}, ${new Date().getFullYear()}`).getTime();
                const dateB = new Date(`${b.lastWorked}, ${new Date().getFullYear()}`).getTime();
                if (isNaN(dateA) || isNaN(dateB)) return 0;
                return dateB - dateA; // Newest first
            });
        case 'name_asc':
            return sortableProjects.sort((a, b) => a.name.localeCompare(b.name));
        case 'name_desc':
            return sortableProjects.sort((a, b) => b.name.localeCompare(a.name));
        case 'status':
            const statusOrder: ProjectStatus[] = ['In Progress', 'Not Started', 'Concept', 'Completed'];
            return sortableProjects.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
        default:
            return sortableProjects;
    }
  }, [projects, sortBy]);


  if (selectedProject) {
    // Find the latest version of the project from the list to pass down
    const currentProject = projects.find(p => p.id === selectedProject.id);
    if (!currentProject) {
        // This can happen if the project was deleted from another tab/window
        handleBackToList();
        return null;
    }
    return <ProjectDetail 
              project={currentProject} 
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
            <CardTitle>Projects (7K Life)</CardTitle>
            <CardDescription>
              Tracking progress on your suite of applications. Click a project to see details.
            </CardDescription>
          </div>
           <div className="flex items-center gap-2">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <DropdownMenuRadioItem value="lastWorked">Last Worked (Newest)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name_asc">Name (A-Z)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name_desc">Name (Z-A)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <NewProjectDialog onAddProject={addProject} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sortedProjects.length === 0 ? (
          <EmptyState 
            title="No Projects Yet"
            subtitle="Start your next big thing by adding a new project."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
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
                    <Button onClick={() => onSelectProject(project)} className="w-full" variant="outline">View Details</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
