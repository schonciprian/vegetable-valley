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

export const sweetalertErrorPopup = (title, message, type, timeout) => {
    swal(title, message, type);
    setTimeout(() => {
        swal.close();
    }, timeout);
}

export const requestFeedbackError = (error, redirect, history) => {
    switch (true) {
        case error === undefined && redirect:
            sweetalertErrorPopup("Service unavailable", "Try again later, you are redirected to main page", "error", 4000)
            setTimeout(() => {
                history.push('/')
            }, 4000);
            break;

        case error === undefined && !redirect:
            sweetalertErrorPopup("Service unavailable", "Try again later", "error", 4000)
            break;

        default:
            sweetalertErrorPopup("Service unavailable", "Try again later", "error", 4000)
    }
}

//////////////////////
//                  //
// Refactored Swals //
//                  //
//////////////////////

export const serviceUnavailablePopUp = (title, message, timeout) => {
    swal(title, message, 'error');
    setTimeout(() => {swal.close()}, timeout);
}

export const authenticationFeedbackPopUp = (title, message, type, timeout, history, redirect = '/') => {
    swal(title, message, type);
    setTimeout(() => {
        if (type === "success") {history.push(redirect)};
        swal.close();
    }, timeout);
}
