sqlcmd -S localhost -i script.sql

cd .\Backend\

start /B dotnet run --project Backend

cd ..

cd .\Frontend\

npm i --force
ng serve

start http://localhost:4200