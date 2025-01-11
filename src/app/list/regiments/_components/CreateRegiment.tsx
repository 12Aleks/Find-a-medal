"use client"
import {Button, Input, Modal, useDisclosure, Textarea} from "@nextui-org/react";
import {ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {AddRegiment} from "@/lib/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import FileInput from "@/app/components/fileUpload";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {addRegiment} from "@/lib/action/regiment";


export type AddRegimentInputType = z.infer<typeof AddRegiment>;

const CreateRegiment = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const router = useRouter();

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
            }],
            vcRecipients: [{
                firstName: "",
                lastName: "",
                campaign: "",
                dateOfAction: new Date("2025-01-01T00:00:00.000Z"),
            }]
        },
    });

    const {fields: battleHonours, append: appendBattle, remove: removeBattle} = useFieldArray({
        control: methods.control,
        name: "battleHonours",
    });

    const {fields: vcRecipients, append: appendRecipient, remove: removeRecipient} = useFieldArray({
        control: methods.control,
        name: "vcRecipients"
    })

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

        try {
            await addRegiment(data);
            console.log("Regiment added successfully");
            router.refresh()
            onClose()
        } catch (error) {
            console.error("Error adding regiment:", error);
        }
    };


    return (
        <div>
            <button type="button" onClick={onOpen}
                    className=" mt-4 ml-auto block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg items-center">
                <span className="text-sm">Add regiment</span>
            </button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-slate-600">
                        Add new regiment
                    </ModalHeader>
                    <ModalBody>
                        <FormProvider {...methods}>
                            <form
                                className="grid grid-cols-1 gap-3"
                                onSubmit={methods.handleSubmit(onSubmit, (errors) => console.log(errors))}
                            >
                                <Input
                                    size="sm"
                                    radius="sm"
                                    {...methods.register("title")}
                                    label="Enter title"
                                />
                                <Textarea
                                    size="sm"
                                    radius="sm"
                                    {...methods.register("description")}
                                    label="Enter description"
                                    minRows={3}
                                    className="mt-3"
                                />
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
                                <div className="mt-3 pt-3 border-t-1 border-t-gray-200">
                                    <h4 className="text-slate-700 text-center mb-3 text-md">Battle honour:</h4>
                                    {battleHonours.map((battle, index) => (
                                        <div key={battle.id} className="flex flex-col gap-2 items-start">
                                            <Input
                                                size="sm"
                                                radius="sm"
                                                {...methods.register(`battleHonours.${index}.title`)}
                                                label={`Battle ${index + 1} Title`}
                                                className="mb-2"
                                            />
                                            <Textarea
                                                size="sm"
                                                radius="sm"
                                                minRows={2}
                                                {...methods.register(`battleHonours.${index}.description`)}
                                                label={`Battle ${index + 1} Description`}
                                                className="mb-1"
                                            />
                                            <div className="w-full grid grid-cols-2 gap-3 mb-2 mt-1">
                                                <Input
                                                    size="sm"
                                                    radius="sm"
                                                    {...methods.register(`battleHonours.${index}.dateStart`)}
                                                    type="date"
                                                    label="Enter start date"
                                                    className="text-slate-500"
                                                />
                                                <Input
                                                    size="sm"
                                                    radius="sm"
                                                    {...methods.register(`battleHonours.${index}.dateEnd`)}
                                                    type="date"
                                                    label="Enter end date"
                                                    className="text-slate-500"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeBattle(index)}
                                                className="ml-auto mb-4 block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            appendBattle({
                                                title: "",
                                                description: "",
                                                dateStart: new Date("2025-01-01T00:00:00.000Z"),
                                                dateEnd: new Date("2025-01-01T00:00:00.000Z"),
                                            })
                                        }
                                        className="mt-4 block bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg items-center"
                                    >
                                        <span className="text-sm mb-4">Add Battle</span>
                                    </button>
                                </div>
                                <div className="mt-3 pt-3 border-t-1 border-t-gray-200">
                                    <h4 className="text-slate-700 text-center mb-3 text-md">Victoria Cross
                                        recipients:</h4>
                                    {vcRecipients.map((recipient, index) => (
                                        <div key={recipient.id} className="flex flex-col gap-2 items-start">
                                            <div className="w-full grid grid-cols-2 gap-3 mb-2 mt-1">
                                                <Input
                                                    size="sm"
                                                    radius="sm"
                                                    {...methods.register(`vcRecipients.${index}.firstName`)}
                                                    label={`First Name`}
                                                    className="mb-2"
                                                />
                                                <Input
                                                    size="sm"
                                                    radius="sm"
                                                    {...methods.register(`vcRecipients.${index}.lastName`)}
                                                    label={`Last Name`}
                                                    className="mb-2"
                                                />
                                            </div>
                                            <Input
                                                size="sm"
                                                radius="sm"
                                                {...methods.register(`vcRecipients.${index}.campaign`)}
                                                label={`Campaign name`}
                                                className="mb-2"
                                            />
                                            <Input
                                                size="sm"
                                                radius="sm"
                                                {...methods.register(`vcRecipients.${index}.dateOfAction`)}
                                                type="date"
                                                label="Enter start date"
                                                className="text-slate-500"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeBattle(index)}
                                                className="ml-auto mb-4 block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            appendBattle({
                                                title: "",
                                                description: "",
                                                dateStart: new Date("2025-01-01T00:00:00.000Z"),
                                                dateEnd: new Date("2025-01-01T00:00:00.000Z"),
                                            })
                                        }
                                        className="mt-4 block bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg items-center"
                                    >
                                        <span className="text-sm mb-4">Add Battle</span>
                                    </button>
                                </div>

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