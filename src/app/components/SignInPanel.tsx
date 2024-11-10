import React from 'react';
import {getKindeServerSession, LoginLink, LogoutLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/server";
import {Button} from "@nextui-org/react";


const SignInPanel = async () => {

   const {isAuthenticated, getUser} = await getKindeServerSession();

    if (await isAuthenticated()) {
        const user = await getUser();
        return <>Hello {user?.given_name}  <Button className="third_style">
            <LogoutLink className="tracking-wider">Log out</LogoutLink>
        </Button></>;
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