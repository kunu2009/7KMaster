
"use client";

import {
  Landmark,
  LayoutDashboard,
  ArrowLeft,
  BookCopy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
  { href: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

interface ItihasSidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
    onBack: () => void;
}

export function ItihasSidebar({ activePage, setActivePage, onBack }: ItihasSidebarProps) {

  const NavLink = ({ item }: { item: typeof menuItems[0] }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={activePage === item.href ? "secondary" : "ghost"}
            size="icon"
            className="rounded-lg"
            aria-label={item.label}
            onClick={() => setActivePage(item.href)}
          >
            <item.icon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={5}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <aside className="fixed inset-y-0 right-0 z-10 flex w-14 flex-col border-l bg-background">
        <div className="flex h-14 items-center justify-center border-b">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Back to Dashboard"
                    onClick={onBack}
                  >
                    <ArrowLeft className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" sideOffset={5}>
                    Back to Main App
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col items-center gap-4 px-2 py-5">
            {menuItems.map(item => <NavLink key={item.href} item={item} />)}
            <div className="my-2 h-px w-full bg-border" />
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePage === 'chapter' ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-lg"
                    aria-label="Current Chapter"
                    disabled={activePage !== 'chapter'}
                  >
                    <BookCopy className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" sideOffset={5}>
                  Chapter View
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </ScrollArea>
    </aside>
  );
}
