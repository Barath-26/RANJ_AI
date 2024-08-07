import { IKContext, IKUpload } from 'imagekitio-react';
import { useRef } from 'react';

// Configuration constants
const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        console.error(`Authentication request failed: ${error.message}`);
        throw error; // Re-throw the error after logging it
    }
};

const Upload = ({ setImg }) => {
    const ikUploadRef = useRef(null);

    const onError = (err) => {
        console.error('Upload Error:', err);
    };

    const onSuccess = (res) => {
        console.log('Upload Success:', res);
        setImg((prev) => ({
            ...prev,
            isLoading: false,
            dbData: res,
            aiData: {} // Assuming you may want to reset aiData or adjust this as needed
        }));
    };

    const onUploadProgress = (progress) => {
        console.log('Upload Progress:', progress);
    };

    const onUploadStart = (evt) => {
        const file = evt.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setImg((prev) => ({
                ...prev,
                isLoading: true,
                aiData: {
                    inlineData: {
                        data: reader.result.split(',')[1],
                        mimeType: file.type,
                    },
                },
            }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <IKContext
            urlEndpoint={urlEndpoint}
            publicKey={publicKey}
            authenticator={authenticator}
        >
            <IKUpload
                fileName="test-upload.png"
                onError={onError}
                onSuccess={onSuccess}
                useUniqueFileName={true}
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                style={{ display: 'none' }}
                ref={ikUploadRef}
            />
            
        </IKContext>
    );
};

export default Upload;
