document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const lastname = document.getElementById("lastname").value;
    const studentId = document.getElementById("student-id").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    // Aquí puedes agregar la lógica para procesar el formulario
    console.log("Formulario enviado:");
    console.log("Nombre de usuario:", username);
    console.log("Apellido:", lastname);
    console.log("ID Universitario:", studentId);
    console.log("Teléfono:", phone);
    console.log("Contraseña:", password);

    // Ejemplo de acción posterior
    alert("Registro completado");
});
