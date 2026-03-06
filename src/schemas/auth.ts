import { z } from "zod";

// --- Auth Schemas ---

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterValues = z.infer<typeof registerSchema>;

export const serviceProviderRegisterSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .trim()
        .toLowerCase()
        .email("Please provide a valid email address")
        .max(254, "Email must be less than 254 characters"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must be less than 32 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
        ),

    first_name: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(100, "First name must be less than 100 characters"),

    last_name: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .max(100, "Last name must be less than 100 characters"),

    category_id: z
        .string()
        .min(1, "Category ID is required")
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID"),

    city: z
        .string()
        .trim()
        .min(2, "City must be at least 2 characters")
        .max(100, "City must be less than 100 characters"),

    area: z
        .string()
        .trim()
        .min(2, "Area must be at least 2 characters")
        .max(100, "Area must be less than 100 characters"),

    pincode: z
        .string()
        .trim()
        .min(4, "Pincode must be at least 4 characters")
        .max(10, "Pincode must be less than 10 characters"),

    base_price: z
        .number()
        .min(0, "Base price cannot be negative"),

    experience: z
        .number()
        .min(0, "Experience cannot be negative"),

    avatar: z
        .string()
        .min(1, "Avatar is required")
        .url("Please provide a valid avatar URL"),

    description: z
        .string()
        .trim()
        .min(20, "Description must be at least 20 characters")
        .max(500, "Description must be less than 500 characters")
});

export type ServiceProviderRegisterValues = z.infer<typeof serviceProviderRegisterSchema>;
