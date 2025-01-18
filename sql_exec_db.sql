CREATE DATABASE CS;
GO

USE CS;
GO

-- Table Customer
CREATE TABLE Customers (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    Address NVARCHAR(500),
    Phone NVARCHAR(20),
    Password NVARCHAR(255) NOT NULL,
    IsVerification BIT NOT NULL DEFAULT 0,
    VerificationToken NVARCHAR(255)
);
GO

-- Table User
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PhoneNumber NVARCHAR(20),
    Password NVARCHAR(255) NOT NULL,
    Status INT,
    Role INT NOT NULL -- Enum UserRoleEnum
);
GO

DROP TABLE Requests;

-- Table Request
CREATE TABLE Requests (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    CreatedDate DATETIME NOT NULL DEFAULT GETDATE(),
	IssueType INT NOT NULL,
    Status INT NOT NULL, 
    PersonInChargeId UNIQUEIDENTIFIER NOT NULL, 
    CustomerId UNIQUEIDENTIFIER NOT NULL, 
    CONSTRAINT FK_Request_PersonInCharge FOREIGN KEY (PersonInChargeId) REFERENCES Users(Id),
    CONSTRAINT FK_Request_Customer FOREIGN KEY (CustomerId) REFERENCES Customers(Id)
);
GO

SELECT * FROM Requests;
SELECT * FROM Customers;