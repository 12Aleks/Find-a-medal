"use client"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";

const TableRegiments = () => {
    const rowData = [
        { index: 1, title: "Regiment A", description: "Desc A", medals: "Medal A", recipients: "Recipient A", honour: "Honour A" },
        { index: 2, title: "Regiment B", description: "Desc B", medals: "Medal B", recipients: "Recipient B", honour: "Honour B" },
    ];
    console.log(rowData);
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
                <TableColumn>Description</TableColumn>
                <TableColumn>Medals</TableColumn>
                <TableColumn>Recipients</TableColumn>
                <TableColumn>Honour</TableColumn>
            </TableHeader>
            <TableBody>
                {rowData.map((row) => (
                    <TableRow key={row.index}>
                        <TableCell>{row.index}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.medals}</TableCell>
                        <TableCell>{row.recipients}</TableCell>
                        <TableCell>{row.honour}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableRegiments;
