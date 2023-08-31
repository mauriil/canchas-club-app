import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    forcePathStyle: false,
    endpoint: import.meta.env.VITE_SPACES_ENDPOINT,
    region: "us-east-1",
    credentials: {
        accessKeyId: 'DO00Z3XMDU3TJM7PV823',
        secretAccessKey: 'develop'
    }
});

export { s3Client };
