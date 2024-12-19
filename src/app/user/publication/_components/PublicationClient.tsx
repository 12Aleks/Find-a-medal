"use client";
import { Button, Card, useDisclosure } from "@nextui-org/react";
import Sidebar from "@/app/components/Sidebar";
import PageTitle from "@/app/components/pageTitle";
import TablePublication from "@/app/user/publication/_components/TablePublication";
import CreatePublication from "@/app/user/publication/_components/CreatePublication";

interface Props {
    medals: { id: string; title: string }[];
    regiments: { id: string; title: string }[];
}

const PublicationClient: React.FC<Props> = ({ medals, regiments }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar />
            </div>
            <div className="w-full">
                <PageTitle title="Your publication" linkCaption="Back to Home Page" href="/" />
                <Card className="p-3 m-3">
                    <TablePublication />
                    <Button onClick={onOpen} className="mt-5 ml-auto">Add new data</Button>
                </Card>
                <CreatePublication
                    isOpen={isOpen}
                    onClose={onClose}
                    medals={medals}
                    regiments={regiments}
                />
            </div>
        </div>
    );
};

export default PublicationClient;
