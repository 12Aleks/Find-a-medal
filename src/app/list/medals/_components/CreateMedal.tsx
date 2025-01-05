"use client"
import { Button, Input, Modal, useDisclosure } from "@nextui-org/react";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { AddMedal } from "@/lib/zod";
import { z } from "zod";
import { addMedal } from "@/lib/action/medal";

export type AddMedalInputType = z.infer<typeof AddMedal>;

const CreateMedal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const methods = useForm<AddMedalInputType>({
        resolver: zodResolver(AddMedal),
        defaultValues: {
            title: "",
            established: "",
            clasps: [{ title: "", description: "" }],
        },
    });

    const { fields: claspFields, append: appendClasp, remove: removeClasp } = useFieldArray({
        control: methods.control,
        name: "clasps",
    });

    const onSubmit: SubmitHandler<AddMedalInputType> = async (data) => {
        console.log("Form data submitted:", data); // Ensure the data is being passed correctly
        try {
            await addMedal(data); // Call your action here
            console.log("Medal added successfully");
        } catch (error) {
            console.error("Error adding medal:", error);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={onOpen}
                className="mt-4 ml-auto block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg items-center"
            >
                <span className="text-sm">Add medal</span>
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
                                onSubmit={methods.handleSubmit(onSubmit)} // Ensure this is correctly wired
                            >
                                <Input
                                    {...methods.register("title")}
                                    type="text"
                                    placeholder="Enter medal name"
                                />
                                <Input
                                    {...methods.register("established")}
                                    type="text"
                                    placeholder="Enter the date the medal was established"
                                />

                                <div className="mt-3">
                                    <h4 className="text-slate-700">Clasps:</h4>
                                    {claspFields.map((item, index) => (
                                        <div key={item.id} className="flex flex-col gap-2 items-start">
                                            <Input
                                                {...methods.register(`clasps.${index}.title`)}
                                                placeholder={`Clasp ${index + 1} Title`}
                                                className="mb-2"
                                            />
                                            <Input
                                                {...methods.register(`clasps.${index}.description`)}
                                                placeholder={`Clasp ${index + 1} Description`}
                                                className="mb-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeClasp(index)}
                                                className="ml-auto block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            appendClasp({
                                                title: "",
                                                description: "",
                                            })
                                        }
                                        className="mt-4 block bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg items-center"
                                    >
                                        <span className="text-sm">Add Clasp</span>
                                    </button>
                                </div>

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
                            </form>
                        </FormProvider>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreateMedal;
