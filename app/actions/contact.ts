"use server"

import { Resend } from "resend"
import { z } from "zod"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(1, { message: "Company name is required" }),
  website: z.string().url({ message: "Please enter a valid URL" }),
  package: z.string().min(1, { message: "Please select a package" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export type ContactFormState = {
  success?: boolean
  message?: string
  errors?: Record<string, string>
  data?: Record<string, any>
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Extract form data
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    website: formData.get("website") as string,
    package: formData.get("package") as string,
    message: formData.get("message") as string,
  }

  // Validate form data
  const validationResult = contactSchema.safeParse(data)
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
    // Send notification to admin
    const { error: adminEmailError } = await resend.emails.send({
      from: "Digital Nomad Resources <contact@updates.digitalnomadresourc.es",
      to: "bigilisandro@gmail.com", // Change this to your admin email
      subject: `New Advertising Inquiry: ${data.company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FFC107;">New Advertising Inquiry</h1>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Website:</strong> <a href="${data.website}">${data.website}</a></p>
          <p><strong>Package:</strong> ${data.package}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        </div>
      `,
    })

    // Send confirmation to inquirer
    const { error: userEmailError } = await resend.emails.send({
      from: "Digital Nomad Resources <contact@updates.digitalnomadresourc.es>",
      to: data.email,
      subject: "Your Digital Nomad Resources Advertising Inquiry",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FFC107;">Thank You for Your Interest!</h1>
          <p>We've received your inquiry about advertising on Digital Nomad Resources.</p>
          <p>Our team will review your information and get back to you within 24 hours.</p>
          <p>If you have any questions, please reply to this email.</p>
          <p>Best regards,<br>The Digital Nomad Resources Team</p>
        </div>
      `,
    })

    if (adminEmailError || userEmailError) {
      console.error("Error sending emails:", adminEmailError || userEmailError)
      return {
        success: false,
        message: "Failed to submit inquiry. Please try again later.",
        data,
      }
    }

    return {
      success: true,
      message: "Your inquiry has been submitted successfully! We'll get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      data,
    }
  }
}
