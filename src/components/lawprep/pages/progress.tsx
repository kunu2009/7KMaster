
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function LawProgress() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Progress Tracker</h1>
        <p className="text-muted-foreground">Visualize your performance and identify areas for improvement.</p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>A dedicated progress tracker for your law prep is on its way!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Progress chart and stats will be here.</p>
          </div>
        </CardContent>
       </Card>
    </div>
  );
}
