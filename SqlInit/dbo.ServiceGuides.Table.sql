USE [ReParrot]
GO
/****** Object:  Table [dbo].[ServiceGuides]    Script Date: 1/3/2023 9:25:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceGuides](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ServiceTypeId] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[Text] [nvarchar](max) NULL,
	[ImageUrl] [nvarchar](500) NULL,
	[VideoUrl] [nvarchar](500) NULL,
	[IsPublished] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_ServiceGuides] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ServiceGuides] ADD  CONSTRAINT [DF_ServiceGuides_IsPublished]  DEFAULT ((0)) FOR [IsPublished]
GO
ALTER TABLE [dbo].[ServiceGuides] ADD  CONSTRAINT [DF_ServiceGuides_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[ServiceGuides] ADD  CONSTRAINT [DF_ServiceGuides_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[ServiceGuides]  WITH CHECK ADD  CONSTRAINT [FK_ServiceGuides_ServiceTypes] FOREIGN KEY([ServiceTypeId])
REFERENCES [dbo].[ServiceTypes] ([Id])
GO
ALTER TABLE [dbo].[ServiceGuides] CHECK CONSTRAINT [FK_ServiceGuides_ServiceTypes]
GO
ALTER TABLE [dbo].[ServiceGuides]  WITH CHECK ADD  CONSTRAINT [FK_ServiceGuides_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[ServiceGuides] CHECK CONSTRAINT [FK_ServiceGuides_Users]
GO
ALTER TABLE [dbo].[ServiceGuides]  WITH CHECK ADD  CONSTRAINT [FK_ServiceGuides_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[ServiceGuides] CHECK CONSTRAINT [FK_ServiceGuides_Users1]
GO
