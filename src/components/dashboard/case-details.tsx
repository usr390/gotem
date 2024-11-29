import { motion } from 'framer-motion';
import { Case } from '@/types';
import { Button } from '@/components/ui/button';
import { format, formatDistanceToNow } from 'date-fns';
import { useState, useMemo } from 'react';
import { X, Plus, Search, FileText, Image as ImageIcon, Video, File, ExternalLink } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, Badge } from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  CheckCircle2, 
  FileUp, 
  RotateCcw, 
  UserPlus, 
  FileEdit 
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

// Helper function to get icon based on file type
function getFileIcon(type: string) {
  switch (type.toLowerCase()) {
    case 'image':
      return <ImageIcon className="h-4 w-4 text-blue-500" />;
    case 'video':
      return <Video className="h-4 w-4 text-purple-500" />;
    case 'document':
      return <FileText className="h-4 w-4 text-orange-500" />;
    default:
      return <File className="h-4 w-4 text-gray-500" />;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function CaseDetails({ caseItem, onClose }: CaseDetailsProps) {

  // Memoize the evidence array
  const memoizedEvidence = useMemo(() => caseItem.evidence || [], [caseItem.evidence]);

  // Track open state for each section
  const [openSections, setOpenSections] = useState({
    description: true,
    details: true,
    evidence: true,
    history: true,
    messages: true,
  });

  // Add these states
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort evidence using memoizedEvidence
  const filteredEvidence = useMemo(() => {
    return memoizedEvidence
      .filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = fileTypeFilter === 'all' || file.type === fileTypeFilter;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'size':
            return b.size - a.size;
          case 'date':
          default:
            return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        }
      });
  }, [memoizedEvidence, searchTerm, fileTypeFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredEvidence.length / itemsPerPage);
  const paginatedEvidence = filteredEvidence.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                  <dt className="text-sm text-muted-foreground">Submitted</dt>
                  <dd className="font-medium">
                    {format(new Date(caseItem.createdAt), 'PPpp')}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({formatDistanceToNow(new Date(caseItem.createdAt), { addSuffix: true })})
                    </span>
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
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Evidence</h3>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openSections.evidence ? "transform rotate-0" : "-rotate-90"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-4">
              <div className="pt-2">
                {/* Controls Row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search evidence..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>

                  <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="File Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="document">Documents</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date Added</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="size">Size</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => {
                      console.log('Add evidence clicked');
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add Evidence
                  </Button>
                </div>

                {/* Evidence Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[30px]"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Added</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedEvidence.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell>{getFileIcon(file.type)}</TableCell>
                          <TableCell>
                            <a 
                              href={file.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-medium hover:underline text-primary"
                            >
                              {file.name}
                            </a>
                          </TableCell>
                          <TableCell>{formatBytes(file.size)}</TableCell>
                          <TableCell>{format(new Date(file.uploadedAt), 'MMM d, yyyy')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredEvidence.length)} of {filteredEvidence.length} files
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
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