import { z } from "zod";

export const monsterFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.string()
        .min(1, "Please select a monster image")
        .refine(
            val => {
                try {
                    const url = new URL(val);
                    return url.protocol === "https:";
                } catch {
                    return false;
                }
            },
            "Please provide a valid HTTPS URL"
        ),
    health: z.number().min(1).max(100, "Health must be between 1 and 100").default(100),
    attack: z.number().min(1, "Attack must be greater than 0"),
    defense: z.number().min(1, "Defense must be greater than 0"),
    speed: z.number().min(1, "Speed must be greater than 0"),
});

export type monsterForm = z.infer<typeof monsterFormSchema> & {
    id?: string
    attackEqualDefende?: boolean;
    damage?: number;
}