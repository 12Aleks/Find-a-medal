import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET() {
    const {getUser} = await getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
        console.error("No user data found in session");
        return NextResponse.json({ success: false, error: "User data missing" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        }
    });

    if (!dbUser) {
        await prisma.user.create({
            data: {
                id: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
                nikname: "",
            },
        });
        return NextResponse.redirect("http://localhost:3000"); // Or use the correct URL for your app
    }

    return NextResponse.redirect('http://localhost:3000')
}