USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[ServiceGuides_Delete_ById]    Script Date: 1/3/2023 9:25:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/30/2022
-- Description:	delete a guide based upon an id
-- Code Reviewer:


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[ServiceGuides_Delete_ById]
				@Id int

as

/*--------------TEST CODE-----------------------

	DECLARE @Id int = 4;

	EXECUTE dbo.ServiceGuides_Select_ById @Id

	EXECUTE dbo.ServiceGuides_Delete_ById @Id

	EXECUTE dbo.ServiceGuides_Select_ById @Id

*/

BEGIN

	DELETE FROM [dbo].[ServiceGuides]
	WHERE	Id = @Id

END


GO
