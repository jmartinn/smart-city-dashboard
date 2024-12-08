'use client';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { energySchema } from '@/schemas/consumption';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const data = energySchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigator.clipboard.writeText(data.id.toString())}
        >
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* TODO: Handle 'View details' route / page*/}
        <DropdownMenuItem className="cursor-pointer">
          View details
        </DropdownMenuItem>
        {/* NOTE: This can be deleted later as we don't plan to interact with the data*/}
        <DropdownMenuItem className="cursor-pointer">
          Edit data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
