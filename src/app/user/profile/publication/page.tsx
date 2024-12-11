import React from 'react';
import Sidebar from "@/app/components/Sidebar";
import PageTitle from "@/app/components/pageTitle";
import TablePublication from "@/app/user/profile/publication/_components/TablePublication";

const PublicationPage = () => {
    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar/>
            </div>
            <div className="w-full">
                <PageTitle title="Your publication" linkCaption="Back to Home Page" href="/"/>
                <TablePublication />
            </div>
        </div>
    );
};

export default PublicationPage;