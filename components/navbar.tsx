import * as React from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchDialog } from "@/components/search-dialog"

export function Navbar() {
  const [searchOpen, setSearchOpen] = React.useState(false)

  // Handle keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">
            Digital<span className="text-primary">Nomad</span>Resources
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4 xl:mr-2" />
            <span className="hidden xl:inline-flex">Search resources...</span>
            <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <Link href="/submit" className="text-sm font-medium hover:text-primary">
            Submit Resource
          </Link>
          <Link
            href="/advertise"
            className="ml-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Advertise
          </Link>
        </div>
      </div>
      <SearchDialog open={searchOpen} setOpen={setSearchOpen} />
    </header>
  )
}
