import {Button, Card, useDisclosure} from "@nextui-org/react";
import Sidebar from "@/app/components/Sidebar";
import PageTitle from "@/app/components/pageTitle";
import TableMedals from "@/app/list/medals/_components/TableMedals";
import CreateMedal from "@/app/list/medals/_components/CreateMedal";
import prisma from "@/lib/prisma";

const MedalsPage = async() => {
    const medalList = await prisma.medal.findMany({
        include: {
            clasps: true,
        }
    });



    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar/>
            </div>
            <div className="w-full">
                <PageTitle title="Medals list" linkCaption="Back to Home Page" href="/"/>
                <Card className="p-3 m-3">
                    <TableMedals medals={medalList} />
                    <CreateMedal/>
                </Card>
            </div>
        </div>
    );
};

export default MedalsPage;