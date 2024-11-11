import React from 'react';
import {getKindeServerSession, LoginLink, LogoutLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/server";
import {Button} from "@nextui-org/react";
import UserProfilePanel from "@/app/components/UserProfilePanel";
import prisma from "@/lib/prisma";


const SignInPanel = async () => {

   const {isAuthenticated, getUser} = await getKindeServerSession();

    if (await isAuthenticated()) {
        const user = await getUser();
        const dbUser = await prisma.user.findUnique({where: {id: user?.id}});

        return <>{dbUser!! && <UserProfilePanel user={dbUser}/>}</>;
    }

    return (
        <div className="flex gap-3">
            <Button className="second_style">
                <LoginLink className="tracking-wider">Sign In</LoginLink>
            </Button>
            <Button className="primary_style">
                <RegisterLink className="tracking-wider">Sign Up</RegisterLink>
            </Button>
        </div>
    );
};

export default SignInPanel;