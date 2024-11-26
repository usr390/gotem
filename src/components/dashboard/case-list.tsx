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

interface CaseListProps {
  cases: Case[];
  onSelectCase: (caseItem: Case) => void;
}

const statusColors = {
  pending: 'bg-yellow-500',
  under_review: 'bg-blue-500',
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
};

export function CaseList({ cases, onSelectCase }: CaseListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted By</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((caseItem) => (
            <TableRow
              key={caseItem.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onSelectCase(caseItem)}
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