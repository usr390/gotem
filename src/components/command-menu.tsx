import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CommandMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-96 lg:w-[500px]"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search commands...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          ⌘K
        </kbd>
      </Button>

      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Quick Actions">
            <CommandItem>Create New Case</CommandItem>
            <CommandItem>View Recent Cases</CommandItem>
            <CommandItem>View My Cases</CommandItem>
          </CommandGroup>

          <CommandGroup heading="Navigation">
            <CommandItem>Dashboard</CommandItem>
            <CommandItem>Cases</CommandItem>
            <CommandItem>Reports</CommandItem>
          </CommandGroup>

          <CommandGroup heading="Settings">
            <CommandItem>Profile Settings</CommandItem>
            <CommandItem>Notification Preferences</CommandItem>
            <CommandItem>System Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}