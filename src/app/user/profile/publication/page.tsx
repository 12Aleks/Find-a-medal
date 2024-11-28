import React from 'react';
import Sidebar from "@/app/components/Sidebar";
import PageTitle from "@/app/components/pageTitle";

const PublicationPage = () => {
    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar/>
            </div>
            <div className="w-full">
                <PageTitle title="Your publication" linkCaption="Back to Home Page" href="/"/>
            </div>
        </div>
    );
};

export default PublicationPage;