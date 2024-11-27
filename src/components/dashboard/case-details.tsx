import { motion } from 'framer-motion';
import { Case, Message } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { useState } from 'react';
import { MOCK_MESSAGES } from '@/lib/mock-data';
import { useAuth } from '@/contexts/auth-context';
import { X, FileIcon } from 'lucide-react';

interface CaseDetailsProps {
  caseItem: Case;
  onClose: () => void;
}

export function CaseDetails({ caseItem, onClose }: CaseDetailsProps) {
  const [messages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  const evidence = caseItem.evidence || [];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message to the backend
    setNewMessage('');
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

      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{caseItem.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Details</h3>
            <dl className="space-y-2">
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
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Evidence</h3>
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

          <div className="space-y-4">
            <h3 className="font-semibold">Messages</h3>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${
                      message.sender.id === user?.id ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender.id === user?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {message.sender.name} •{' '}
                      {format(new Date(message.createdAt), 'p')}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[80px]"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}