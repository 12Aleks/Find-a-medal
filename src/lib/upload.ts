import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {revalidatePath} from "next/cache";

type UploadImageToS3Payload = {
    keyPrefix: string;
};

export async function uploadImageToS3(
    formData: FormData,
    payload: UploadImageToS3Payload
): Promise<{ fileName: string; url: string }[]> {
    const s3 = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
        },
    });

    const bucket = process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_NAME as string;
    if (!bucket) {
        throw new Error("Bucket name is not defined in environment variables.");
    }

    try {
        const files = formData.getAll("file") as File[];

        const responses = await Promise.all(
            files.map(async (file) => {
                const fileKey = `${payload.keyPrefix}/${Date.now()}-${file.name}`;

                const arrayBuffer = await file.arrayBuffer();
                const fileParams = {
                    Bucket: bucket,
                    Key: fileKey,
                    Body: file,
                    ContentType: file.type,
                };

                const command = new PutObjectCommand(fileParams);
                await s3.send(command);

                const fileUrl = `https://${bucket}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`;

                return { fileName: file.name, url: fileUrl };
            })
        );


        return responses;
    } catch (error) {
        console.error("Error uploading images to S3:", error);
        throw new Error("Failed to upload images to S3.");
    }
}