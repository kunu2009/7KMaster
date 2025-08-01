
"use client";

import { useState } from 'react';
import { HscDashboard } from './pages/dashboard';
import { EnglishPage } from './pages/english-page';
import { SanskritPage } from './pages/sanskrit-page';
import { HindiPage } from './pages/hindi-page';
import { EconomicsPage } from './pages/economics-page';
import { PoliticalSciencePage } from './pages/political-science-page';
import { ProseChapterView } from './pages/prose-chapter-view';
import { PoetryChapterView } from './pages/poetry-chapter-view';
import type { HscProseChapter, HscPoetryChapter } from '@/lib/types';

interface HscAppProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

export function HscApp({ activePage, setActivePage }: HscAppProps) {
  const [selectedProseChapter, setSelectedProseChapter] = useState<HscProseChapter | null>(null);
  const [selectedPoetryChapter, setSelectedPoetryChapter] = useState<HscPoetryChapter | null>(null);

  const handleSelectProseChapter = (chapter: HscProseChapter) => {
    setSelectedProseChapter(chapter);
    setActivePage('prose-chapter');
  };
  
  const handleSelectPoetryChapter = (poem: HscPoetryChapter) => {
    setSelectedPoetryChapter(poem);
    setActivePage('poetry-chapter');
  };

  const handleBackToEnglish = () => {
    setSelectedProseChapter(null);
    setSelectedPoetryChapter(null);
    setActivePage('english');
  };


  const renderContent = () => {
    switch (activePage) {
        case 'dashboard':
            return <HscDashboard setActivePage={setActivePage} />;
        case 'english':
            return <EnglishPage onSelectProseChapter={handleSelectProseChapter} onSelectPoetryChapter={handleSelectPoetryChapter} />;
        case 'sanskrit':
            return <SanskritPage />;
        case 'hindi':
            return <HindiPage />;
        case 'economics':
            return <EconomicsPage />;
        case 'political-science':
            return <PoliticalSciencePage />;
        case 'prose-chapter':
            if (selectedProseChapter) {
                return <ProseChapterView chapter={selectedProseChapter} onBack={handleBackToEnglish} />;
            }
            return <EnglishPage onSelectProseChapter={handleSelectProseChapter} onSelectPoetryChapter={handleSelectPoetryChapter} />;
        case 'poetry-chapter':
            if (selectedPoetryChapter) {
                return <PoetryChapterView poem={selectedPoetryChapter} onBack={handleBackToEnglish} />;
            }
            return <EnglishPage onSelectProseChapter={handleSelectProseChapter} onSelectPoetryChapter={handleSelectPoetryChapter} />;
        default:
             return <HscDashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="h-full w-full rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex-1 flex flex-col">
         <main className="flex-1 overflow-auto p-4 sm:p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
