import React from 'react';
import Sidebar from "@/app/components/Sidebar";
import PageTitle from "@/app/components/pageTitle";
import { Card } from "@nextui-org/react";
import prisma from "@/lib/prisma";
import TableUsers from "@/app/list/users/_components/TableUsers";

const UsersPage = async() => {
    const userList = await prisma.user.findMany({});

    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar/>
            </div>
            <div className="w-full">
                <PageTitle title="Users list" linkCaption="Back to Home Page" href="/"/>
                <Card className="p-3 m-3">
                    <TableUsers users={userList}/>
                </Card>
            </div>
        </div>
    );
};

export default UsersPage;