import React from "react";
import { ToastContainer } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";

const Toast: React.FC = () => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default Toast;
