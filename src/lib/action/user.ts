"use server"

import {User} from "@prisma/client";
import prisma from "@/lib/prisma";
import { AddUserInputType } from "@/app/user/profile/edit/_components/ClientProfileEditor";



export async function getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique(
        {
            where: {
                id,
            }
        }
    );
}

export async function updateAvatarUrl(avatarUrl: string, userId: string): Promise<User> {
    return prisma.user.update({
        where:{
            id: userId,
        },
        data: {
            avatarUrl: avatarUrl,
        }
    })
}


export async function editUser(userId: number, data: AddUserInputType ): Promise<void> {
    const user = await prisma.user.update({
        where: {
            id: userId.toString(),
        },
        data: {
            nickName: data.nickName,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            x: data.x,
            facebook: data.facebook,
            skype: data.skype,
            youtube: data.youtube,
        },
    });

    return JSON.parse(JSON.stringify(user));
}