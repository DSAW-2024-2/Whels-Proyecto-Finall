# Whels-Proyecto-Finall
## Hecho por:
-Santiago Bazzani 
-Daniel Forero

## Despliege:
- Despliegue (Frontend): https://dsaw-2024-2.github.io/Whels-Proyecto-Finall/
- Despliegue (Backend):

## Planeacion:
- Vista: (Incluye como se planeo la parte visual del proyecto)
  https://www.figma.com/design/yskXCrfgkjMfSmKtxwYe4x/Untitled?node-id=0-1&t=Oz7rcop0gK0QScIF-1
- Historias de Usuario: (Incluye Planeacion y espesificaciones del proyecto)
  https://trello.com/invite/b/66f411e018bac9863f2d4f1f/ATTIbbfaf44812b5a6044fdb6b27756db0beF58F16E9/proyecto-final-web

# Requerimientos Funcionales

## 1. Registro de Usuarios
- El sistema debe permitir registrar usuarios como **conductores** o **pasajeros**.

### Datos Usuario Pasajero:
1. Nombre.
2. Apellido.
3. ID universidad.
4. Correo corporativo.
5. Número de contacto.
6. Foto (opcional).

### Datos Usuario Conductor:
Incluye los mismos campos que el pasajero, además de:
1. Placa del vehículo.
2. Foto del vehículo.
3. Capacidad del vehículo.
4. Foto del SOAT.
5. Marca del vehículo.
6. Modelo del vehículo.

#### Reglas de negocio:
- Cada conductor puede tener, como máximo, un vehículo asociado.

- Los usuarios deben poder iniciar sesión y gestionar su perfil.

## 2. Roles de Usuarios
- Los usuarios pueden registrarse como **conductores** o **pasajeros**.
- Los usuarios pueden alternar entre los roles de **conductor** y **pasajero**.

## 3. Registro de Viajes para Conductores
- Los conductores deben poder registrar un viaje con los siguientes datos:
  - Punto de inicio.
  - Punto final.
  - Ruta.
  - Hora de salida.
  - Cantidad de puestos disponibles.
  - Tarifa por pasajero.

## 4. Listado de Viajes para Pasajeros
- Los pasajeros deben poder ver un listado de conductores con viajes disponibles.
- El sistema debe mostrar los detalles del viaje:
  - Punto de inicio.
  - Punto final.
  - Ruta.
  - Cantidad de cupos disponibles.
  - Hora de salida.
  - Tarifa por pasajero.

## 5. Selección de Viajes para Pasajeros
- Los pasajeros deben poder seleccionar un viaje disponible.
- El pasajero puede elegir cuántos cupos reservar y seleccionar el punto de recogida para cada puesto.

## 6. Bloqueo de Viajes Llenos
- Una vez que un viaje se quede sin cupos disponibles, debe marcarse como **lleno** o **bloqueado**, evitando su selección por otros pasajeros.

## 7. Filtros de Búsqueda
- Los pasajeros deben poder filtrar los viajes por:
  - Cantidad de cupos disponibles.
  - Punto de salida.

# Requerimientos No Funcionales

## 1. Usabilidad
- La interfaz debe ser intuitiva y fácil de usar tanto para conductores como pasajeros.
- El sistema debe estar disponible en dispositivos móviles y computadoras.

## 2. Rendimiento
- El sistema debe ser capaz de manejar múltiples solicitudes simultáneas sin comprometer el rendimiento.
- Las búsquedas de viajes deben ser rápidas, con resultados cargados en menos de **2 segundos**.

## 3. Escalabilidad
- La aplicación debe ser escalable para soportar un número creciente de usuarios y viajes.

## 4. Seguridad
- El sistema debe garantizar la protección de los datos personales de los usuarios mediante **autenticación segura**.
- Los datos sensibles, como contraseñas, deben almacenarse de manera **encriptada**.

## 5. Disponibilidad
- La aplicación debe estar disponible al menos el **99% del tiempo**, con un plan de mantenimiento mínimo.

## 6. Compatibilidad
- La aplicación debe ser compatible con los principales navegadores web y sistemas operativos.

## 7. Mantenibilidad
- El código del proyecto debe estar bien documentado para facilitar su mantenimiento y evolución.
