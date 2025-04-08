"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { resources, categories } from "@/app/data/resources"
import { Navbar } from "@/components/navbar"
import { ResourceCard } from "@/components/resource-card"
import { Footer } from "@/components/footer"
import { SubscribeForm } from "@/components/subscribe-form"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredResources =
    activeCategory === "all" ? resources : resources.filter((resource) => resource.category === activeCategory)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-muted py-20 text-center">
          <div className="container px-4 md:px-6">
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

        <section className="container px-4 py-12 md:px-6">
          {/* Horizontal category navigation */}
          <div className="mb-8 overflow-x-auto pb-4">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
