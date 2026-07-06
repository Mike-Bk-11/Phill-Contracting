import { z } from "zod";
import { services } from "@/data/services";

const serviceTitles = services.map((s) => s.title);

/**
 * Validation schema for the quote-request form.
 * Shared by the client form and the server API route.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30)
    .regex(/^[0-9()+\-.\s]+$/, "Please enter a valid phone number."),
  service: z
    .string()
    .trim()
    .refine(
      (val) => val === "" || val === "Other" || serviceTitles.includes(val),
      "Please select a valid service."
    )
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about your project.")
    .max(2000),
  // Honeypot field — must stay empty. Bots tend to fill every field.
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
