import { z } from "zod";
import { PagintationConstants } from "../constants";

export const serviceProvidersSearchSchema = z.object({
    page: z.union([z.string(), z.number()]).optional().transform(val => {
        if (typeof val === 'number') return val;
        return val ? parseInt(val) : PagintationConstants.PAGE;
    }),
    limit: z.union([z.string(), z.number()]).optional().transform(val => {
        if (typeof val === 'number') return val;
        return val ? parseInt(val) : PagintationConstants.LIMIT;
    }),
    search: z.string().trim().optional(),
    category_slug: z.string().trim().optional(),
    is_available: z.enum(["true", "false", ""]).optional(),
    is_featured: z.enum(["true", "false", ""]).optional()
});

export type ServiceProvidersSearch = z.infer<typeof serviceProvidersSearchSchema>;
