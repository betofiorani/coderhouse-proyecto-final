## PROYECTO FINAL - CURSO CODERHOUSE BACKEND

### Beto Commerce
*Aplicación de las tecnologías aprendidas en el curso para desarrollar el backend de una página ecommerce*

#### Aprendizajes aplicados en el proyecto hasta el momento
1. Levantar un servidor con express
2. Conectar el servidor con un front desarrollado en Reactjs a través de axios
3. Manejo de variables de entorno.
4. Manejo de middlewares de aplicación y middlewares de rutas.
5. Estructura del proyecto con arquitectura MVC
6. Uso de imports dinámicos
7. Utilización de clases Contenedoras.
8. Utilización de DAOS
9. Base de datos en MongoDB y Firebase. Se determina el motor elegido a través de una variable de entorno.

### ¿Cómo correr el proyecto?
#### Guía de instalación

1. Clonar los repositorios (front end y back end)

##### FRONT END
~~~
  git clone https://github.com/betofiorani/coderhouse-frontend.git
~~~
##### BACK END
~~~
  git clone https://github.com/betofiorani/coderhouse-proyecto-final
~~~

2. Instalar las dependencias en ambos proyectos 

~~~
  npm i
~~~

3. Configurar las variables de entorno (crear archivo .env en el directorio raiz de cada proyecto) 

##### ESTRUCTURA ENV BACK END
~~~
  PORT=8080
  DATABASE=XXXXX                ## firebase | mongo
  MONGO_STRING_CONNECTION=XXXXXXXXXXXXXXXXXXXXXXXXX   ## cadena de conexión a una base de datos mongo.
  FIREBASE_SECRET_KEY=XXXXXXXXXXXXXXXXX   ## nombre del archivo JSON guardado en la raiz del proyecto con la secret key generada en firebase.
~~~
##### ESTRUCTURA ENV FRONT END
~~~
  REACT_APP_BACKEND_URL=XXXXXXXXXXXXXXXXXXXXXX   ## http://localhost:8080
~~~

4. Elección de un motor de base de datos u otro. 

##### MONGODB
~~~
  Obtener la cadena de conexión de mongo. Ya sea local o creando un cluster en mongo Atlas.
~~~
##### FIREBASE
~~~
  Ingresar a la consola de firebase y crear un nuevo proyecto y dentro de él una base da datos
  cloud Firestore.
  Generar el json con el secret key y guardarlo en la raiz del proyecto.
  El nombre del archivo tiene que ser pasado como variable de entorno en el ENV.
~~~

### Requisitos mínimos del proyecto
*Consignas a cumplir*

1. Servidor creado con express
2. CRUD completo de productos

**ruta**
~~~  
  /api/productos
~~~

**CRUD**
~~~  
  getAll | method: GET | path: /
  getById | method: GET | path: /:id
  create | method: POST | path: /
  update | method: PUT | path: /:id
  delete | method: DELETE | path: /:id 
~~~

3. CRUD para carritos

**ruta**
~~~  
  /api/carritos
~~~

**CRUD**
~~~
  create | method: POST | path: /  
  addProduct | method: POST | path: /:id/productos
  getCart | method: GET | path: /:id/productos
  deleteCart | method: DELETE | path: /:id
  deleteProduct | method: DELETE | path: /:id/productos/:id_prod
~~~

3. Manejo de variables de entorno
~~~
  Se maneja en variables de entorno el puerto, la cadena de conexión y el motor de base de datos
  elegido.
~~~
4. Import dinámicos
~~~
  Se utilizaron para manejar los distintos motores de base de datos de acuerdo a la key database
  en las variables de entorno.
~~~
5. Implementación de DAOS
~~~
  Se utilizaron DAOS para productos y carritos. Ambas clases extienden de una clase contenedora
  para cada motor de base de datos (que contiene el CRUD básico para esa base). 
  De esta manera utiliza los métodos de la clase contenedora y puede rescribir o crear nuevos
  métodos más específicos si es necesario.
~~~