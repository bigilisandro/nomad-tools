"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Star, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { categories } from "@/app/data/resources";
import { Navbar } from "@/components/navbar";
import { ResourceCard } from "@/components/resource-card";
import { Footer } from "@/components/footer";
import { useActionState } from "react";
import {
  submitResource,
  type ResourceFormState,
} from "@/app/actions/submit-resource";

const initialState: ResourceFormState = {};

export default function SubmitPage() {
  const [state, formAction, isPending] = useActionState(
    submitResource,
    initialState
  );

  const [formData, setFormData] = useState({
    email: "",
    author: "",
    resourceName: "",
    category: "",
    description: "",
    websiteUrl: "",
    logo: null,
    logoPreview: "",
    color: "#5ECBC1", // Default color
  });

  // Update form data if there are validation errors
  useEffect(() => {
    if (state.data && !state.success) {
      setFormData((prevData) => ({
        ...prevData,
        ...state.data,
      }));
    }

    // Reset form on successful submission
    if (state.success) {
      setFormData({
        email: "",
        author: "",
        resourceName: "",
        category: "",
        description: "",
        websiteUrl: "",
        logo: null,
        logoPreview: "",
        color: "#5ECBC1",
      });
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      color: e.target.value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-[#111827] text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Form Section */}
              <div className="bg-[#1a202c] p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-6">Add your resource</h1>

                {state.success && (
                  <div className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-md flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>{state.message}</p>
                  </div>
                )}

                <form action={formAction} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your email address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`bg-[#2d3748] border-[#4a5568] text-white ${
                        state.errors?.email ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {state.errors?.email && (
                      <p className="text-xs text-red-500">
                        {state.errors.email}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      We'll use this to create your account.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="resourceName"
                        className="text-sm font-medium"
                      >
                        Resource name
                      </label>
                      <Input
                        id="resourceName"
                        name="resourceName"
                        placeholder="Your resource name"
                        value={formData.resourceName}
                        onChange={handleInputChange}
                        className={`bg-[#2d3748] border-[#4a5568] text-white ${
                          state.errors?.resourceName ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {state.errors?.resourceName && (
                        <p className="text-xs text-red-500">
                          {state.errors.resourceName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`flex h-10 w-full rounded-md border border-[#4a5568] bg-[#2d3748] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                          state.errors?.category ? "border-red-500" : ""
                        }`}                        required
                      >
                        <option value="">Select a category</option>
                        {categories
                          .filter((cat) => cat.id !== "all")
                          .map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                      {state.errors?.category && (
                        <p className="text-xs text-red-500">
                          {state.errors.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="color" className="text-sm font-medium">
                      Brand color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleColorChange}
                        className="h-10 w-10 rounded cursor-pointer"
                      />
                      <Input
                        value={formData.color}
                        onChange={handleColorChange}
                        className={`bg-[#2d3748] border-[#4a5568] text-white uppercase ${
                          state.errors?.color ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {state.errors?.color && (
                      <p className="text-xs text-red-500">
                        {state.errors.color}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Logo</label>
                    <div
                      className="border-2 border-dashed border-[#4a5568] rounded-lg p-8 text-center cursor-pointer hover:bg-[#2d3748]/50 transition-colors"
                      onClick={() =>
                        document.getElementById("logo-upload").click()
                      }
                    >
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                      <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400">
                        Drop your logo here, or{" "}
                        <span className="text-primary">browse</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG or SVG, max 2MB
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your resource in a few sentences..."
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`bg-[#2d3748] border-[#4a5568] text-white min-h-[120px] ${
                        state.errors?.description ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {state.errors?.description && (
                      <p className="text-xs text-red-500">
                        {state.errors.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="websiteUrl" className="text-sm font-medium">
                      URL
                    </label>
                    <Input
                      id="websiteUrl"
                      name="websiteUrl"
                      placeholder="https://yourwebsite.com"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className={`bg-[#2d3748] border-[#4a5568] text-white ${
                        state.errors?.websiteUrl ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {state.errors?.websiteUrl && (
                      <p className="text-xs text-red-500">
                        {state.errors.websiteUrl}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      The resource's homepage
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Resource"
                    )}
                  </Button>

                  {state.message && !state.success && (
                    <div className="p-3 bg-red-900/30 border border-red-500 rounded-md flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p>{state.message}</p>
                    </div>
                  )}
                </form>
              </div>

              {/* Preview Section */}
              <div className="bg-[#1a202c] p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Preview</h2>
                <div className="bg-[#111827] rounded-lg p-6">
                  <ResourceCard
                    name={formData.resourceName || "Your Resource Name"}
                    description={
                      formData.description ||
                      "Your resource description will appear here..."
                    }
                    url={formData.websiteUrl || "#"}
                    category={formData.category || ""}
                    color={formData.color}
                    logoPreview={formData.logoPreview}
                    preview={true}
                  />

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Want to stand out?
                    </h3>
                    <div className="bg-[#2d3748] rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-primary fill-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">
                            Featured Listing - $49
                          </h4>
                          <p className="text-sm text-gray-400">
                            Get a star badge and priority placement in your
                            category.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/advertise"
                      className="text-primary hover:underline text-sm"
                    >
                      Learn more about advertising options →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

