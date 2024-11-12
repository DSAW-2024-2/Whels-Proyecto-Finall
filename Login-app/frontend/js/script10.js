// Mostrar la confirmación de cancelación
function showCancelConfirmation() {
    document.getElementById("cancel-confirmation").classList.remove("hidden");
    document.getElementById("cancel-confirmation").classList.add("visible");
}

// Confirmar la cancelación y mostrar el mensaje de éxito
function confirmCancellation() {
    closeModal();
    document.getElementById("cancel-success").classList.remove("hidden");
    document.getElementById("cancel-success").classList.add("visible");

    // Ocultar el mensaje de éxito después de 2 segundos
    setTimeout(() => {
        document.getElementById("cancel-success").classList.remove("visible");
        document.getElementById("cancel-success").classList.add("hidden");
    }, 2000);
}

// Cerrar cualquier modal activo
function closeModal() {
    document.querySelectorAll(".modal").forEach(modal => {
        modal.classList.remove("visible");
        modal.classList.add("hidden");
    });
}
