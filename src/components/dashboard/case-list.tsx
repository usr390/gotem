import { useState, useMemo } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { SortingState } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

interface CaseListProps {
  cases: Case[];
  onSelectCase: (caseItem: Case) => void;
  selectedCaseId?: string;
}

const statusColors = {
  submitted: 'bg-black-500',
  review: 'bg-yellow-500',
  approved: 'bg-green-500',
  dropped: 'bg-red-500',
};

export function CaseList({ cases, onSelectCase, selectedCaseId }: CaseListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // Sort the cases
  const sortedCases = useMemo(() => {
    return [...cases].sort((a, b) => {
      const [sort] = sorting;
      if (!sort) return 0;

      // Special handling for submittedBy
      if (sort.id === 'submittedBy') {
        const aVal = a.submittedBy.name;
        const bVal = b.submittedBy.name;
        return sort.desc 
          ? bVal.localeCompare(aVal) 
          : aVal.localeCompare(bVal);
      }

      // Normal sorting for other columns
      const aVal = String(a[sort.id as keyof Case] ?? '');
      const bVal = String(b[sort.id as keyof Case] ?? '');
      return sort.desc 
        ? bVal.localeCompare(aVal) 
        : aVal.localeCompare(bVal);
    });
  }, [cases, sorting]);

  const toggleSort = (columnId: keyof Case) => {
    setSorting(current => {
      // If clicking the same column that's already sorted
      if (current[0]?.id === columnId) {
        // If ascending, make it descending
        if (!current[0].desc) {
          return [{ id: columnId, desc: true }];
        }
        // If descending, remove sort
        return [];
      }
      // New column, set to ascending
      return [{ id: columnId, desc: false }];
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              onClick={() => toggleSort('title')} 
              className="cursor-pointer"
            >
              Title {sorting[0]?.id === 'title' && (sorting[0]?.desc ? ' ↓' : ' ↑')}
            </TableHead>
            <TableHead onClick={() => toggleSort('status')} className="cursor-pointer">
              Status {sorting[0]?.id === 'status' && (sorting[0]?.desc ? '↓' : '↑')}
            </TableHead>
            <TableHead onClick={() => toggleSort('submittedBy')} className="cursor-pointer">
              Submitted By {sorting[0]?.id === 'submittedBy' && (sorting[0]?.desc ? '↓' : '↑')}
            </TableHead>
            <TableHead onClick={() => toggleSort('createdAt')} className="cursor-pointer">
              Created {sorting[0]?.id === 'createdAt' && (sorting[0]?.desc ? '↓' : '↑')}
            </TableHead>
            <TableHead onClick={() => toggleSort('updatedAt')} className="cursor-pointer">
              Last Updated {sorting[0]?.id === 'updatedAt' && (sorting[0]?.desc ? '↓' : '↑')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCases.map((caseItem) => (
            <TableRow
              key={caseItem.id}
              className={cn(
                "cursor-pointer",
                selectedCaseId === caseItem.id 
                  ? "bg-primary/10 hover:bg-primary/20"
                  : "hover:bg-muted/50"
              )}
              onClick={() => onSelectCase(caseItem)}
              tabIndex={0}
              role="row"
              aria-selected={selectedCaseId === caseItem.id}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCase(caseItem);
                }
              }}
            >
              <TableCell className="font-medium">{caseItem.title}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={statusColors[caseItem.status]}
                >
                  {caseItem.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>{caseItem.submittedBy.name}</TableCell>
              <TableCell>
                {format(new Date(caseItem.createdAt), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                {format(new Date(caseItem.updatedAt), 'MMM d, yyyy')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}