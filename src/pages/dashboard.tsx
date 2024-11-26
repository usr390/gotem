import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Case } from '@/types';
import { CaseList } from '@/components/dashboard/case-list';
import { CaseDetails } from '@/components/dashboard/case-details';
import { MOCK_CASES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function DashboardPage() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [cases] = useState<Case[]>(MOCK_CASES);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track case submissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Case
        </Button>
      </div>

      <div className="grid gap-6">
        <CaseList cases={cases} onSelectCase={setSelectedCase} />
      </div>

      <AnimatePresence>
        {selectedCase && (
          <CaseDetails
            caseItem={selectedCase}
            onClose={() => setSelectedCase(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}