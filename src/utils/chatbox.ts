import { z } from "zod";

export const FormSchema = z.object({
  chat: z
    .string()
    .min(2, {
      message:
        "Your message is too short. Please type at least two characters.",
    }),
  language: z.string().optional(),
});

export type FormData = z.infer<typeof FormSchema>;
