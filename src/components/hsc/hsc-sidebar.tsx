
"use client";

import {
  Landmark,
  LayoutDashboard,
  ArrowLeft,
  BookCopy,
  ChevronsRight,
  Languages,
  BookText,
  TrendingUp,
  Vote,
  Newspaper,
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
  { href: 'english', label: 'English', icon: BookText },
  { href: 'sanskrit', label: 'Sanskrit', icon: Languages },
  { href: 'hindi', label: 'Hindi', icon: Languages },
  { href: 'economics', label: 'Economics', icon: TrendingUp },
  { href: 'political-science', label: 'Political Science', icon: Vote },
];

interface HscSidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
    onBack: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function HscSidebar({ activePage, setActivePage, onBack, isOpen, setIsOpen }: HscSidebarProps) {

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
    <aside className={`fixed inset-y-0 right-0 z-10 flex flex-col border-l bg-background transition-all duration-300 ${isOpen ? 'w-14' : 'w-0 overflow-hidden'}`}>
        <div className={`flex h-14 items-center justify-center border-b transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
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
          <nav className={`flex flex-col items-center gap-4 px-2 py-5 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {menuItems.map(item => <NavLink key={item.href} item={item} />)}
            <div className="my-2 h-px w-full bg-border" />
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePage === 'prose-chapter' ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-lg"
                    aria-label="Current Chapter"
                    disabled={activePage !== 'prose-chapter'}
                  >
                    <Newspaper className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" sideOffset={5}>
                  Chapter View
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </ScrollArea>
        <div className={`flex flex-col items-center gap-4 px-2 py-5 border-t mt-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Toggle Sidebar"
                onClick={() => setIsOpen(!isOpen)}
            >
                <ChevronsRight className="size-5" />
            </Button>
        </div>
    </aside>
  );
}
