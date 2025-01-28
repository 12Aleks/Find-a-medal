"use client"
import { Button, Input, Modal, useDisclosure, Textarea } from "@nextui-org/react";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { AddMedal } from "@/lib/zod";
import { z } from "zod";
import { addMedal } from "@/lib/action/medal";
import {useRouter} from "next/navigation";
import {Prisma} from "@prisma/client";
import {useEffect} from "react";

export type AddMedalInputType = z.infer<typeof AddMedal>;

type Props = {
    medal?: Prisma.MedalGetPayload<{
        include: {
            clasps: true;
        };
    }>;
}

const CreateMedal = ({...props}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const methods = useForm<AddMedalInputType>({
        resolver: zodResolver(AddMedal),
        defaultValues: {
            title: props.medal?.title ?? "",
            established: props.medal?.established ?? "",
            clasps: props.medal?.clasps?.map(clasp => ({
                title: clasp.title ?? "",
                description: clasp.description ?? "",
            })) ?? [],
        },
    });

    useEffect(() => {
        if(props.medal?.title) onOpen();
    }, [props.medal?.title])

    const { fields: claspFields, append: appendClasp, remove: removeClasp } = useFieldArray({
        control: methods.control,
        name: "clasps",
    });

    const onSubmit: SubmitHandler<AddMedalInputType> = async (data) => {
        console.log("Form data submitted:", data);
        try {
            await addMedal(data);
            console.log("Medal added successfully");
            router.refresh();
            onClose();
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

            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-slate-600">
                        Add new medal
                    </ModalHeader>
                    <ModalBody>
                        <FormProvider {...methods}>
                            <form
                                className="grid grid-cols-1 gap-3"
                                onSubmit={methods.handleSubmit(onSubmit)}
                            >
                                <Input
                                    size="sm"
                                    radius="sm"
                                    {...methods.register("title")}
                                    type="text"
                                    label="Enter medal name"
                                    isInvalid={!!methods.formState.errors.title}
                                    errorMessage={methods.formState.errors.title?.message}
                                />
                                <Input
                                    size="sm"
                                    radius="sm"
                                    {...methods.register("established")}
                                    type="text"
                                    label="Enter the date the medal was established"
                                    isInvalid={!!methods.formState.errors.established}
                                    errorMessage={methods.formState.errors.established?.message}
                                />
                                <h4 className="text-slate-700 mt-3">Clasps:</h4>
                                <div className="mt-2 max-h-96 overflow-y-auto pl-3 pr-3" >
                                    {claspFields.map((item, index) => (
                                        <div key={item.id} className="flex flex-col gap-2 items-start">
                                            <Input
                                                size="sm"
                                                radius="sm"
                                                {...methods.register(`clasps.${index}.title`)}
                                                label={`Clasp ${index + 1} Title`}
                                                isInvalid={!!methods.formState.errors.clasps?.[index]?.title}
                                                errorMessage={
                                                    methods.formState.errors.clasps?.[index]?.title?.message
                                                }
                                                className="mb-2"
                                            />
                                            <Textarea
                                                size="sm"
                                                radius="sm"
                                                minRows={2}
                                                {...methods.register(`clasps.${index}.description`)}
                                                label={`Clasp ${index + 1} Description`}
                                                isInvalid={
                                                    !!methods.formState.errors.clasps?.[index]?.description
                                                }
                                                errorMessage={
                                                    methods.formState.errors.clasps?.[index]?.description
                                                        ?.message
                                                }
                                                className="mb-1 "
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeClasp(index)}
                                                className="ml-auto mb-3 block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}

                                </div>
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

                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        type="submit"
                                        isDisabled={methods.formState.isSubmitting}
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
