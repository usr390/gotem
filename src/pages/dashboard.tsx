import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Case, User } from '@/types';
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

  useEffect(() => {
    const checkHash = () => {
      const isCreateNewCase = window.location.hash === '#create-new-case';
      console.log('Hash check:', {
        currentHash: window.location.hash,
        pathname: window.location.pathname,
        isCreateNewCase
      });
      
      if (isCreateNewCase) {
        console.log('Setting modal to show');
        setShowNewCaseForm(true);
      }
    };
  
    // Check immediately
    checkHash();
  
    // Listen for hash changes
    const handleHashChange = () => {
      console.log('Hash change detected');
      checkHash();
    };
  
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Add an effect to monitor showNewCaseForm changes
  useEffect(() => {
    console.log('Modal state changed:', showNewCaseForm);
  }, [showNewCaseForm]);

  const handleShowNewCase = () => {
    console.log('Showing new case modal');
    window.location.hash = 'create-new-case';
  };

  const handleCloseNewCase = () => {
    console.log('Closing modal and clearing hash');
    history.pushState(null, '', window.location.pathname);
    setShowNewCaseForm(false);
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track case submissions
          </p>
        </div>
        <Button onClick={handleShowNewCase}>
          <Plus className="mr-2 h-4 w-4" /> New Case
        </Button>
      </div>

      <div className="grid gap-6 w-full">
        <CaseList 
          cases={cases} 
          onSelectCase={setSelectedCase} 
          selectedCaseId={selectedCase?.id}
        />
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
            onClose={handleCloseNewCase}
            onSubmit={(formData) => {
              const timestamp = new Date().toISOString();
              const submitter: User = {
                id: "user-1",
                name: "John Doe",
                email: "john.doe@police.gov",
                role: "police_officer",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              };
              
              const newCase: Case = {
                id: crypto.randomUUID(),
                title: formData.title,
                description: formData.description,
                status: 'submitted',
                submittedBy: submitter,
                createdAt: timestamp,
                updatedAt: timestamp,
                audit: [
                  {
                    id: crypto.randomUUID(),
                    action: 'CASE_SUBMITTED',
                    timestamp,
                    userId: submitter.id,
                    userName: submitter.name,
                    details: 'Case submitted'
                  }
                ]
              };
              setCases([...cases, newCase]);
              handleCloseNewCase();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}