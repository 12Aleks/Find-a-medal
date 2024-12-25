"use client"
import {Button, Input, Modal, useDisclosure} from "@nextui-org/react";
import {ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {FormProvider, SubmitHandler, useFieldArray, useForm, Control} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {AddMedal} from "@/lib/zod";
import {z} from "zod";
import {PencilIcon} from "@heroicons/react/16/solid";

export type AddMedalInputType = z.infer<typeof AddMedal>;

const CreateMedal = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const methods = useForm<AddMedalInputType>({
        resolver: zodResolver(AddMedal),
        defaultValues: {
            title: "",
            established: "",
            clasps: [{title: ""}]
        },
    });

    const {fields: claspFields, append: appendClasp, remove: removeClasp} = useFieldArray({
        control: methods.control,
        name: "clasps",
    });

    const onSubmit: SubmitHandler<AddMedalInputType> = async (data) => {
        console.log(data);
    };

    return (
        <div>
            <button type="button" onClick={onOpen} className=" mt-4 ml-auto block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg items-center">
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
                                onSubmit={methods.handleSubmit(onSubmit, (errors) => console.log(errors))}
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

                                {/* Clasp Fields */}
                                <div>
                                    <h4>Clasps</h4>
                                    {claspFields.map((item, index) => (
                                        <div key={item.id} className="flex gap-2 items-center">
                                            <Input
                                                {...methods.register(`clasps.${index}.title`)}
                                                placeholder={`Clasp ${index + 1}`}
                                            />
                                            <Button
                                                color="danger"
                                                onClick={() => removeClasp(index)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        color="primary"
                                        onClick={() => appendClasp({title: ""})}
                                    >
                                        Add Clasp
                                    </Button>
                                </div>

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

export default CreateMedal;
