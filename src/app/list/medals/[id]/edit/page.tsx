import React from 'react';
import prisma from "@/lib/prisma";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {notFound, redirect} from "next/navigation";
import CreateMedal from "@/app/list/medals/_components/CreateMedal";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

const EditMedalPage = async({ params }: Props) => {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { getUser } = getKindeServerSession();
    const medalData = prisma.medal.findUnique({
        where: { id },
        include: { clasps: true },
    });

    const [medal, user] = await Promise.all([medalData, getUser()]);

    if (!medal) return notFound();
    if (!user) redirect("/unauthorized");

    return <CreateMedal medal={medal} />;
};

export default EditMedalPage;