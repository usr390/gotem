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
  ColumnResizeMode,
  ColumnSizingState,
} from "@tanstack/react-table"
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ArchiveIcon, CopyIcon, EyeIcon, TrashIcon } from "lucide-react"

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
  const [submitterFilter, setSubmitterFilter] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      table.getColumn("title")?.setFilterValue(titleFilter);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [titleFilter, table]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      table.getColumn("submittedBy")?.setFilterValue(submitterFilter);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [submitterFilter, table]);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="title-filter">Case Name</Label>
        <Input
          id="title-filter"
          placeholder="Filter by case name..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="submitter-filter">Submitted By</Label>
        <Input
          id="submitter-filter"
          placeholder="Filter by submitter..."
          value={submitterFilter}
          onChange={(e) => setSubmitterFilter(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label>Status</Label>
        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
          onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}
        >
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="dropped">Dropped</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export function CaseList({ cases, onSelectCase, selectedCaseId }: CaseListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange');

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
      filterFn: 'includesString',
      size: 300
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
        <Badge className={cn(
          statusColors[row.original.status as keyof typeof statusColors],
          "w-24 justify-center"
        )}>
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </Badge>
      ),
      filterFn: 'equals',
      size: 120
    },
    {
      accessorKey: "submittedBy",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Submitted By
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </div>
        )
      },
      cell: ({ row }) => row.original.submittedBy.name,
      filterFn: (row, id, value) => {
        return row.original.submittedBy.name
          .toLowerCase()
          .includes((value as string).toLowerCase())
      },
      size: 200
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Submitted Time
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </div>
        )
      },
      cell: ({ row }) => format(new Date(row.getValue("createdAt")), "PPP"),
      filterFn: (row, id, value: { from?: Date; to?: Date } | undefined) => {
        if (!value?.from && !value?.to) return true;

        const date = new Date(row.getValue("createdAt"));
        const { from, to } = value || {};
        
        const adjustedTo = to ? new Date(to.setHours(23, 59, 59, 999)) : undefined;
        
        if (from && adjustedTo) {
          return date >= from && date <= adjustedTo;
        }
        if (from) {
          return date >= from;
        }
        if (adjustedTo) {
          return date <= adjustedTo;
        }
        return true;
      },
      size: 150
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
      size: 150
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
      columnSizing,
    },
    enableMultiSort: true,
    enableColumnFilters: true,
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    onColumnSizingChange: setColumnSizing,
    columnResizeMode,
  })

  const handleCopyId = (caseId: string) => {
    navigator.clipboard.writeText(caseId);
    // Optional: Add a toast notification here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TableFilters table={table} />
      
      <div className="mt-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        position: 'relative'
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none flex items-center w-[calc(100%-12px)]'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            <div className="pr-4">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          </div>
                          <div
                            {...{
                              onMouseDown: (e) => {
                                e.stopPropagation();
                                header.getResizeHandler()(e);
                              },
                              onTouchStart: (e) => {
                                e.stopPropagation();
                                header.getResizeHandler()(e);
                              },
                              className: `resizer ${
                                header.column.getIsResizing() ? 'isResizing' : ''
                              }`,
                              style: {
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                height: '100%',
                                width: '4px',
                                background: header.column.getIsResizing() 
                                  ? 'rgba(0,0,0,0.3)' 
                                  : 'rgba(0,0,0,0.0)',
                                cursor: 'col-resize',
                                userSelect: 'none',
                                touchAction: 'none',
                              },
                            }}
                          />
                        </>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <ContextMenu key={row.id}>
                    <ContextMenuTrigger asChild>
                      <TableRow
                        data-state={row.getIsSelected() && "selected"}
                        className={cn(
                          "transition-colors",
                          selectedCaseId === row.original.id && "bg-muted hover:bg-muted"
                        )}
                        onClick={() => onSelectCase(row.original)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-48">
                      <ContextMenuItem
                        onClick={() => onSelectCase(row.original)}
                        className="flex items-center gap-2"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span>View Details</span>
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => handleCopyId(row.original.id)}
                        className="flex items-center gap-2"
                      >
                        <CopyIcon className="h-4 w-4" />
                        <span>Copy Case ID</span>
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                      >
                        <ArchiveIcon className="h-4 w-4" />
                        <span>Archive Case</span>
                      </ContextMenuItem>
                      <ContextMenuItem
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span>Delete Case</span>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
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
        </div>
      </div>

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