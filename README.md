# Versiones utilizadas

- Node.js: 18.20.4
- npm: 10.7.0
- Angular CLI: 14.2.13
- .Net Core: 8.0.7
- Sql Server 16.0.1000.6

# Instrucciones para ejecutar el proyecto

1. Clonar el repositorio

```bash
git clone https://github.com/sami-sopas/IE-SW-CRUD.git
```

2. Ejecutar scrip de Sql Server (El script se encarga de crear la BD, las tablas y la insercion de algunos registros )

```bash
sqlcmd -S localhost -i script.sql
```

3. Ejecutar el proyecto de .Net Core (Backend)

```bash
cd .\Backend\

dotnet run --project Backend
```
Nota: En http://localhost:5028/swagger/index.html podras ver los endpoints de la API

4. En una nueva consola dentro del proyecto, instalar dependencias de Angular y ejecutar el proyecto

```bash
cd .\Frontend\

npm i --force

ng serve
```

5. Abrir el navegador y acceder a la siguiente URL

```bash
http://localhost:4200/
```

6. Listo! Ya puedes probar la aplicación
