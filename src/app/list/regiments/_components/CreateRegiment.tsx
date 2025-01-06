"use client"
import {Button, Input, Modal, useDisclosure, Textarea} from "@nextui-org/react";
import {ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {AddRegiment} from "@/lib/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import FileInput from "@/app/components/fileUpload";
import Image from "next/image";
import {useEffect, useState} from "react";


export type AddRegimentInputType = z.infer<typeof AddRegiment>;

const CreateRegiment = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const methods = useForm<AddRegimentInputType>({
        resolver: zodResolver(AddRegiment),
        defaultValues: {
            title: "",
            description: "",
            badgeUrl: "",
            battleHonours: [{
                title: "",
                description: "",
                dateStart: new Date("2025-01-01T00:00:00.000Z"),
                dateEnd: new Date("2025-01-01T00:00:00.000Z")
            }
            ],
        },
    });

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
        setPreviewUrl(null);
    }, [image]);

    const onSubmit: SubmitHandler<AddRegimentInputType> = async (data) => {
        console.log(data);
    };


    return (
        <div>
            <button type="button" onClick={onOpen}
                    className=" mt-4 ml-auto block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg items-center">
                <span className="text-sm">Add regiment</span>
            </button>

            <Modal isOpen={isOpen} onClose={onClose}  size="2xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-slate-600">
                        Add new regiment
                    </ModalHeader>
                    <ModalBody>
                        <FormProvider {...methods}>
                            <form
                                className="grid grid-cols-1 gap-3 "
                                onSubmit={methods.handleSubmit(onSubmit, (errors) => console.log(errors))}
                            >
                                <Input
                                    size="lg"
                                    radius="sm"
                                    {...methods.register("title")}
                                    placeholder="Enter title"
                                    />
                                <Textarea
                                    size="lg"
                                    radius="sm"
                                    {...methods.register("description")}
                                    placeholder="Enter description"
                                    minRows={3}
                                    className="mt-3"
                                />
                                <div className="grid grid-cols-2 gap-3 mb-3 mt-3">
                                    <Input
                                        size="lg"
                                        radius="sm"
                                        {...methods.register("battleHonours.0.dateStart")}
                                        type="date"
                                        placeholder="Enter start date"
                                        className="text-slate-500"
                                    />
                                    <Input
                                        size="lg"
                                        radius="sm"
                                        {...methods.register("battleHonours.0.dateEnd")}
                                        type="date"
                                        placeholder="Enter end date"
                                        className="text-slate-500"
                                    />
                                </div>

                                <FileInput
                                    onChange={(e) => setImage((e.target as HTMLInputElement).files?.[0] || null)}
                                />
                                {previewUrl && (
                                    <Image
                                        src={previewUrl}
                                        alt="Preview"
                                        width={200}
                                        height={200}
                                        className="rounded"
                                    />
                                )}
                            </form>
                        </FormProvider>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}
                                size="md"
                                radius="sm"
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            size="md"
                            radius="sm"
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