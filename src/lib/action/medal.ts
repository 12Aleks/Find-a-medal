"use server"
import { AddMedalInputType } from "@/app/list/medals/_components/CreateMedal";
import { Medal } from "@prisma/client";
import prisma from "@/lib/prisma";

export const addMedal = async (createMedalData: AddMedalInputType) => {
    const basic: Omit<Medal, "id" | "awarded"> = {
        title: createMedalData.title,
        established: createMedalData.established,
    };

    try {
        // Create a new medal entry with associated clasps
        const medals = await prisma.medal.create({
            data: {
                ...basic,
                clasps: {
                    create: createMedalData.clasps.map((clasp) => ({
                        title: clasp.title,
                        description: clasp.description,
                    })),
                },
            },
            include: {
                clasps: true,
            },
        });

        console.log("Medal created successfully:", medals);
        return medals;
    } catch (error) {
        console.error("Error creating medal entry:", error);
        throw new Error("Failed to create medal entry");
    }
};
