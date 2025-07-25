
"use client";

import { ItihasDashboard } from './pages/dashboard';
import { ItihasEras } from './pages/eras';
import { ItihasFigures } from './pages/figures';
import { ItihasEvents } from './pages/events';
import { ItihasMaps } from './pages/maps';
import { ItihasQuiz } from './pages/quiz';

interface ItihasAppProps {
    activePage: string;
}

export function ItihasApp({ activePage }: ItihasAppProps) {
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <ItihasDashboard />;
      case 'eras': return <ItihasEras />;
      case 'figures': return <ItihasFigures />;
      case 'events': return <ItihasEvents />;
      case 'maps': return <ItihasMaps />;
      case 'quiz': return <ItihasQuiz />;
      default: return <ItihasDashboard />;
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
