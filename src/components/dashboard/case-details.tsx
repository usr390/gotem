import { motion } from 'framer-motion';
import { Case } from '@/types';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useState } from 'react';
import { X, FileIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  CheckCircle2, 
  FileUp, 
  RotateCcw, 
  UserPlus, 
  FileEdit 
} from 'lucide-react';

interface CaseDetailsProps {
  caseItem: Case;
  onClose: () => void;
}

// Update the helper function to return Lucide icons
function getActionDetails(action: string) {
  switch (action) {
    case 'CASE_SUBMITTED':
      return { icon: <CheckCircle2 className="h-4 w-4 text-green-500" />, color: 'text-green-500' };
    case 'FILE_ADDED':
      return { icon: <FileUp className="h-4 w-4 text-orange-500" />, color: 'text-orange-500' };
    case 'STATUS_CHANGED':
      return { icon: <RotateCcw className="h-4 w-4 text-blue-500" />, color: 'text-blue-500' };
    case 'ASSIGNED':
      return { icon: <UserPlus className="h-4 w-4 text-purple-500" />, color: 'text-purple-500' };
    default:
      return { icon: <FileEdit className="h-4 w-4 text-gray-500" />, color: 'text-gray-500' };
  }
}

export function CaseDetails({ caseItem, onClose }: CaseDetailsProps) {

  const evidence = caseItem.evidence || [];

  // Track open state for each section
  const [openSections, setOpenSections] = useState({
    description: true,
    details: true,
    evidence: true,
    history: true,
    messages: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 w-1/3 h-full bg-card border-l shadow-lg flex flex-col"
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-bold">{caseItem.title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-0 pb-6">
        <div className="space-y-2">
          {/* Description Section */}
          <Collapsible open={openSections.description}>
            <CollapsibleTrigger 
              onClick={() => toggleSection('description')}
              className="flex items-center justify-between w-full py-4 hover:text-primary"
            >
              <h3 className="font-semibold">Description</h3>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openSections.description ? "transform rotate-0" : "-rotate-90"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-4">
              <p className="text-muted-foreground pt-2">{caseItem.description}</p>
            </CollapsibleContent>
          </Collapsible>

          {/* Details Section */}
          <Collapsible open={openSections.details}>
            <CollapsibleTrigger 
              onClick={() => toggleSection('details')}
              className="flex items-center justify-between w-full py-4 hover:text-primary"
            >
              <h3 className="font-semibold">Details</h3>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openSections.details ? "transform rotate-0" : "-rotate-90"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-4">
              <dl className="space-y-2 pt-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd className="font-medium">
                    {caseItem.status.replace('_', ' ').toUpperCase()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Submitted By</dt>
                  <dd className="font-medium">{caseItem.submittedBy.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Created</dt>
                  <dd className="font-medium">
                    {format(new Date(caseItem.createdAt), 'PPpp')}
                  </dd>
                </div>
              </dl>
            </CollapsibleContent>
          </Collapsible>

          {/* Evidence Section */}
          <Collapsible open={openSections.evidence}>
            <CollapsibleTrigger 
              onClick={() => toggleSection('evidence')}
              className="flex items-center justify-between w-full py-4 hover:text-primary"
            >
              <h3 className="font-semibold">Evidence</h3>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openSections.evidence ? "transform rotate-0" : "-rotate-90"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-4">
              <div className="pt-2">
                <div className="rounded-lg border p-4">
                  {evidence.length ? (
                    <div className="space-y-2">
                      {evidence.map((evidence) => (
                        <div key={evidence.id} className="flex items-center gap-2 text-sm hover:bg-muted p-2 rounded-md">
                          {evidence.type === 'image' ? (
                            <img 
                              src={evidence.thumbnail} 
                              alt={evidence.name}
                              className="h-8 w-8 object-cover rounded"
                            />
                          ) : (
                            <FileIcon className="h-4 w-4" />
                          )}
                          <a href={evidence.url} className="hover:underline">{evidence.name}</a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No evidence uploaded yet</p>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* History Section */}
          <Collapsible open={openSections.history}>
            <CollapsibleTrigger 
              onClick={() => toggleSection('history')}
              className="flex items-center justify-between w-full py-4 hover:text-primary"
            >
              <h3 className="font-semibold">History</h3>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openSections.history ? "transform rotate-0" : "-rotate-90"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-4">
              <div className="space-y-4 pt-2">
                {[...caseItem.audit || []].reverse().map((entry) => {
                  const { icon } = getActionDetails(entry.action);
                  return (
                    <div key={entry.id} className="flex gap-3">
                      <div className="mt-0.5">{icon}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{entry.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(entry.timestamp), 'PPpp')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {entry.details || entry.action.toLowerCase().replace(/_/g, ' ')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </motion.div>
  );
}