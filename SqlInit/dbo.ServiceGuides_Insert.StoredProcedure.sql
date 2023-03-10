USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[ServiceGuides_Insert]    Script Date: 1/3/2023 9:25:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/30/2022
-- Description:	Insert new service guide into ServiceGuides
-- Code Reviewer:


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[ServiceGuides_Insert]
				@ServiceTypeId int
				,@Name nvarchar(100)
				,@Description nvarchar(500)
				,@Text nvarchar(max)
				,@ImageUrl nvarchar(500)
				,@VideoUrl nvarchar(500)
				,@CreatedBy int
				,@Id int OUTPUT

as

/*-----------------TEST CODE---------------

	DECLARE	@ServiceTypeId int = 12
			,@Name nvarchar(100) = 'Hitchhiker''s Guide To Engine Repair'
			,@Description nvarchar(500) = 'how to repair engines, I guess'
			,@Text nvarchar(max) = 'Don''t go ape****, just ******* fix it!'
			,@ImageUrl nvarchar(500) = 'dolphin.jpeg'
			,@VideoUrl nvarchar(500) = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
			,@CreatedBy int = 81
			,@Id int = 0;

	EXECUTE	dbo.ServiceGuides_Insert
			@ServiceTypeId
			,@Name
			,@Description
			,@Text
			,@ImageUrl
			,@VideoUrl
			,@CreatedBy
			,@Id OUTPUT

	EXECUTE dbo.ServiceGuides_Select_ById
				@Id


*/

BEGIN

	INSERT INTO	[dbo].[ServiceGuides]
				([ServiceTypeId]
				,[Name]
				,[Description]
				,[Text]
				,[ImageUrl]
				,[VideoUrl]
				,[CreatedBy]
				,[ModifiedBy])
	
	VALUES	(@ServiceTypeId
			,@Name
			,@Description
			,@Text
			,@ImageUrl
			,@VideoUrl
			,@CreatedBy
			,@CreatedBy)

	SET	@Id = SCOPE_IDENTITY()

END


GO
