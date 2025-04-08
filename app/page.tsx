"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { resources, categories } from "@/app/data/resources"
import { Navbar } from "@/components/navbar"
import { ResourceCard } from "@/components/resource-card"
import { Footer } from "@/components/footer"
import { SubscribeForm } from "@/components/subscribe-form"
import { Globe, Laptop, Plane, Coffee, Map, Wifi, Sun, Moon, Compass } from "lucide-react"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredResources =
    activeCategory === "all" ? resources : resources.filter((resource) => resource.category === activeCategory)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-muted py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full">
              <div className="absolute top-[10%] left-[5%]">
                <Globe className="w-8 h-8 md:w-12 md:h-12 text-primary/20" />
              </div>
              <div className="absolute top-[20%] right-[15%]">
                <Laptop className="w-8 h-8 md:w-12 md:h-12 text-primary/20" />
              </div>
              <div className="absolute top-[40%] left-[20%]">
                <Plane className="w-8 h-8 md:w-12 md:h-12 text-primary/20" />
              </div>
              <div className="absolute top-[60%] right-[10%]">
                <Coffee className="w-8 h-8 md:w-12 md:h-12 text-primary/20" />
              </div>
              <div className="absolute top-[80%] left-[15%]">
                <Map className="w-8 h-8 md:w-12 md:h-12 text-primary/20" />
              </div>
              <div className="absolute top-[30%] right-[25%]">
                <Wifi className="w-8 h-8 md:w-12 md:h-12 text-primary/20" />
              </div>
              <div className="absolute top-[70%] left-[30%]">
                <Sun className="w-8 h-8 md:w-12 md:h-12 text-primary/20" />
              </div>
              <div className="absolute top-[15%] left-[40%]">
                <Moon className="w-8 h-8 md:w-12 md:h-12 text-primary/20" />
              </div>
              <div className="absolute top-[50%] right-[35%]">
                <Compass className="w-8 h-8 md:w-12 md:h-12 text-primary/20" />
              </div>
            </div>
          </div>
          <div className="container px-4 md:px-6 relative">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Your Ultimate Digital <span className="text-primary">Nomad</span> Tools
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Discover curated resources for remote workers and digital nomads to live, work, and thrive from anywhere
              in the world.
            </p>
            <SubscribeForm className="mx-auto mt-6 w-full max-w-md" />
            <div className="mt-6">
              <Link href="/advertise">
                <Button variant="outline" className="text-sm">
                  Get featured for $99
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full px-4 py-12">
          {/* Horizontal category navigation */}
          <div className="mb-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              {activeCategory === "all" ? "All Resources" : categories.find((c) => c.id === activeCategory)?.name}
            </h2>

            {/* Resource cards grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  id={resource.id}
                  name={resource.name}
                  description={resource.description}
                  url={resource.url}
                  category={resource.category}
                  color={resource.color}
                  imageUrl={resource.imageUrl}
                  featured={resource.featured}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
