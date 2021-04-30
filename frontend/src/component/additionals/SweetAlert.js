import Swal from "sweetalert2";

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
