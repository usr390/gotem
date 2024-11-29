import { motion } from 'framer-motion';
import { Upload, File, Video, Loader2, CheckCircle2, AudioLines } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog"

interface NewCaseFormProps {
  onClose: () => void;
  onSubmit: (formData: { 
    title: string; 
    description: string;
    files: FileWithProgress[];
    audit: Audit[];
  }) => Promise<void>;
}

interface FileWithProgress extends File {
  progress: number;
  uploading: boolean;
  completed: boolean;
}

interface Audit {
  id: string;
  action: string;
  timestamp: string;
  userId: string;
  userName: string;
  details?: string;
}

export function NewCaseForm({ onClose, onSubmit }: NewCaseFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    files: [] as FileWithProgress[]
  });
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const { toast } = useToast()

  const uploadFile = async (file: FileWithProgress) => {
    console.log('Starting upload for file with size:', file.size);
    
    try {
      // Initial state
      setFiles(prev => prev.map(f => 
        f.name === file.name ? Object.assign(new (window.File)([file], file.name, { type: file.type }), {
          progress: 0,
          uploading: true,
          completed: false
        }) : f
      ));

      // Progress updates
      for (let i = 0; i <= 100; i += 10) {
        console.log(`Setting progress to: ${i}%`);
        await new Promise(resolve => setTimeout(resolve, 200));
        setFiles(prev => {
          const newState = prev.map(f => 
            f.name === file.name ? Object.assign(new (window.File)([file], file.name, { type: file.type }), {
              ...f,
              progress: i,
              uploading: i < 100,
              completed: i === 100
            }) : f
          );
          console.log(`State at ${i}%:`, JSON.stringify({
            progress: newState[0].progress,
            uploading: newState[0].uploading,
            completed: newState[0].completed,
            size: newState[0].size,
            type: newState[0].type
          }, null, 2));
          return newState;
        });
      }

      // Final state
      console.log('Setting final state');
      setFiles(prev => {
        const newState = prev.map(f => 
          f.name === file.name ? Object.assign(new (window.File)([file], file.name, { type: file.type }), {
            ...f,
            progress: 100,
            uploading: false,
            completed: true
          }) : f
        );
        console.log('Final state:', JSON.stringify({
          progress: newState[0].progress,
          uploading: newState[0].uploading,
          completed: newState[0].completed,
          size: newState[0].size,
          type: newState[0].type
        }, null, 2));
        return newState;
      });
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
      'video/*': [],
      'audio/*': []
    },
    onDrop: async (acceptedFiles) => {
      const newFiles = acceptedFiles.map(file => 
        Object.assign(file, {
          progress: 0,
          uploading: false,
          completed: false
        })
      ) as FileWithProgress[];
      
      setFiles(prev => [...prev, ...newFiles]);

      await Promise.all(newFiles.map(file => uploadFile(file)));
    }
  });

  const removeFile = (fileToRemove: FileWithProgress) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Starting uploads...');
      
      const currentUser = {
        id: "user-1", // You would get this from your auth context
        name: "John Doe",
        email: "john.doe@police.gov",
        role: "police_officer",
      };

      const timestamp = new Date().toISOString();
      
      await onSubmit({
        ...formData,
        files,
        audit: [
          {
            id: crypto.randomUUID(),
            action: 'CASE_SUBMITTED',
            timestamp,
            userId: currentUser.id,
            userName: currentUser.name,
            details: `Case submitted`
          }
        ]
      });
      
      console.log('Upload completed, showing success toast');
      toast({
        title: "Case Created",
        description: "Your case has been successfully created.",
        duration: 5000,
        variant: "default",
      });
      
      console.log('Toast called, closing form');
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Failed to create case",
      });
    }
  };

  // Helper function to determine file type icon/preview
  const getFilePreview = (file: FileWithProgress) => {
    if (!file || !file.type) return <File className="h-8 w-8 text-muted-foreground" />;

    if (file.type.startsWith('image/')) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className={cn(
            "h-full w-full rounded-lg object-cover",
            file.uploading && "opacity-50"
          )}
          onLoad={(e) => {
            URL.revokeObjectURL((e.target as HTMLImageElement).src);
          }}
        />
      );
    } else if (file.type.startsWith('video/')) {
      return <Video className="h-8 w-8 text-muted-foreground" />;
    } else if (file.type.startsWith('audio/')) {
      return <AudioLines className="h-8 w-8 text-muted-foreground" />;
    } else {
      return <File className="h-8 w-8 text-muted-foreground" />;
    }
  };

  // Helper function for better file size formatting
  const formatFileSize = (bytes: number): string => {
    if (!bytes) return 'Unknown size';
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Case</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">
              Title
            </label>
            <Input
              autoFocus
              name="title"
              placeholder="Case name"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-background border-input"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Case description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background border-input"
              required
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Evidence Files
            </label>
            <div
              {...getRootProps()}
              className={cn(
                "mt-2 flex justify-center rounded-lg border border-dashed border-input p-6",
                isDragActive && "border-primary bg-primary/5"
              )}
            >
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                  <input
                    type="file"
                    accept="image/*,application/pdf,video/*,audio/*"
                    multiple
                    required
                    {...getInputProps()}
                  />
                  <span className="relative cursor-pointer rounded-md bg-background font-semibold text-primary hover:text-primary/80">
                    Upload files
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Images, PDFs, videos, and audio files
                </p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg border bg-card p-2"
                  >
                    <div className="aspect-square w-full rounded-lg flex items-center justify-center bg-muted relative">
                      {getFilePreview(file)}
                      
                      {/* Loading/Success Overlay */}
                      {(file.uploading || file.completed) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 rounded-lg">
                          {file.uploading ? (
                            <>
                              <Loader2 className="h-8 w-8 animate-spin text-primary" />
                              <div className="w-full px-2 mt-2">
                                <Progress value={file.progress} className="h-1" />
                              </div>
                            </>
                          ) : file.completed && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CheckCircle2 className="h-8 w-8 text-primary" />
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-1 px-1">
                      <p className="text-xs font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>

                    {!file.uploading && (
                      <button
                        type="button"
                        onClick={() => removeFile(file)}
                        className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 hover:bg-red-600 ring-2 ring-white"
                      >
                        <span className="text-white text-sm font-bold leading-none">&times;</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Case</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}