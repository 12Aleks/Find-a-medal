"use client"
import {Button, Input, Modal, useDisclosure} from "@nextui-org/react";
import {ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {AddRegiment} from "@/lib/zod";
import {zodResolver} from "@hookform/resolvers/zod";


export type AddRegimentInputType = z.infer<typeof AddRegiment>;

const CreateRegiment = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const methods = useForm<AddRegimentInputType>({
        resolver: zodResolver(AddRegiment),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit: SubmitHandler<AddRegimentInputType> = async (data) => {
        console.log(data);
    };


    return (
        <div>
            <button type="button" onClick={onOpen}
                    className=" mt-4 ml-auto block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg items-center">
                <span className="text-sm">Add regiment</span>
            </button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-slate-600">
                        Add new information
                    </ModalHeader>
                    <ModalBody>
                        <FormProvider {...methods}>
                            <form
                                className="grid grid-cols-1 gap-3"
                                onSubmit={methods.handleSubmit(onSubmit, (errors) => console.log(errors))}
                            >
                                <Input
                                    {...methods.register("title")}
                                    type="text"
                                    placeholder="Enter regiment name"
                                />
                                <Input
                                    {...methods.register("description")}
                                    type="text"
                                    placeholder="Enter the description"
                                />


                            </form>
                        </FormProvider>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button
                            type="submit"
                            className="bg-slate-700 hover:bg-slate-800 transition-background text-white"
                        >
                            Save Data
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreateRegiment;