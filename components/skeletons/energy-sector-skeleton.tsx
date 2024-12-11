'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function EnergySectorSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex aspect-square max-h-[350px] w-full justify-center">
        <div className="flex size-full items-center justify-center">
          <Skeleton className="size-60 rounded-full" />
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-[60px]" />
        ))}
      </div>
    </div>
  );
}
