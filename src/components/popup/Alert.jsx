// // components/Alert.js
// import Swal from "sweetalert2";

// const Alert = {
//     success: (message) => {
//         Swal.fire({
//             icon: "success",
//             title: "Success",
//             text: message,
//         });
//     },
//     error: (message) => {
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: message,
//         });
//     },
//     warning: (message) => {
//         Swal.fire({
//             icon: "warning",
//             title: "Warning",
//             text: message,
//         });
//     }
// };

// export default Alert;

// components/Alert.js
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Alert = {
    success: (message) => {
        Swal.fire({
            icon: "success",
            title: message,
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    },
    error: (message) => {
        Swal.fire({
            icon: "error",
            title: message,
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    },
    warning: (message) => {
        Swal.fire({
            icon: "warning",
            title: message,
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    },
};

export default Alert;
