// components/Alert.js
import Swal from "sweetalert2";

const Alert = {
    success: (message) => {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: message,
        });
    },
    error: (message) => {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: message,
        });
    },
    warning: (message) => {
        Swal.fire({
            icon: "warning",
            title: "Warning",
            text: message,
        });
    }
};

export default Alert;
