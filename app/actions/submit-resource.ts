"use server"

import { Resend } from "resend"
import { z } from "zod"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Resource submission validation schema
const resourceSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  resourceName: z.string().min(1, { message: "Resource name is required" }),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  websiteUrl: z.string().url({ message: "Please enter a valid URL" }),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: "Please enter a valid hex color" }),
})

export type ResourceFormState = {
  success?: boolean
  message?: string
  errors?: Record<string, string>
  data?: Record<string, any>
}

export async function submitResource(prevState: ResourceFormState, formData: FormData): Promise<ResourceFormState> {
  // Extract form data
  const data = {
    email: formData.get("email") as string,
    author: formData.get("author") as string,
    resourceName: formData.get("resourceName") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    websiteUrl: formData.get("websiteUrl") as string,
    color: formData.get("color") as string,
  }

  // Validate form data
  const validationResult = resourceSchema.safeParse(data)
  if (!validationResult.success) {
    const errors: Record<string, string> = {}
    validationResult.error.errors.forEach((error) => {
      errors[error.path[0]] = error.message
    })
    return {
      success: false,
      message: "Please fix the errors in the form",
      errors,
      data,
    }
  }

  try {
    // In a real application, you would store this submission in a database
    // For now, we'll just send notification emails

    // Send notification to admin
    const { error: adminEmailError } = await resend.emails.send({
      from: "NomadResources <submissions@nomadresources.com>",
      to: "admin@nomadresources.com", // Change this to your admin email
      subject: `New Resource Submission: ${data.resourceName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FFC107;">New Resource Submission</h1>
          <p><strong>Resource Name:</strong> ${data.resourceName}</p>
          <p><strong>Category:</strong> ${data.category}</p>
          <p><strong>Author:</strong> ${data.author}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Website:</strong> <a href="${data.websiteUrl}">${data.websiteUrl}</a></p>
          <p><strong>Description:</strong> ${data.description}</p>
          <p><strong>Brand Color:</strong> ${data.color}</p>
          <p>Please review this submission in the admin dashboard.</p>
        </div>
      `,
    })

    // Send confirmation to submitter
    const { error: userEmailError } = await resend.emails.send({
      from: "NomadResources <submissions@nomadresources.com>",
      to: data.email,
      subject: "Your NomadResources Resource Submission",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FFC107;">Thank You for Your Submission!</h1>
          <p>We've received your resource submission for <strong>${data.resourceName}</strong>.</p>
          <p>Our team will review your submission and get back to you within 48 hours.</p>
          <p>If you have any questions, please reply to this email.</p>
          <p>Best regards,<br>The NomadResources Team</p>
        </div>
      `,
    })

    if (adminEmailError || userEmailError) {
      console.error("Error sending emails:", adminEmailError || userEmailError)
      return {
        success: false,
        message: "Failed to submit resource. Please try again later.",
        data,
      }
    }

    return {
      success: true,
      message: "Your resource has been submitted successfully! We'll review it shortly.",
    }
  } catch (error) {
    console.error("Resource submission error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      data,
    }
  }
}
