import {deleteMedal} from "@/lib/action/medal";
import { notFound, redirect } from "next/navigation";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import SubmitButton from "@/app/components/SubmitButton";

interface Props {
    params: Promise<{ id: string }>;
}

const DeleteMedalPage = async ({ params }: Props) => {
    const resolvedParams = await params;
    const { getUser } = getKindeServerSession();
    const medalPromise = prisma.medal.findUnique({
        where: {
            id: resolvedParams.id,
        },
    });
    const [medals, user] = await Promise.all([medalPromise, getUser()]);

    if (!medals) return notFound();
    if (!user ) redirect("/unauthorized");

    const deleteAction = async () => {
        "use server";
        try {
            await deleteMedal(resolvedParams.id);
            redirect("/list/medals");
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100" style={{height: "calc(100vh - 65px)"}}>
            <form action={deleteAction}
                  className="flex flex-col items-center justify-center bg-gray-200 border-1 border-gray-300 p-5 rounded-md">
                <p className="text-slate-700 mb-3">Are you sure to delete this medal?</p>
                <p>
                    <span className="text-slate-400">Title: </span>{" "}
                    <span className="text-slate-700">{medals.title}</span>
                </p>
                <div className="flex justify-center gap-3 mt-5">
                    <Link href={"/list/medals"}>
                        <Button>Cancel</Button>
                    </Link>
                    <SubmitButton type="submit" color="danger" variant="bordered">
                        Delete
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default DeleteMedalPage;