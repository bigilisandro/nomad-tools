"use server"

import { Resend } from "resend"
import { z } from "zod"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email validation schema
const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export type SubscribeFormState = {
  success?: boolean
  message?: string
  email?: string
}

export async function subscribeToNewsletter(
  prevState: SubscribeFormState,
  formData: FormData,
): Promise<SubscribeFormState> {
  // Get email from form data
  const email = formData.get("email") as string

  // Validate email
  const validationResult = subscribeSchema.safeParse({ email })
  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors[0].message,
    }
  }

  try {
    // In a real application, you would store this email in a database
    // For now, we'll just send a confirmation email

    // Send confirmation email
    const { data, error } = await resend.emails.send({
      from: "NomadTools <newsletter@nomadtools.com>",
      to: email,
      subject: "Welcome to NomadTools Newsletter",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FFC107;">Welcome to NomadTools!</h1>
          <p>Thank you for subscribing to our newsletter. You'll now receive weekly updates about the best tools and resources for digital nomads.</p>
          <p>If you didn't subscribe to our newsletter, you can safely ignore this email.</p>
          <p>Best regards,<br>The NomadTools Team</p>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        message: "Failed to subscribe. Please try again later.",
      }
    }

    return {
      success: true,
      message: "Thanks for subscribing! Check your inbox for a confirmation.",
      email,
    }
  } catch (error) {
    console.error("Subscription error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
