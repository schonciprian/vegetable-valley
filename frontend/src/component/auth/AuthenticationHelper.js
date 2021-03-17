export const handleShakingError = (id) => {
    document.querySelector(`#${id}`).classList.add("input-error");
    setTimeout(() => {
        document.querySelector(`#${id}`).classList.remove("input-error");
    }, 1000);
}

export const removeError = (event) => {
    event.target.classList.remove("error")
}