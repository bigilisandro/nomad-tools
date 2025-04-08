"use client"

import { useRef, useState, useEffect } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter, type SubscribeFormState } from "@/app/actions/subscribe"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

interface SubscribeFormProps {
  className?: string
  buttonClassName?: string
  inputClassName?: string
  darkMode?: boolean
}

const initialState: SubscribeFormState = {}

export function SubscribeForm({
  className = "",
  buttonClassName = "",
  inputClassName = "",
  darkMode = false,
}: SubscribeFormProps) {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const [email, setEmail] = useState("")

  // Reset form if submission was successful
  useEffect(() => {
    if (state.success && email) {
      setEmail("")
    }
  }, [state.success, email])

  return (
    <div className={className}>
      <form ref={formRef} action={formAction} className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClassName} ${darkMode ? "bg-[#1f2937] border-0 text-white" : ""}`}
              disabled={isPending}
              aria-label="Email address"
              required
            />
          </div>
          <Button type="submit" className={buttonClassName} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>

        {state.message && (
          <div className={`flex items-center gap-2 text-sm mt-2 ${state.success ? "text-green-500" : "text-red-500"}`}>
            {state.success ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
            )}
            <span>{state.message}</span>
          </div>
        )}
      </form>
    </div>
  )
}
