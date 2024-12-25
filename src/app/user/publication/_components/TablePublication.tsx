"use client";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";


const TablePublication = () => {
    const items = [
        { id: 1, serviceNumber: "1234", firstName: "John", lastName: "Dou", medals: ["77"], regiments: ["19BBY"] },
        { id: 2, serviceNumber: "3234", firstName: "Nick", lastName: "Karter", medals: ["77", "67"], regiments: ["19BBY"] },
        { id: 3, serviceNumber: "1234", firstName: "Samuel", lastName: "Smitt", medals: ["77", "66"], regiments: ["19BBY"] },
        { id: 4, serviceNumber: "1234", firstName: "Luke", lastName: "Skywalker", medals: ["77", "45"], regiments: ["19BBY"] },
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
                <TableColumn>Service number</TableColumn>
                <TableColumn>First name</TableColumn>
                <TableColumn>Last name</TableColumn>
                <TableColumn>Medals</TableColumn>
                <TableColumn>Regiments</TableColumn>
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.serviceNumber}</TableCell>
                        <TableCell>{item.firstName}</TableCell>
                        <TableCell>{item.lastName}</TableCell>
                        <TableCell>{item.medals.join(", ")}</TableCell>
                        <TableCell>{item.regiments.join(", ")}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TablePublication;
