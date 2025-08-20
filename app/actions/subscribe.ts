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
      from: "Digital Nomad Resources <newsletter@updates.digitalnomadresourc.es>",
      to: email,
      subject: "Welcome to Digital Nomad Resources Newsletter",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FFC107;">Welcome to Digital Nomad Resources!</h1>
          <p>Thank you for subscribing to our newsletter. You'll now receive weekly updates about the best tools and resources for digital nomads.</p>
          <p>If you didn't subscribe to our newsletter, you can safely ignore this email.</p>
          <p>Best regards,<br>The Digital Nomad Resources Team</p>
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

    // Create contact in Resend
    try {
      await resend.contacts.create({
        email: email,
        firstName: email.split('@')[0], // Use email prefix as first name
        lastName: '', // Leave empty as we don't collect this
        unsubscribed: false,
        audienceId: '1bc10d96-35d2-4dc8-ae44-ee3404fd3ebb', // Use env var or fallback
      })
    } catch (contactError) {
      console.error("Error creating contact:", contactError)
      // Don't fail the subscription if contact creation fails
      // The email was already sent successfully
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
