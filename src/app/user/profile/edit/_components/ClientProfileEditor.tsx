"use client";

import {Input, Card, Button} from "@nextui-org/react";
import {FormProvider, useForm, SubmitHandler} from "react-hook-form";
import {z} from "zod";
import UploadAvatar from "@/app/user/profile/_components/UploadAvatar";
import SectionTitle from "@/app/user/profile/_components/SectionTitle";
import {Avatar, cn} from "@nextui-org/react";
import {AddUserFormSchema} from "@/lib/zod";
import {editUser} from "@/lib/action/user";
import {Textarea} from "@nextui-org/input";

export type AddUserInputType = z.infer<typeof AddUserFormSchema>;

const ClientProfileEditor = ({dbUser}: { dbUser: any }) => {
    const methods = useForm<AddUserInputType>({
        defaultValues: {
            nickName: dbUser?.nickName || "",
            firstName: dbUser?.firstName || "",
            lastName: dbUser?.lastName || "",
            email: dbUser?.email || "",
            phone: dbUser?.phone || "",
            skype: dbUser?.skype || "",
            x: dbUser?.x || "",
            facebook: dbUser?.facebook || "",
            interests: dbUser?.interests || "",
        },
    });

    const onSubmit: SubmitHandler<AddUserInputType> = async (data) => {
        await editUser(dbUser.id, data);
    };


    return (
        <Card className="p-3 m-3">
            <SectionTitle title="Basic information"/>
            <p className="text-slate-800 font-semibol">
                Please note that this information may be viewable to other members. Be careful when
                including any personal details. Any fields marked with a * must be completed.
            </p>
            <div className={cn("gap-3 mt-5 p-3 grid grid-cols-1 md:grid-cols-1 border-0")}>
                <div className="relative w-fit z-10">
                    <Avatar
                        src={dbUser?.avatarUrl ?? "/userProfile.png"}
                        className="w-20 h-20 relative z-0"
                    />
                    <UploadAvatar userId={dbUser?.id!}/>
                </div>
                <FormProvider {...methods}>
                    <form
                        className="pl-3 pr-3 pt-5 pb-3 w-full"
                        onSubmit={methods.handleSubmit(onSubmit, (errors) =>
                            console.log(errors)
                        )}
                    >
                        <Input
                            {...methods.register("nickName")}
                            type="text"
                            placeholder="Enter your display name"
                        />
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-3 pb-3">
                            <Input
                                {...methods.register("firstName")}
                                type="text"
                                placeholder="Enter your first name"
                            />
                            <Input
                                {...methods.register("lastName")}
                                type="text"
                                placeholder="Enter your last name"
                            />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4 pb-3">
                            <Input
                                {...methods.register("email")}
                                type="email"
                                placeholder="Enter your email"
                            />
                            <Input
                                {...methods.register("phone")}
                                type="phone"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-4">
                            <Input
                                {...methods.register("facebook")}
                                type="text"
                                placeholder="Enter your facebook"
                            />
                            <Input
                                {...methods.register("x")}
                                type="text"
                                placeholder="Enter your x"
                            />
                            <Input
                                {...methods.register("skype")}
                                type="text"
                                placeholder="Enter your skype"
                            />
                            <Input
                                {...methods.register("youtube")}
                                type="text"
                                placeholder="Enter your skype"
                            />
                        </div>
                        <Textarea
                            placeholder="Please enter your interests"
                            {...methods.register("interests")}
                            className="w-full mt-6"
                        />
                        <Button type="submit"
                                className="btn  bg-slate-700 hover:bg-slate-800 transition-background text-white mt-5">
                            Save Changes
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </Card>
    )
        ;
};

export default ClientProfileEditor;
