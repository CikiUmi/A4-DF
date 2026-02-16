# Actividad 4 - Desarrollo Fullstack
> *Equipo 1*

 - MHQ 3001084
 - JMDR 7090780
 - DHH 2989955
 - IARE 7051100

- - - - - - - - - - - - - - - - - - - - - 
## **Endpoints de la API (operaciones CRUD)**

### ***= nombre***
| Método | Ruta                   | Acción que realiza                 |
| -------| ---------------------- | ---------------------------------- | 
| POST   | /api/nombre     | Creación       |
| GET    | /api/nombre/:id | Lectura |
| PUT    | /api/nombre/:id | Actualización       |
| DELETE | /api/nombre/:id | Eliminar         |

- - - - - - - - - - - - - - - - - - - - - 
## El proyecto está dividido en carpetas:

### **public:**
Frontend de la página. Estructuras, estilos, etc.

***= app =***
archivos .js para las páginas.

***= pages =***
estructura del sitio web en formato .html.

***= styles =***
.css para la página.


### **src:**
Backend y lógica de la página. Base de datos, conexiones y configuraciones. server.js

***= config =***
Configuración de la base de datos (Mongo)

***= controllers =***
CRUD de la base de datos.

***= models =***
Schemas (DB).

***= routes =***
Rutas de API.

***= middlewares =***
Jsonwebtoken, rutas protegidas.


 > Además de esto, el programa cuenta con los paquetes .json de npm, las variables de entorno (con un ejemplo), y la licencia.
