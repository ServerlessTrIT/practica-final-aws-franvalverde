# 📓 Ejercicio práctico final

Se debe implementar y desplegar una solución utilizando el framework Serverless y AWS tal y como se ha hecho durante el curso.

El tema es libre, pero debe cumplir al menos con los siguientes requisitos:

<hr>

## Backend:
Debe estar desarrollado por completo utilizando el framework Serverless.
Debe integrar los siguientes servicios de AWS: Lambda, APIGateway, DynamoDB y Cognito.
El api debe tener api key.
Los endpoints obligatorios del api deben permitir:
- Registrar un nuevo usuario usando el email como username.

- Confirmar el email por código.

- Login de usuario mediante username y contraseña.

- Obtener todos los items (GET).

- Obtener un item por id (GET).

- Eliminar un item por su id (DELETE).

- Insertar un item nuevo (PUT).

- Modificar un item ya existente (POST).

- Todos los endpoint deben tener su propia función lambda asociada al evento correspondiente. No utilizar una misma función para varios eventos.

- Todos los endpoints excepto registro, confirmación de email y login deben estar protegidos por token.

Se pueden implementar otros endpoints con nuevas funcionalidades si se quiere.

<hr>

## Front:

- Tiene que estar desplegado en un bucket de S3 configurado como web estática.

- Debe tener un dominio y certificado SSL de distribución CloudFront.
Opcionalmente, se puede configurar un dominio y certificados personalizados con Route53 y CertificateManager.

- Se puede utilizar la plantilla proporcionada en el tema 7, pero no es obligatorio mientras la solución aportada sea SPA.

- Debe permitir registro, validación de email y login.

- Debe tener al menos un listado de datos que se obtendrán al atacar al api del backend.

- Se debe poder dar de alta elementos que aparecerán posteriormente en dicho listado

- También se tiene que poder eliminar elementos.

- Y permitir modificar los que ya están en el listado.

- Se pueden añadir más funcionalidades si se desea. Es opcional.

<hr>

## Entrega:

Se debe subir al repositorio el código fuente del front y del backend. Se agradecen comentarios en el código :).

Además, se incluirá un documento en el que se indiquen los comando usados en caso de haber utilizado la CLI. Este documento también incluirá la url de la distribución CloudFront empleada en el despliegue del front para poder realizar una prueba en vivo y comprobar el correcto funcionamiento de la solución.
