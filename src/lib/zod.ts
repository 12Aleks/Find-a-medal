import {z} from "zod";
import {TableColumn} from "@nextui-org/table";
//import validator from "validator";

export const AddUserFormSchema = z.object({
    nickName: z.string().min(3, 'Min length 3 symbols'),
    firstName: z.string().min(3, 'Min length 3 symbols'),
    lastName: z.string().min(3, 'Min length 3 symbols'),
    email: z.string().email('Please enter a valid email address'),
    avatarUrl: z.string(),
    interests: z.string(),
    skype: z.string(),
    facebook: z.string(),
    phone: z.string(),
    x: z.string(),
    youtube: z.string(),
});

export const AddAwarded = z.object({
    firstName: z.string().min(3, 'Min length 3 symbols'),
    lastName: z.string().min(3, 'Min length 3 symbols'),
    serviceNumber: z.string().min(2, 'Min length 2 symbols').optional().or(z.literal('')),
    regiments: z.array(z.string()).optional().or(z.literal('')),
    medals: z.array(z.string()),
})

export const AddMedal = z.object({
    title: z.string().min(3, 'Min length 3 symbols'),
    established: z.string().min(3, 'Min length 3 symbols'),
    clasps: z.array(
        z.object({
            title: z.string().min(1, "Clasp title is required").optional().or(z.literal('')),
            description: z.string().min(1, "Clasp description is required").optional().or(z.literal('')),
        }),
    ).optional(),
});

export const AddRegiment = z.object({
    title: z.string().min(3, 'Min length 3 symbols'),
    description: z.string().min(10, 'Min length 3 symbols').optional().or(z.literal('')),
    badgeUrl: z.string().optional().or(z.literal('')),
    vcRecipients: z.array(
        z.object({
            firstName: z.string(),
            lastName:  z.string(),
            campaign: z.string(),
            dateOfAction: z.string().transform((str) => new Date(str)),
        })
    ),
    battleHonours: z.array(
        z.object({
            title: z.string(),
            description: z.string().optional().or(z.literal('')),
            dateStart: z.string().transform((str) => new Date(str)),
            dateEnd : z.string().transform((str) => new Date(str)),
        })
    ),
})