// uploadImageToSpace.js

const uploadImageToSpace = async (filePath, imageFile, contentType) => {
    const url = `https://${import.meta.env.VITE_SPACES_NAME}.nyc3.digitaloceanspaces.com/${filePath}`;

    const headers = new Headers({
        'Authorization': `Bearer ${import.meta.env.VITE_SPACES_KEY}:${import.meta.env.VITE_SPACES_SECRET}`,
        'Content-Type': contentType,
    });

    const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: imageFile,
    });

    if (!response.ok) {
        throw new Error(`Error al subir la imagen: ${response.statusText}`);
    }
};

export default uploadImageToSpace;
