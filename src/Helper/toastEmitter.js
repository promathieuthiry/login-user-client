import { toast } from 'react-toastify';

function emitToast(type, message) {
    const options = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    switch (type) {
        case "error":
            toast.error(message, options);
            break;
        case "success":
            toast.success(message, options)
            break;
        default:
            toast(message, options);
    }
}

export default emitToast