# FREECYCLE_REACT

**FREECYCLE_REACT** es la interfaz de usuario de una plataforma de intercambio de objetos, diseñada para promover la sostenibilidad y la economía circular. Inspirada en el grupo de Facebook *"Si lo venís a buscar es tuyo"*, esta aplicación conecta donantes y receptores de objetos en desuso, fomentando la reutilización, reduciendo el desperdicio y el consumo innecesario. La interfaz, desarrollada con React, se conecta al backend **Lo_quiero** para gestionar las funcionalidades de la plataforma.

Cualquier usuario puede registrarse para donar o recibir objetos, haciendo que la plataforma sea accesible para el público general.

## Funcionalidades

### Para usuarios no autenticados

- **Ver objetos donados**: Explorar la lista de objetos disponibles para intercambio.
- **Enviar consultas**: Utilizar el formulario de contacto para comunicarse con el equipo de la plataforma.

### Para usuarios autenticados

- **Ver objetos donados**: Acceder a la lista de objetos disponibles.
- **Ver detalles de un objeto**: Consultar información específica de un objeto y reservarlo.
- **Donar objetos**: Publicar objetos para que otros usuarios puedan solicitarlos.
- **Aceptar objetos**: Reservar un objeto, cambiando su estado a "reservado" y retirándolo de la lista de disponibles.
- **Guardar favoritos**: Marcar objetos como favoritos y acceder a ellos más tarde.
- **Enviar consultas**: Utilizar el formulario de contacto.

## Tecnologías Utilizadas

- **React**: Framework principal para la interfaz.
- **React Router DOM**: Navegación entre páginas.
- **React Multi Carousel**: Carrusel interactivo.
- **FontAwesome**: Iconos.
- **dotenv**: Gestión de variables de entorno.
- **Vite**: Herramienta de construcción.
- **ESLint**: Linting para mantener la calidad del código.
- **CSS**: Estilos personalizados para el diseño de la interfaz.

## Requisitos Previos

- **Node.js**: v18 o superior (recomendado: v20).
- **npm**: v10 o superior.
- **Backend Lo_quiero**: Debe estar configurado y ejecutándose (ver Lo_quiero para detalles).
- Un navegador moderno (Chrome, Firefox, Edge, etc.).

## Instalación

Pasos para configurar y ejecutar el proyecto localmente:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/Ceci222/FREECYCLE_REACT.git
   cd FREECYCLE_REACT
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**: Crear un archivo `.env` en la raíz del proyecto y configurar la URL del backend:

   ```env
   VITE_API_URL=http://localhost:8000
   ```

   La URL debe coincidir con la configuración del backend **Lo_quiero**. Consulta el README del backend para más detalles.

4. **Iniciar el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173` (o el puerto configurado por Vite).

5. **Configurar el backend**: Asegúrate de que el backend **Lo_quiero** esté ejecutándose antes de usar la interfaz. Sigue las instrucciones en su repositorio.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run lint`: Ejecuta ESLint para verificar el código.
- `npm run preview`: Previsualiza la versión construida.

## Conexión con el Backend

El frontend se comunica con el backend **Lo_quiero** a través de una API REST. Algunos ejemplos de endpoints utilizados (consulta el README del backend para más detalles):

- **GET /user**: Obtiene la lista de usuarios.
- **GET /object**: obtiene la lista de objetos donados.
- **POST /login**: Autentica a un usuario.
- **PUT /object/:id**: Edita un objeto.

El frontend utiliza **fetch** para realizar estas peticiones (ver carpeta `utils`), y la URL base se configura en el archivo `.env`.

## Estado del Proyecto

El proyecto está en desarrollo. Algunas funcionalidades pueden estar incompletas o sujetas a cambios. No se han reportado problemas críticos, pero se recomienda revisar el código y probar exhaustivamente antes de usar en producción.

### Futuras implementaciones

- Que se puedan rechazar objetos reservados.
- Visualización y edición del perfil.
- Que el donante pueda eliminar los objetos que ha donado.
- Establecer comunicación entre el donante y el beneficiario para que puedan concretar la entrega y compartir datos.

## Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. Haz un fork del repositorio.
2. Crea una rama para tu cambio: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commit: `git commit -m "Añade nueva funcionalidad"`.
4. Envía un pull request con una descripción clara de los cambios.

Por favor, crea un **issue** antes de trabajar en cambios importantes para coordinar con el equipo.

## Contacto

Para preguntas, sugerencias o problemas, contacta a través de:

- GitHub: Ceci222
- Email: cecilia@deba.8shield.net

## Créditos

Desarrollado por Ceci222. Inspirado en *"Si lo venís a buscar es tuyo"*.
