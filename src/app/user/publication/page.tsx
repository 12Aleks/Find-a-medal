import { prisma } from "@/lib/prisma";
import Sidebar from "@/app/components/Sidebar";
import PageTitle from "@/app/components/pageTitle";
import {Card} from "@nextui-org/card";
import TablePublication from "@/app/user/publication/_components/TablePublication";
import CreatePublication from "@/app/user/publication/_components/CreatePublication";

const PublicationPage = async () => {
    const [medals, regiments] = await Promise.all([
        prisma.medal.findMany(),
        prisma.regiment.findMany(),
    ]);

    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar/>
            </div>
            <div className="w-full">
                <PageTitle title="Your publication" linkCaption="Back to Home Page" href="/"/>
                <Card className="p-3 m-3">
                    <TablePublication/>
                    <CreatePublication
                        medals={medals}
                        regiments={regiments}
                    />
                </Card>

            </div>
        </div>
    );
};

export default PublicationPage;
