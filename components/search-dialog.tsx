import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Search } from "lucide-react"
import { resources, categories } from "@/app/data/resources"
import Link from "next/link"
import { siteConfig } from "@/app/metadata"

export function SearchDialog({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const [query, setQuery] = React.useState("")

  const filteredResources = React.useMemo(() => {
    if (!query) return resources

    const lowerQuery = query.toLowerCase()
    return resources.filter(
      (resource) =>
        resource.name.toLowerCase().includes(lowerQuery) ||
        resource.description.toLowerCase().includes(lowerQuery) ||
        categories.find((c) => c.id === resource.category)?.name.toLowerCase().includes(lowerQuery)
    )
  }, [query])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-3xl" role="dialog" aria-label="Search resources">
        <Command className="rounded-lg border shadow-md" shouldFilter={false}>
          <CommandInput
            placeholder="Search resources..."
            value={query}
            onValueChange={setQuery}
            className="h-12"
            aria-label="Search input"
          />
          <CommandEmpty>No results found for "{query}"</CommandEmpty>
          <CommandGroup 
            className="max-h-[400px] overflow-auto p-2" 
            heading={query ? `Search results for "${query}"` : "All resources"}
          >
            {filteredResources.map((resource) => (
              <Link 
                key={resource.id} 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                title={`Visit ${resource.name}`}
              >
                <CommandItem
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-accent"
                  value={resource.name}
                  role="option"
                  aria-label={`${resource.name} - ${resource.description}`}
                >
                  <div className="h-8 w-8 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={resource.imageUrl}
                      alt={`${resource.name} logo`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{resource.name}</span>
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {resource.description}
                    </span>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {categories.find((c) => c.id === resource.category)?.name}
                  </span>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </Command>
      </DialogContent>
    </Dialog>
  )
} 