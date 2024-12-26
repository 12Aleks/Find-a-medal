import { Card } from "@nextui-org/react";
import Sidebar from "@/app/components/Sidebar";
import PageTitle from "@/app/components/pageTitle";
import TableRegiments from "@/app/list/regiments/_components/TableRegiments";
import CreateRegiment from "@/app/list/regiments/_components/CreateRegiment";

const RegimentsPage = () => {
    return (
        <div className="flex h-screen justify-start">
            <div className="h-dvh">
                <Sidebar/>
            </div>
            <div className="w-full">
                <PageTitle title="Regiments list" linkCaption="Back to Home Page" href="/"/>

                <Card className="p-3 m-3">
                   <TableRegiments/>
                   <CreateRegiment/>
                </Card>
            </div>

        </div>
    );
};

export default RegimentsPage;