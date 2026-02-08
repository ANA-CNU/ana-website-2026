import api from "../lib/axios";

class CustomUploadAdapter {
    loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then((file: File) => new Promise((resolve, reject) => {
                const data = new FormData();
                data.append('image', file);

                api.post('/api/image', data)
                    .then(response => {
                        if (response.data.success) {
                            resolve({
                                default: `${import.meta.env.VITE_SERVER_URL}/api/images/${response.data.image.name}`
                            });
                        } else {
                            reject(response.data.message || 'Upload failed');
                        }
                    })
                    .catch(error => {
                        reject(error.response?.data?.message || 'Upload failed');
                    });
            }));
    }

    abort() {
        // Handle abort if necessary
    }
}

export default CustomUploadAdapter;
