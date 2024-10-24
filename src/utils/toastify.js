import { toast } from "react-toastify"
export const toastifySuccess = (msg = 'Success') => {
    toast.success(msg, {
        position: 'top-center',
        pauseOnHover: false 
    })
}

export const toastifyError = (msg = 'OOPS!!! Something went wrong') => {
    toast.error(msg, {
        position: 'top-center',
        pauseOnHover: false 
    })
}