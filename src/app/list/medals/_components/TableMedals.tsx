"use client"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";
import {Prisma} from "@prisma/client";

type Props = {
    medals: Prisma.MedalGetPayload<{
        include: {
            clasps: true;
        };
    }>[];
}

const TableMedals = ({medals} : Props) => {

    console.log(medals);
    return (
        <Table
            isHeaderSticky
            isStriped
            aria-label="Example table with client-side sorting"
            className="w-full pl-3 pr-3 text-slate-600"
        >
            <TableHeader>
                <TableColumn>Index</TableColumn>
                <TableColumn>Title</TableColumn>
                <TableColumn>Established</TableColumn>
                <TableColumn>Clasps</TableColumn>
            </TableHeader>
            <TableBody>

                {medals?.map((medal, index) => (
                    <TableRow key={medal.title}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{medal.title}</TableCell>
                        <TableCell>{medal.established}</TableCell>
                        <TableCell>
                            {medal.clasps.map((clasp, claspIndex) => clasp.title).join(", ")}
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    );
};

export default TableMedals;