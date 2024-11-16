import React from 'react';
import Sidebar from "@/app/components/Sidebar";
import PageTitle from "@/app/components/pageTitle";
import {Card} from "@mui/material";
import SectionTitle from "@/app/user/profile/_components/sectionTitle";

const EditProfile = () => {
    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar/>
            </div>
            <div className="w-full">
                <PageTitle title="Edit profile" linkCaption="Back to Home Page" href="/"/>
                <Card className="p-3 m-3">
                    <SectionTitle title="Basic information"/>


                </Card>
            </div>
        </div>
    );
};

export default EditProfile;