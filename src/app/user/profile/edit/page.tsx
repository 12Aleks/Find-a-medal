import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserById } from "@/lib/action/user";
import ClientProfileEditor from "./_components/ClientProfileEditor";
import Sidebar from "@/app/components/Sidebar";
import PageTitle from "@/app/components/pageTitle";
import {redirect} from "next/navigation";

const EditProfile = async () => {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();
    if (!user) {
        redirect("/");
    }

    const dbUser = await getUserById(user.id);

    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar />
            </div>
            <div className="w-full">
                <PageTitle title="Edit profile" linkCaption="Back to Home Page" href="/" />
                <ClientProfileEditor dbUser={dbUser} />
            </div>
        </div>
    );
};

export default EditProfile;