import Swal from "sweetalert2";
import swal from "sweetalert";


export const authenticationFeedback = (title, message, type, timeout, history, redirect = '/') => {
    swal(title, message, type);
    setTimeout(() => {
        if (type === "success") {history.push(redirect)};
        swal.close();
    }, timeout);
}

export const sweetalertSidePopup = (title, timer) => {
    Swal.fire({
        toast: true,
        icon: 'success',
        title: title,
        showClass: {popup: '', icon: ''},
        hideClass: {popup: '',},
        position: 'top-right',
        showConfirmButton: false,
        timer: timer,
    });
}
