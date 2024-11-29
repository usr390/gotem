import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Case } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface CaseListProps {
  cases: Case[];
  onSelectCase: (caseItem: Case) => void;
  selectedCaseId?: string;
}

const statusColors = {
  submitted: 'bg-gray-500 text-white',
  review: 'bg-yellow-500 text-black',
  approved: 'bg-green-500 text-white',
  dropped: 'bg-red-500 text-white',
};

const TableFilters = ({ table }: { table: any }) => {
  const [titleFilter, setTitleFilter] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      table.getColumn("title")?.setFilterValue(titleFilter);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [titleFilter, table]);

  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Case Name</label>
        <Input
          placeholder="Filter cases..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Status</label>
        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) => 
            table.getColumn("status")?.setFilterValue(value === 'all' ? '' : value)
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {Object.keys(statusColors).map(status => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export function CaseList({ cases, onSelectCase, selectedCaseId }: CaseListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<Case>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Case Name
          {column.getIsSorted() && (
            column.getIsSorted() === "asc" 
              ? <ChevronUp className="h-4 w-4" />
              : <ChevronDown className="h-4 w-4" />
          )}
        </div>
      ),
      filterFn: 'includesString'
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          {column.getIsSorted() && (
            column.getIsSorted() === "asc" 
              ? <ChevronUp className="h-4 w-4" />
              : <ChevronDown className="h-4 w-4" />
          )}
        </div>
      ),
      cell: ({ row }) => (
        <Badge className={cn(statusColors[row.original.status as keyof typeof statusColors])}>
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </Badge>
      ),
      filterFn: 'equals'
    },
    {
      accessorKey: "submittedBy",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted By
          {column.getIsSorted() && (
            column.getIsSorted() === "asc" 
              ? <ChevronUp className="h-4 w-4" />
              : <ChevronDown className="h-4 w-4" />
          )}
        </div>
      ),
      cell: ({ row }) => row.original.submittedBy?.name || 'Unknown User',
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted Time
          {column.getIsSorted() && (
            column.getIsSorted() === "asc" 
              ? <ChevronUp className="h-4 w-4" />
              : <ChevronDown className="h-4 w-4" />
          )}
        </div>
      ),
      cell: ({ row }) => format(new Date(row.original.createdAt), 'MMM d, yyyy HH:mm'),
      sortingFn: "datetime"
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          {column.getIsSorted() && (
            column.getIsSorted() === "asc" 
              ? <ChevronUp className="h-4 w-4" />
              : <ChevronDown className="h-4 w-4" />
          )}
        </div>
      ),
      cell: ({ row }) => format(new Date(row.original.updatedAt), 'MMM d, yyyy HH:mm'),
    },
  ]

  const table = useReactTable({
    data: cases,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    enableMultiSort: true,
    enableColumnFilters: true,
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TableFilters table={table} />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  "cursor-pointer",
                  selectedCaseId === row.original.id 
                    ? "bg-primary/10 hover:bg-primary/20"
                    : "hover:bg-muted/50"
                )}
                onClick={() => onSelectCase(row.original)}
                tabIndex={0}
                role="row"
                aria-selected={selectedCaseId === row.original.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <span className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {cases.length} cases
        </span>
        <div className="flex-1" />
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Cases per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[50, 100, 500].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </motion.div>
  )
}