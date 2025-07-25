
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { mcqs, lawNotes } from '@/lib/law-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function LawSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Debounce delay of 300ms

    // Cleanup function to cancel the timeout if the user keeps typing
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return { mcqs: [], notes: [] };
    }

    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();

    const filteredMcqs = mcqs.filter(
      (mcq) =>
        mcq.question.toLowerCase().includes(lowerCaseSearchTerm) ||
        mcq.explanation.toLowerCase().includes(lowerCaseSearchTerm) ||
        mcq.options.some(opt => opt.toLowerCase().includes(lowerCaseSearchTerm))
    );

    const filteredNotes = lawNotes.filter((note) =>
      note.content.toLowerCase().includes(lowerCaseSearchTerm) ||
      note.topic.toLowerCase().includes(lowerCaseSearchTerm)
    );

    return { mcqs: filteredMcqs, notes: filteredNotes };
  }, [debouncedSearchTerm]);

  const hasResults = searchResults.mcqs.length > 0 || searchResults.notes.length > 0;
  const showResults = debouncedSearchTerm.trim() !== '';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Search Content</h1>
        <p className="text-muted-foreground">Find MCQs and notes by keyword.</p>
      </div>
      <div className="max-w-xl">
        <Input
          type="search"
          placeholder="Search for keywords like 'Constitution', 'defamation'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showResults && (
         <div className="space-y-6">
          {hasResults ? (
            <>
              {searchResults.notes.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Matching Notes</h2>
                  <div className="space-y-4">
                    {searchResults.notes.map(note => (
                         <Card key={note.topic} className="hover:border-primary transition-colors">
                           <CardHeader>
                             <CardTitle className="flex items-center justify-between">
                               {note.topic}
                               <Badge variant="secondary">Note</Badge>
                             </CardTitle>
                           </CardHeader>
                           <CardContent>
                             <p className="text-muted-foreground line-clamp-2">{note.content}</p>
                           </CardContent>
                         </Card>
                    ))}
                  </div>
                </section>
              )}
               {searchResults.mcqs.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Matching MCQs</h2>
                  <div className="space-y-4">
                    {searchResults.mcqs.map(mcq => (
                         <Card key={mcq.id} className="hover:border-primary transition-colors">
                           <CardHeader>
                             <CardTitle className="flex items-center justify-between text-base">
                               {mcq.question}
                               <Badge variant="secondary">MCQ</Badge>
                             </CardTitle>
                           </CardHeader>
                         </Card>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-center py-8">No results found for "{debouncedSearchTerm}".</p>
          )}
        </div>
      )}
    </div>
  );
}
