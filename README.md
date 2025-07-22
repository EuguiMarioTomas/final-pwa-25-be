* [Inicializar Proyecto:] npm init -y
* 
*
* DEPENDENCIAS
* npm i -y                    //LISTO
* [Cors] npm i cors           //
* [Dotenv] npm i dotenv       //LISTO
* [Express] npm i express     //LISTO
* [MongoDB] npm i mongodb     //LISTO
* [Mongoose] npm i mongoose   //LISTO
*
* DEPENDENCIAS DEL DEV
* [Nodemon] npm i nodemon -D                      //LISTO
* [Typescript] npm i typescript -D
* [Node] npm i ts-node ts-node-dev @types/node -D //LISTO @types/node ts-node
* [Eslint] npm i @typescript-eslint/parser -D
* [Express] npm i @types/express -D               //LISTO
* [Mongoose] npm i @types/mongoose -D
* [Cors] npm i @types/cors -D
*
* INICIALIZAR EL PROYECTO TYPESCRIPT
* npx tsc --init
*
* CONFIGURACION ARCHIVOS
* [tsconfig.json] 
*  "compilerOptions": {  
*    "outDir":"dist"
*  }
* "include": ["src/**/*",]
*
* [package.json]
* "scripts": {
*   "start": "node ./dist/server.js",
*   "dev": "nodemon --exec ts-node src/server.ts",
*   "build": "tsc",
*   "test": "echo \"Error: no test specified\" && exit 1"
* },
*
* INICIAR EL PROYECTO EN MODO DEV
* npm run dev