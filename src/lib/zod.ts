import {z} from "zod";
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
})