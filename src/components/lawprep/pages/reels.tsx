
import { reels } from '@/lib/law-data';
import { ReelCard } from '@/components/lawprep/reel-card';

export function LawReels() {
  return (
    <div className="h-full flex flex-col">
       <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">Legal Reels</h1>
        <p className="text-muted-foreground">
          Scroll through quick, memorable legal facts and concepts.
        </p>
      </div>
      <div className="flex-1 -m-4 sm:-m-6">
        <div className="h-[calc(100vh-15rem)] w-full overflow-y-auto snap-y snap-mandatory rounded-lg bg-muted/20">
            {reels.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
            ))}
        </div>
      </div>
    </div>
  );
}
