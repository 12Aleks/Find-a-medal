
import {Button, Input, Modal, Select, SelectItem} from "@nextui-org/react";
import {ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {AddAwarded} from "@/lib/zod";
import {z} from "zod";


export type AddAwardedInputType = z.infer<typeof AddAwarded>;


interface IProps {
    isOpen: boolean;
    onClose: () => void;
    medals: { id: string; title: string }[];
    regiments: { id: string; title: string }[];
}

const CreatePublication: React.FC<IProps> = ({ isOpen, onClose, medals, regiments }) => {
    const methods = useForm<AddAwardedInputType>({
        defaultValues: {
            firstName: "",
            lastName: "",
            serviceNumber: "",
            medals: { title: "" },
            regiments: { title: "" },
        },
    });

    const onSubmit: SubmitHandler<AddAwardedInputType> = async (data) => {
        // Handle form submission
        console.log(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-slate-600">
                    Add new information
                </ModalHeader>
                <ModalBody>
                    <FormProvider {...methods}>
                        <form className="grid grid-cols-2 gap-3"
                            onSubmit={methods.handleSubmit(onSubmit, (errors) => console.log(errors))}>
                            <Input
                                {...methods.register("serviceNumber")}
                                type="text"
                                placeholder="Enter service number"
                                className="col-span-2"
                            />
                            <Input
                                {...methods.register("firstName")}
                                type="text"
                                placeholder="Enter first name"
                            />
                            <Input
                                {...methods.register("lastName")}
                                type="text"
                                placeholder="Enter last name"
                            />
                            <Select {...methods.register("medals", { setValueAs: (v: any) => v.toString() })}>
                                {medals.map((medal) => (
                                    <SelectItem key={medal.id} value={medal.id}>
                                        {medal.title}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select {...methods.register("regiments", { setValueAs: (v: any) => v.toString() })}>
                                {regiments.map((regiment) => (
                                    <SelectItem key={regiment.id} value={regiment.id}>
                                        {regiment.title}
                                    </SelectItem>
                                ))}
                            </Select>
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
    );
};

export default CreatePublication;
