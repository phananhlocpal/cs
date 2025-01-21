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


CREATE TABLE Conversations (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    CustomerId UNIQUEIDENTIFIER NULL, 
    CreatedAt DATETIME, 
    Status INT,
	NumCustomerNotSeenMessage INT,
	NumUserNotSeenMessage INT,
);


CREATE TABLE Messages (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    ConversationId UNIQUEIDENTIFIER NOT NULL, 
    Sender UNIQUEIDENTIFIER NULL, 
    MessageText NVARCHAR(MAX) NOT NULL, 
    Timestamp DATETIME DEFAULT GETDATE(), 
    FOREIGN KEY (ConversationId) REFERENCES Conversations(Id),
	FOREIGN KEY (Sender) REFERENCES Users(Id)
);


CREATE TABLE EmployeesTaggeds (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    ConversationId UNIQUEIDENTIFIER NOT NULL,
    EmployeeId UNIQUEIDENTIFIER NULL, 
    TaggedBy UNIQUEIDENTIFIER NOT NULL, 
    TagTime DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ConversationId) REFERENCES Conversations(Id),
	FOREIGN KEY (EmployeeId) REFERENCES Users(Id),
	FOREIGN KEY (TaggedBy) REFERENCES Users(Id),
);


SELECT * FROM dbo.Messages;
SELECT * FROM dbo.Conversations;
SELECT * FROM EmployeesTaggeds;

DELETE FROM dbo.Messages;
DELETE FROM dbo.Conversations;
DELETE FROM dbo.EmployeesTaggeds;