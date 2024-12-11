'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { TEnergyWeeklyData } from '@/lib/schemas/energy';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<TEnergyWeeklyData>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    enableSorting: true, // NOTE: This might be tricky to sort.
    enableHiding: false,
  },
  {
    accessorKey: 'consumption',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Consumption" />
    ),
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('consumption')} kWh</div>,
  },
  {
    accessorKey: 'production',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Production" />
    ),
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => <div>{row.getValue('production')} kWh</div>,
  },
  {
    accessorKey: 'emissions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emissions" />
    ),
    enableSorting: true,
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        {row.getValue('emissions')} kg CO<sub>2</sub>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
