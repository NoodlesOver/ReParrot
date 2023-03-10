USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[ServiceGuides_Select_ById]    Script Date: 1/3/2023 9:25:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/30/2022
-- Description:	select ServiceGuides by Id
-- Code Reviewer:


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[ServiceGuides_Select_ById]
				@Id int

as

/*----------------TEST CODE---------------------

	DECLARE @Id int = 1;

	EXECUTE	dbo.ServiceGuides_Select_ById @Id

*/

BEGIN

	SELECT	sg.[Id]
			,[ServiceTypeId]
			,st.[Name] as ServiceType
			,sg.[Name]
			,[Description]
			,[Text]
			,[ImageUrl]
			,[VideoUrl]
			,[IsPublished]
			,[CreatedBy]
			,[ModifiedBy]
			,[DateCreated]
			,[DateModified]

	FROM	[dbo].[ServiceGuides] as sg 
			join ServiceTypes as st
			on st.Id = ServiceTypeId

	WHERE	sg.Id = @Id

END


GO
