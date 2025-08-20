"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useActionState } from "react"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"

const initialState: ContactFormState = {}

export default function AdvertisePage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    package: "",
    message: "",
  })

  // Update form data if there are validation errors
  useEffect(() => {
    if (state.data && !state.success) {
      setFormData((prevData) => ({
        ...prevData,
        ...state.data,
      }))
    }

    // Reset form on successful submission
    if (state.success) {
      setFormData({
        name: "",
        email: "",
        company: "",
        website: "",
        package: "",
        message: "",
      })
    }
  }, [state])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-muted py-20 text-center">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Advertise on <span className="text-primary">NomadResources</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Reach thousands of digital nomads and remote workers looking for the best tools and resources.
            </p>
          </div>
        </section>

        <section className="container px-4 py-12 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Why Advertise With Us?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Targeted Audience</h3>
                      <p className="text-muted-foreground">
                        Reach thousands of digital nomads and remote workers actively looking for tools and resources.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">High Conversion Rate</h3>
                      <p className="text-muted-foreground">
                        Our visitors are actively searching for solutions to help their nomadic lifestyle.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Affordable Options</h3>
                      <p className="text-muted-foreground">
                        One-time payment options that provide long-term visibility for your product.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Quality Traffic</h3>
                      <p className="text-muted-foreground">
                        Our audience consists of professionals and entrepreneurs with purchasing power.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-3xl font-bold tracking-tight mb-6">Our Audience</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="text-2xl font-bold">10K+</div>
                      <div className="text-xs text-muted-foreground">Monthly Visitors</div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="text-2xl font-bold">150+</div>
                      <div className="text-xs text-muted-foreground">Countries</div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="text-2xl font-bold">3.5m</div>
                      <div className="text-xs text-muted-foreground">Avg. Session</div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-center">
                      <div className="text-2xl font-bold">4.2%</div>
                      <div className="text-xs text-muted-foreground">Click Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Advertising Options</h2>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Featured Listing</CardTitle>
                      <CardDescription>
                        Get your product featured with a star badge and priority placement
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold mb-2">$49</div>
                      <p className="text-sm text-muted-foreground">One-time payment, lifetime feature</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>Star badge on your listing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>Priority placement in category</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>Highlighted border</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Select Featured</Button>
                    </CardFooter>
                  </Card>

                  <Card className="border-primary">
                    <CardHeader className="bg-primary/5">
                      <div className="flex justify-between items-center">
                        <CardTitle>Sponsored Listing</CardTitle>
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          POPULAR
                        </span>
                      </div>
                      <CardDescription>Maximum visibility with sponsored badge and homepage placement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold mb-2">$99</div>
                      <p className="text-sm text-muted-foreground">One-time payment, lifetime feature</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>Everything in Featured</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>Top placement on homepage</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>Sponsored badge</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>Social media promotion</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="default">
                        Select Sponsored
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Get Started</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  {state.success && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-500 rounded-md flex items-start gap-3 dark:bg-green-900/30 dark:text-green-50">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>{state.message}</p>
                    </div>
                  )}

                  <form action={formAction} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={state.errors?.name ? "border-red-500" : ""}
                          required
                        />
                        {state.errors?.name && <p className="text-xs text-red-500">{state.errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={state.errors?.email ? "border-red-500" : ""}
                          required
                        />
                        {state.errors?.email && <p className="text-xs text-red-500">{state.errors.email}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={state.errors?.company ? "border-red-500" : ""}
                        required
                      />
                      {state.errors?.company && <p className="text-xs text-red-500">{state.errors.company}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="website" className="text-sm font-medium">
                        Website
                      </label>
                      <Input
                        id="website"
                        name="website"
                        placeholder="https://yourwebsite.com"
                        value={formData.website}
                        onChange={handleInputChange}
                        className={state.errors?.website ? "border-red-500" : ""}
                        required
                      />
                      {state.errors?.website && <p className="text-xs text-red-500">{state.errors.website}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="package" className="text-sm font-medium">
                        Advertising Package
                      </label>
                      <select
                        id="package"
                        name="package"
                        value={formData.package}
                        onChange={handleInputChange}
                        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                          state.errors?.package ? "border-red-500" : ""
                        }`}
                        required
                      >
                        <option value="">Select a package</option>
                        <option value="featured">Featured Listing ($49)</option>
                        <option value="sponsored">Sponsored Listing ($99)</option>
                      </select>
                      {state.errors?.package && <p className="text-xs text-red-500">{state.errors.package}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your product and any specific requirements"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={state.errors?.message ? "border-red-500" : ""}
                        required
                      />
                      {state.errors?.message && <p className="text-xs text-red-500">{state.errors.message}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={isPending}>
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>

                    {state.message && !state.success && (
                      <div className="p-3 bg-red-100 border border-red-500 rounded-md flex items-start gap-3 dark:bg-red-900/30 dark:text-red-50">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p>{state.message}</p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How long will my listing be featured?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      All our advertising options are one-time payments for permanent placement. Your listing will
                      remain featured or sponsored indefinitely.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What information do you need for my listing?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We'll need your product name, description, logo, website URL, and category. You can provide this
                      information in the contact form.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How do I make payment?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      After submitting your information, we'll review your submission and send you a payment link. We
                      accept credit cards and PayPal.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I update my listing later?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, you can request updates to your listing at any time by contacting us at
                      support@nomadresources.com.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
