USE [master];
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DBMovies')
BEGIN
    CREATE DATABASE [DBMovies];
END
GO

USE [DBMovies];
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Director')
BEGIN
    CREATE TABLE [dbo].[Director](
        PKDirector INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
        Name VARCHAR(100),
        Age INT,
        Active BIT
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Movies')
BEGIN
    CREATE TABLE [dbo].[Movies](
        PKMovies INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
        Name VARCHAR(100),
        Gender VARCHAR(100),
        Duration TIME,
        FKDirector INT,
        CONSTRAINT FK_Director FOREIGN KEY (FKDirector) REFERENCES Director(PKDirector)
    );
END
GO

INSERT INTO [dbo].[Director] (Name, Age, Active) VALUES ('Yorgos Lanthimos', 56, 1);
INSERT INTO [dbo].[Director] (Name, Age, Active) VALUES ('Christopher Nolan', 56, 1);
INSERT INTO [dbo].[Director] (Name, Age, Active) VALUES ('Quentin Tarantino', 58, 0);
GO

INSERT INTO [dbo].[Movies] (Name, Gender, Duration, FKDirector) VALUES ('The Lobster', 'Drama', '02:07', 1);
INSERT INTO [dbo].[Movies] (Name, Gender, Duration, FKDirector) VALUES ('Inception', 'Sci-Fi', '02:28', 2);
INSERT INTO [dbo].[Movies] (Name, Gender, Duration, FKDirector) VALUES ('Pulp Fiction', 'Crime', '02:34', 3);
GO