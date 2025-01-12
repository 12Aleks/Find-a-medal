"use client"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Tooltip,
} from "@nextui-org/react";
import {Prisma} from "@prisma/client";
import {PencilIcon, TrashIcon, EyeIcon} from "@heroicons/react/16/solid";
import Link from "next/link";

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
                <TableColumn>Action</TableColumn>
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
                        <TableCell className="flex gap-3">
                            <Tooltip content="Detals">
                                <Link href={`/list/medals/${medal.id}`}><EyeIcon className="w-5 text-state-500"></EyeIcon></Link>
                            </Tooltip>
                            <Tooltip content="Edit medal" color="warning">
                                <Link href={`/list/medals/${medal.id}/edit`}>
                                    <PencilIcon className="w-5 text-yellow-500"></PencilIcon>
                                </Link>
                            </Tooltip>
                            <Tooltip content="Delete medal" color="danger">
                                <Link href={`/list/medals/${medal.id}/delete`}>
                                    <TrashIcon className="w-5 text-red-500"></TrashIcon>
                                </Link>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    );
};

export default TableMedals;