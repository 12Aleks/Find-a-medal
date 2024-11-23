import Sidebar from "@/app/components/Sidebar";
import PageTitle from "@/app/components/pageTitle";
import {Card, Input} from "@mui/material";
import SectionTitle from "@/app/user/profile/_components/SectionTitle";
import {MailIcon} from "@nextui-org/shared-icons";
import {Avatar, cn} from "@nextui-org/react";
import {useFormContext} from "react-hook-form";
import { z } from "zod";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";
import {getUserById} from "@/lib/action/user";
import UploadAvatar from "@/app/user/profile/_components/UploadAvatar";

// type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>;

const EditProfile = async () => {
    const {getUser} = await getKindeServerSession();
    const user = await getUser();
    const dbUser = await getUserById(user.id);

    !user && redirect("/")
    // const {register, trigger,  getValues, formState: {errors}} = useFormContext<AddPropertyInputType>()
    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar/>
            </div>
            <div className="w-full">
                <PageTitle title="Edit profile" linkCaption="Back to Home Page" href="/"/>
                <Card className="p-3 m-3">
                    <SectionTitle title="Basic information"/>
                    <p className="text-slate-800 font-semibol">Please note that this information may be viewable to
                        other members. Be careful when including any personal details. Any fields marked with a * must
                        be completed.
                    </p>
                    <div className={cn("gap-3 mt-5 p-3 grid grid-cols-1 md:grid-cols-3 border-0")}>
                        <div className="relative w-fit z-10">
                            <Avatar src={dbUser?.avatarUrl ?? "/userProfile.png"} className="w-20 h-20 relative z-0"/>
                            <UploadAvatar />
                        </div>

                    </div>

                </Card>
            </div>
        </div>
    );
};

export default EditProfile;