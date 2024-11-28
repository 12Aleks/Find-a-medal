import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {getUserById} from "@/lib/action/user";
import {redirect} from "next/navigation";
import PageTitle from "@/app/components/pageTitle";
import {Card} from "@mui/material";
import SectionTitle from "@/app/user/profile/_components/SectionTitle";
import Sidebar from "@/app/components/Sidebar";
import {Avatar} from "@nextui-org/react";

interface Props {
    title: string;
    value: React.ReactNode;
}

const ProfilePage = async () => {
    const {getUser} = await getKindeServerSession();
    const user = await getUser();

    !user && redirect("/")

    const dbUser = await getUserById(user.id);

    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar/>
            </div>
            <div className="w-full">
            <PageTitle title="Profile" linkCaption="Back to Home Page" href="/"/>
            <Card className="p-3 m-3">
                <SectionTitle title="Basic information"/>
                <div>
                    <Avatar src={dbUser?.avatarUrl ?? "/userProfile.png"} className="w-16 h-16"/>
                    <Attribute title="Nikname" value={`${dbUser?.firstName} ${dbUser?.lastName}`}/>
                    <span className="text-slate-800 text-xs">(If you add a nickname, your name will not render)</span>
                    <Attribute title="Name*" value={`${dbUser?.firstName} ${dbUser?.lastName}`}/>
                    <Attribute title="Email*" value={`${dbUser?.email}`}/>
                    <Attribute title="Joined" value={`${dbUser?.createdAt.toLocaleDateString("En", {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })} ${dbUser?.createdAt.toLocaleTimeString()}`}/>
                    <Attribute title="Last active" value={`${dbUser?.updatedAt.toLocaleTimeString()}`}/>
                    <Attribute title="Total posts" value={1}/>
                </div>
            </Card>
            </div>
        </div>
    );
};

export default ProfilePage;

const Attribute = (props: Props) => {
    return (
        <div className="flex flex-row align-baseline text-sm mt-3 ">
            <span className="text-slate-800 font-semibold mr-1">{props.title}:</span>
            <span className="text-slate-600">{props.value}</span>
        </div>
    )
}