
"use client";

import { useState } from 'react';
import { ItihasDashboard } from './pages/dashboard';
import { ItihasChapterView } from './pages/chapter-view';
import type { ItihasChapter } from '@/lib/types';

interface ItihasAppProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

export function ItihasApp({ activePage, setActivePage }: ItihasAppProps) {
  const [selectedChapter, setSelectedChapter] = useState<ItihasChapter | null>(null);

  const handleSelectChapter = (chapter: ItihasChapter) => {
    setSelectedChapter(chapter);
    setActivePage('chapter');
  };
  
  const handleBackToDashboard = () => {
    setSelectedChapter(null);
    setActivePage('dashboard');
  }

  const renderContent = () => {
    if (activePage === 'chapter' && selectedChapter) {
        return <ItihasChapterView chapter={selectedChapter} />;
    }
    return <ItihasDashboard onSelectChapter={handleSelectChapter} />;
  };

  return (
    <div className="h-full w-full rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex-1 flex flex-col">
         <main className="flex-1 overflow-auto p-4 sm:p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
