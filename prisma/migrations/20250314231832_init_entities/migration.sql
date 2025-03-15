BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Empresa] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(30) NOT NULL,
    [industria] VARCHAR(30) NOT NULL,
    [preferencias] VARCHAR(500) NOT NULL,
    CONSTRAINT [Empresa_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Cliente] (
    [id] INT NOT NULL IDENTITY(1,1),
    [correo] VARCHAR(50) NOT NULL,
    [nombre] VARCHAR(50) NOT NULL,
    [idEmpresa] INT NOT NULL,
    CONSTRAINT [Cliente_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Usuario] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(50) NOT NULL,
    [email] VARCHAR(50) NOT NULL,
    [contraseña] VARCHAR(512) NOT NULL,
    CONSTRAINT [Usuario_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Usuario_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Negociacion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [idUsuarios] INT NOT NULL,
    [idClientes] INT NOT NULL,
    [idEstado] INT NOT NULL,
    [fecha] DATETIME2 NOT NULL,
    [asunto] VARCHAR(50) NOT NULL,
    [descripcion] VARCHAR(500) NOT NULL,
    CONSTRAINT [Negociacion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Estado] (
    [id] INT NOT NULL IDENTITY(1,1),
    [estado] VARCHAR(20) NOT NULL,
    CONSTRAINT [Estado_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProductoServicio] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(30) NOT NULL,
    [precio] FLOAT(53) NOT NULL,
    CONSTRAINT [ProductoServicio_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProductoNegociacion] (
    [idProducto] INT NOT NULL,
    [idNegociacion] INT NOT NULL,
    [cantidad] INT NOT NULL,
    CONSTRAINT [ProductoNegociacion_pkey] PRIMARY KEY CLUSTERED ([idProducto],[idNegociacion])
);

-- AddForeignKey
ALTER TABLE [dbo].[Cliente] ADD CONSTRAINT [Cliente_idEmpresa_fkey] FOREIGN KEY ([idEmpresa]) REFERENCES [dbo].[Empresa]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Negociacion] ADD CONSTRAINT [Negociacion_idUsuarios_fkey] FOREIGN KEY ([idUsuarios]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Negociacion] ADD CONSTRAINT [Negociacion_idClientes_fkey] FOREIGN KEY ([idClientes]) REFERENCES [dbo].[Cliente]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Negociacion] ADD CONSTRAINT [Negociacion_idEstado_fkey] FOREIGN KEY ([idEstado]) REFERENCES [dbo].[Estado]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductoNegociacion] ADD CONSTRAINT [ProductoNegociacion_idProducto_fkey] FOREIGN KEY ([idProducto]) REFERENCES [dbo].[ProductoServicio]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductoNegociacion] ADD CONSTRAINT [ProductoNegociacion_idNegociacion_fkey] FOREIGN KEY ([idNegociacion]) REFERENCES [dbo].[Negociacion]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
