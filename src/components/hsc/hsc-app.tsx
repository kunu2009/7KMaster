
"use client";

import { useState } from 'react';
import { HscDashboard } from './pages/dashboard';
import { EnglishPage } from './pages/english-page';
import { SanskritPage } from './pages/sanskrit-page';
import { HindiPage } from './pages/hindi-page';
import { EconomicsPage } from './pages/economics-page';
import { PoliticalSciencePage } from './pages/political-science-page';

interface HscAppProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

export function HscApp({ activePage, setActivePage }: HscAppProps) {

  const renderContent = () => {
    switch (activePage) {
        case 'dashboard':
            return <HscDashboard setActivePage={setActivePage} />;
        case 'english':
            return <EnglishPage />;
        case 'sanskrit':
            return <SanskritPage />;
        case 'hindi':
            return <HindiPage />;
        case 'economics':
            return <EconomicsPage />;
        case 'political-science':
            return <PoliticalSciencePage />;
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
