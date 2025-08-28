
"use client";

import { useState, useMemo, useEffect } from "react";
import type { Project, ProjectStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewProjectDialog } from "./new-project-dialog";
import { ProjectDetail } from "./project-detail";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { EmptyState } from "./empty-state";
import { useAuth } from "@/context/auth-context";
import { collection, addDoc, onSnapshot, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialProjects } from "@/lib/data";


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
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [localProjects, setLocalProjects] = useLocalStorage<Project[]>('projects_guest', initialProjects);
  const [firestoreProjects, setFirestoreProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [sortBy, setSortBy] = useLocalStorage<SortOption>('projectSortOrder', 'lastWorked');
  
  const projects = user ? firestoreProjects : localProjects;
  const setProjects = user ? setFirestoreProjects : setLocalProjects;


  useEffect(() => {
    if (!user) {
        setIsLoading(false);
        return;
    };
    
    setIsLoading(true);
    const q = query(collection(db, "projects"), where("userId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userProjects: Project[] = [];
        querySnapshot.forEach((doc) => {
            userProjects.push({ id: doc.id, ...doc.data() } as Project);
        });
        setFirestoreProjects(userProjects);
        setIsLoading(false);
    }, (error) => {
        console.error("Error fetching projects: ", error);
        toast({ title: "Error", description: "Could not fetch your projects.", variant: "destructive"});
        setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [user, toast]);

  const addProject = async (newProject: Omit<Project, 'id' | 'lastWorked' | 'attachments' | 'userId'>) => {
    const fullProject: Omit<Project, 'id' | 'userId'> = {
      ...newProject,
      lastWorked: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      todos: [],
      workLog: [],
      attachments: [],
    };

    if (!user) {
        const projectWithId = { ...fullProject, id: `${Date.now()}` };
        setLocalProjects(prev => [...prev, projectWithId]);
        onSelectProject(projectWithId);
        toast({ title: "Project Added (Guest Mode)", description: `"${fullProject.name}" has been created.`});
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "projects"), { ...fullProject, userId: user.uid });
        const newProjectWithId = { ...fullProject, id: docRef.id, userId: user.uid };
        onSelectProject(newProjectWithId);
        toast({ title: "Project Added", description: `"${fullProject.name}" has been created.`});
    } catch(e) {
        console.error("Error adding document: ", e);
        toast({ title: "Error", description: "Could not save your new project.", variant: "destructive" });
    }
  }

  const handleUpdateProject = async (updatedProject: Project) => {
    if (!user) {
        setLocalProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
        onSelectProject(updatedProject);
        return;
    }
    const { id, ...projectData } = updatedProject;
     try {
        await updateDoc(doc(db, "projects", id), projectData);
        onSelectProject(updatedProject);
     } catch (e) {
        console.error("Error updating document: ", e);
        toast({ title: "Error", description: "Could not update the project.", variant: "destructive" });
     }
  };
  
  const handleDeleteProject = async (projectId: string) => {
     if (!user) {
        setLocalProjects(prev => prev.filter(p => p.id !== projectId));
        onSelectProject(null);
        toast({ title: "Project Deleted (Guest Mode)" });
        return;
     }
     try {
        await deleteDoc(doc(db, "projects", projectId));
        onSelectProject(null);
        toast({
            title: "Project Deleted",
            description: "The project has been successfully removed.",
        });
     } catch (e) {
        console.error("Error deleting document: ", e);
        toast({ title: "Error", description: "Could not delete the project.", variant: "destructive" });
     }
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
        {isLoading && user ? (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : sortedProjects.length === 0 ? (
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
