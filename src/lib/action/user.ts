"use server"

import {User} from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique(
        {
            where: {
                id,
            }
        }
    );
}