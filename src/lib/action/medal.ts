"use server"
import { AddMedalInputType } from "@/app/list/medals/_components/CreateMedal";
import { Medal } from "@prisma/client";
import prisma from "@/lib/prisma";

export const addMedal = async (createMedalData: AddMedalInputType) => {
    const basic: Omit<Medal, "id" | "awarded"> = {
        title: createMedalData.title,
        established: createMedalData.established,
    };
    const clasps = createMedalData.clasps
        ?.filter((clasp) => clasp.title)
        .map((clasp) => ({
            title: clasp.title!,
            description: clasp.description || "",
        }));

    try {
        const medals = await prisma.medal.create({
            data: {
                ...basic,
                clasps: {
                    create: clasps,
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

export const deleteMedal = async (medalId: string) => {
    const result = await prisma.medal.delete({
        where: {
            id: medalId
        }
    })

    return JSON.parse(JSON.stringify(result));
}
