const users = []; // Almacenamiento temporal de usuarios

// Función para encontrar usuarios por nombre de usuario
const findUserByUsername = (username) => {
    return users.find(user => user.username === username);
};

// Función para añadir un nuevo usuario
const addUser = (username, password, role) => {
    const newUser = { username, password, role, carro: null };
    users.push(newUser);
    return newUser;
};

module.exports = { users, findUserByUsername, addUser };
