import Swal from "sweetalert2";
import swal from "sweetalert";


export const registrationFeedback = (title, message, type, timeout, history) => {
    swal(title, message, type);
    setTimeout(() => {
        if (type === "success") {history.push("/login")};
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
