import PublicationClient from "@/app/user/publication/_components/PublicationClient";
import { prisma } from "@/lib/prisma";

const PublicationPage = async () => {
    const [medals, regiments] = await Promise.all([
        prisma.medal.findMany(),
        prisma.regiment.findMany(),
    ]);

    return (
        <PublicationClient medals={medals} regiments={regiments} />
    );
};

export default PublicationPage;
