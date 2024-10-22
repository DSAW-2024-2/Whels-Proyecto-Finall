document.getElementById('car-register-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('placa', document.getElementById('placa').value);
    formData.append('foto', document.getElementById('foto').files[0]);
    formData.append('capacidad', document.getElementById('capacidad').value);
    formData.append('soat', document.getElementById('soat').value);
    formData.append('marca', document.getElementById('marca').value);
    formData.append('modelo', document.getElementById('modelo').value);

    const response = await fetch('/car/register', {
        method: 'POST',
        body: formData
    });

    const result = await response.text();
    alert(result);
});
