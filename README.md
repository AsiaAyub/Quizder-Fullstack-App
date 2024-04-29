Create database in your sql server
create your context with application builder and update the program.cs to include the context
update the connection string in the app settings by changing the desktop and database name with your respective ones.
run 'dotnet ef migrations add init' and 'dotnet ef database update' to remotely update your database and create the necessary tables as per your models files.
make sure to add usecors in program.cs
you are good to go.

