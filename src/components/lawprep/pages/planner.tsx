
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { studyEvents } from "@/lib/law-data";
import { format } from 'date-fns';

export function LawPlanner() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const eventDates = studyEvents.map(event => event.date);

  const eventsForSelectedDay = studyEvents.filter(
    event => selectedDate && format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Study Planner</h1>
        <p className="text-muted-foreground">Organize your study schedule and set reminders.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[400px_1fr]">
        <Card className="flex flex-col">
           <CardHeader>
            <CardTitle>Your Calendar</CardTitle>
            <CardDescription>Select a date to see its events.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center flex-1 items-center">
             <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{ scheduled: eventDates }}
                modifiersClassNames={{ scheduled: 'bg-primary/20 rounded-full' }}
                className="rounded-md border"
             />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? `Events for ${format(selectedDate, 'PPP')}` : 'Upcoming Events'}
            </CardTitle>
            <CardDescription>Your study sessions for the selected day.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventsForSelectedDay.length > 0 ? (
                eventsForSelectedDay.map((event, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg">
                     <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-md p-2 w-16">
                      <span className="font-bold text-xl">{format(event.date, 'dd')}</span>
                      <span className="text-xs font-medium uppercase">{format(event.date, 'MMM')}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full min-h-[200px] text-center text-muted-foreground">
                  <p>
                    {selectedDate ? "No events scheduled for this day." : "Select a date to see events."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
