"use server"
import {AddAwardedInputType} from "@/app/user/publication/_components/CreatePublication";
import {Awarded} from "@prisma/client";
import prisma from "@/lib/prisma";

export const createAwarded = async (publicationData: AddAwardedInputType, userId: string) => {
    const basic: Omit<Awarded, "id" | "createdAt" | "updatedAt"> = {
        firstName: publicationData.firstName,
        lastName: publicationData.lastName,
        serviceNumber: publicationData.serviceNumber,
        userId
    }

    try {
        const awarded = await prisma.awarded.create({
            data: {
             ...basic,
                medals: {
                    connect: publicationData.medals.map((medalId) => ({ id: medalId })),
                },
                regiments: {
                    connect: publicationData.regiments.map((regimentId) => ({ id: regimentId })),
                },
            },
        });

        return awarded;
    } catch (error) {
        console.error("Error creating awarded entry:", error);
        throw new Error("Failed to create awarded entry");
    }
}