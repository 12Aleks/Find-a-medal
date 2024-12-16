import React from 'react';
import {Button, Input, Modal} from "@nextui-org/react";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import {z} from "zod";
import {AddAwarded} from "@/lib/zod";
import {useForm} from "react-hook-form";


interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export type AddAwardedInputType = z.infer<typeof AddAwarded>;

const CreatePublication: React.FC<IProps> = ({ isOpen, onClose }: IProps) => {
    const methods = useForm<AddAwardedInputType>({
        defaultValues: {
            firstName:  "",
            lastName: "",
            serviceNumber:  "",
            medals:  {
                title: ""
            },
            regiments: {title: ""}
        },
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1 text-slate-600">
                        Add new information
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            {...methods.register("serviceNumber")}
                            type="text"
                            placeholder="Enter your display name"
                        />
                        <Input
                            {...methods.register("firstName")}
                            type="text"
                            placeholder="Enter your display name"
                        />
                        <Input
                            {...methods.register("lastName")}
                            type="text"
                            placeholder="Enter your display name"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button
                            className="bg-slate-700 hover:bg-slate-800 transition-background text-white"
                        >
                            Save Data
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default CreatePublication;
