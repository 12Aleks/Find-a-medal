"use client"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";

const TableMedals = () => {
    const testArray = [
        {
            index: 1,
            title: "2",
            established: "3",
            clasps: "4",
        },
        {
            index: 2,
            title: "12",
            established: "3",
            clasps: "4",
        },
    ];
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

                {testArray.map((row, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{row.index}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.established}</TableCell>
                        <TableCell>{row.clasps}</TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    );
};

export default TableMedals;