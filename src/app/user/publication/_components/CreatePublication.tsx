"use client"
import {Button, Input, Modal, Select, SelectItem, useDisclosure} from "@nextui-org/react";
import {ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {AddAwarded} from "@/lib/zod";
import {z} from "zod";


export type AddAwardedInputType = z.infer<typeof AddAwarded>;


interface IProps {
    medals: { id: string; title: string }[];
    regiments: { id: string; title: string }[];
}

const CreatePublication: React.FC<IProps> = ({ medals, regiments}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const methods = useForm<AddAwardedInputType>({
        defaultValues: {
            firstName: "",
            lastName: "",
            serviceNumber: "",
            medals: [], // Initialize as empty arrays
            regiments: [],
        },
    });

    const onSubmit: SubmitHandler<AddAwardedInputType> = async (data) => {
        console.log(data);
    };

    return (
        <div>
            <button type="button" onClick={onOpen}
                    className=" mt-4 ml-auto block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg items-center">
                <span className="text-sm">Add new data</span>
            </button>

            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-slate-600">
                        Add new information
                    </ModalHeader>
                    <ModalBody>
                        <FormProvider {...methods}>
                            <form className="grid grid-cols-2 gap-3"
                                  onSubmit={methods.handleSubmit(onSubmit, (errors) => console.log(errors))}>
                                <Input
                                    size="sm"
                                    radius="sm"
                                    {...methods.register("serviceNumber")}
                                    type="text"
                                    label="Enter service number"
                                    className="col-span-2 rounded-lg"
                                />
                                <Input
                                    size="sm"
                                    radius="sm"
                                    {...methods.register("firstName")}
                                    type="text"
                                    label="Enter first name"
                                    className="mt-3"
                                />
                                <Input
                                    size="sm"
                                    {...methods.register("lastName")}
                                    type="text"
                                    label="Enter last name"
                                    radius="sm"
                                    className="mt-3"
                                />
                                <Select
                                    size="sm"
                                    radius="sm"
                                    label="Select medal"
                                    className="text-gray-900 mt-3"

                                    onChange={(event) => {
                                        const selectedMedals = methods.getValues("medals") || [];
                                        const value = (event.target as HTMLSelectElement).value; // Safely access the value
                                        methods.setValue("medals", [...selectedMedals, value]);
                                    }}
                                >
                                    {medals.map((medal) => (
                                        <SelectItem key={medal.id} value={medal.id}  className="text-gray-900">
                                            {medal.title}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    size="sm"
                                    radius="sm"
                                    label="Select regiment"
                                    className="text-gray-900 mt-3"
                                    onChange={(event) => {
                                        const selectedRegiments = methods.getValues("regiments") || [];
                                        const value = (event.target as HTMLSelectElement).value;
                                        methods.setValue("regiments", [...selectedRegiments, value]);
                                    }}
                                >
                                    {regiments.map((regiment) => (
                                        <SelectItem key={regiment.id} value={regiment.id} className="text-gray-900">
                                            {regiment.title}
                                        </SelectItem>
                                    ))}
                                </Select>

                            </form>
                        </FormProvider>
                    </ModalBody>
                    <ModalFooter className="mt-5">
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

export default CreatePublication;
