import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Case } from '@/types';
import { CaseList } from '@/components/dashboard/case-list';
import { CaseDetails } from '@/components/dashboard/case-details';
import { MOCK_CASES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NewCaseForm } from '@/components/dashboard/new-case-form';

export function DashboardPage() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  const [showNewCaseForm, setShowNewCaseForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track case submissions
          </p>
        </div>
        <Button onClick={() => setShowNewCaseForm(true)}>
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

      <AnimatePresence>
        {showNewCaseForm && (
          <NewCaseForm
            onClose={() => setShowNewCaseForm(false)}
            onSubmit={(formData) => {
              const newCase: Case = {
                id: crypto.randomUUID(),
                title: formData.title,
                description: formData.description,
                status: 'pending',
                submittedBy: {
                  id: "user-1",
                  name: "John Doe",
                  email: "john.doe@police.gov",
                  role: "police_officer",
                  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" // optional, can be removed
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              setCases([...cases, newCase]);
              setShowNewCaseForm(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}