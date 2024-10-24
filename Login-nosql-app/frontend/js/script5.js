document.getElementById('conductor').addEventListener('click', async () => {
    const response = await fetch('/verificar-rol', { method: 'POST' });
    const result = await response.json();

    if (result.success) {
        window.location.href = result.redirectUrl;
    } else {
        alert('Error al verificar el rol');
    }
});

document.getElementById('pasajero').addEventListener('click', () => {
    window.location.href = '/passenger/index.html';
});
