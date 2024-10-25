# Bakend-proyectofinal
# API REST con Autenticación - Express.js

## 📝 Descripción
Proyecto de desarrollo backend que implementa un sistema de autenticación y registro de usuarios utilizando Express.js. El sistema permite a los usuarios registrarse, iniciar sesión y acceder a rutas protegidas sin utilizar una base de datos.

## 🎯 Objetivos
- Implementar sistema de registro y autenticación
- Proteger rutas mediante JWT
- Manejar almacenamiento en memoria
- Aplicar validaciones de datos
- Implementar manejo de errores

## 🛠️ Endpoints

### 1. Registro de Usuario
```http
POST /register
```
**Body:**
```json
{
    "username": "Nombre de usuario",
    "lastName": "Apellido",
    "email": "Correo electrónico",
    "universityId": "ID universitario",
    "phone": "Teléfono",
    "password": "Contraseña"
}
```

### 2. Inicio de Sesión
```http
POST /login
```
**Body:**
```json
{
    "username": "Nombre de usuario",
    "password": "Contraseña"
}
```

### 3. Obtener Información de Usuario (Ruta Protegida)
```http
GET /user-info/:id
```
**Headers:**
```
Authorization: Bearer <token>
```
**Respuesta:**
```json
{
    "username": "Nombre de usuario",
    "lastName": "Apellido",
    "email": "Correo del estudiante",
    "universityId": "ID universitario",
    "phone": "Teléfono"
}
```

## 📋 Requisitos Técnicos

### Dependencias Requeridas
- express
- jsonwebtoken
- bcryptjs
- express-validator
- dotenv

### Características Necesarias
- Validación de campos en registro
- Encriptación de contraseñas
- Generación y validación de JWT
- Middleware de autenticación
- Almacenamiento en memoria (sin base de datos)

## 🚀 Instrucciones de Instalación

1. Clonar el repositorio
```bash
git clone 
```

2. Instalar dependencias
```bash
npm install
```

3. Crear archivo .env
```env
PORT=3000
JWT_SECRET=tu_clave_secreta
```

4. Iniciar el servidor
```bash
npm start
```

## ✅ Criterios de Evaluación

|
 Criterio 
|
 Puntuación 
|
|
----------
|
------------
|
|
 Implementación del registro 
|
 1.0 
|
|
 Implementación del login 
|
 1.0 
|
|
 Protección de rutas y JWT 
|
 1.0 
|
|
 Validaciones y manejo de errores 
|
 1.0 
|
|
 Buenas prácticas 
|
 1.0 
|
|
**
Total
**
|
**
5.0
**
|

## 🔒 Requisitos de Seguridad
- Validación de usuarios duplicados
- Encriptación de contraseñas
- Tokens JWT con tiempo de expiración
- Validación de tokens en rutas protegidas
- Manejo seguro de errores

## 📚 Estructura del Proyecto Sugerida
```
├── node_modules/
├── src/
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── user.js
│   ├── utils/
│   │   └── validation.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🧪 Pruebas Sugeridas

### Registro de Usuario
```bash
curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{
    "username": "estudiante1",
    "lastName": "Apellido",
    "email": "estudiante@universidad.edu",
    "universityId": "12345",
    "phone": "1234567890",
    "password": "123456"
}'
```

### Inicio de Sesión
```bash
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{
    "username": "estudiante1",
    "password": "123456"
}'
```

## 📝 Notas Adicionales
- El sistema debe manejar errores de manera apropiada
- Implementar validaciones para todos los campos
- Documentar cualquier decisión de diseño importante
- Seguir las mejores prácticas de seguridad

## 🔗 Recursos Útiles
- [Express.js Documentation](https://expressjs.com/)
- [JWT.io](https://jwt.io/)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [Express Validator](https://express-validator.github.io/)
