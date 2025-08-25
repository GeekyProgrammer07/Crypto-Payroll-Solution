import { z } from 'zod';

export const addOrganisationSchema = z.object({
  name: z
    .string({ message: 'Company name is required' })
    .trim()
    .min(2, { message: 'Company name must be at least 2 characters' })
    .max(100, { message: 'Company name must be less than 100 characters' }),
});

export const deleteOrganisationSchema = z.object({
  name: z
    .string({ message: 'Company name is required' })
    .trim()
    .min(2, { message: 'Company name must be at least 2 characters' })
    .max(100, { message: 'Company name must be less than 100 characters' }),
});

export type AddOrganisationInput = z.infer<typeof addOrganisationSchema>;