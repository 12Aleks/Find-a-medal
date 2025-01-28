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
import {Tooltip} from "@nextui-org/react";
import Link from "next/link";
import {EyeIcon, PencilIcon, TrashIcon} from "@heroicons/react/16/solid";

type Props = {
    users: Prisma.UserGetPayload<{}>[];
}

const TableUsers = ({users}: Props) => {

    return (
        <Table
            isHeaderSticky
            isStriped
            aria-label="Example table with client-side sorting"
            className="w-full pl-3 pr-3 text-slate-600"
        >
            <TableHeader>
                <TableColumn>Index</TableColumn>
                <TableColumn>Last Name</TableColumn>
                <TableColumn>First Name</TableColumn>
                <TableColumn>Nick Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Phone</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Registration date</TableColumn>
                <TableColumn>Last registration date</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
                {users?.map((user, index) => (
                    <TableRow key={user.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.nickName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell>{user.updatedAt.toLocaleDateString()}</TableCell>
                        <TableCell className="flex gap-3">
                            <Tooltip content="Detals">
                                <Link href={`/list/users/${user.id}`}><EyeIcon className="w-5 text-state-500"></EyeIcon></Link>
                            </Tooltip>
                            <Tooltip content="Edit user data" color="warning">
                                <Link href={`/list/users/${user.id}/edit`}>
                                    <PencilIcon className="w-5 text-yellow-500"></PencilIcon>
                                </Link>
                            </Tooltip>
                            <Tooltip content="Delete user" color="danger">
                                <Link href={`/list/users/${user.id}/delete`}>
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

export default TableUsers;