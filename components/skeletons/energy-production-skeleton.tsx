'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function EnergyProductionSkeleton() {
  return (
    <div className="h-[300px] pl-2 sm:h-[386px]">
      <Skeleton className="size-full" />
    </div>
  );
}
