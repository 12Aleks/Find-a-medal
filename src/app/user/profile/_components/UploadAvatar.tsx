"use client"
import EditIcon from '@mui/icons-material/Edit';
import {Button, useDisclosure} from "@nextui-org/react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import FileInput from "@/app/components/fileUpload";
import {useState} from "react";
import Image from "next/image";

interface IProps {
    unitId?: string
    setBadgeImage: (badgeImage: File) => void
}

const UploadAvatar = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [image, setImage] = useState<File | null>(null);

    return (
        <div className="absolute z-100 bottom-0 right-0">
            <button className="btn btn-primary w-15 h-15 border-1 border-slate-700 rounded-2xl pl-1 pr-1 pt-0.5 pb-0.5 bg-white"
             onClick={onOpen}>
                <EditIcon className="h-5 w-5 text-slate-700 hover:text-slate-900 transition-colors duration-200" />
            </button>
            <Modal
                size="sm"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-slate-600">Upload Avatar</ModalHeader>
                            <ModalBody>
                                <FileInput onChange={e => setImage((e as any).target.files[0])}/>
                                {image && <Image src={URL.createObjectURL(image)} alt="image"/>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button className="bg-slate-700 hover:bg-slate-800 transition-background text-white" onPress={onClose}>
                                    Change Avatar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UploadAvatar;