USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[ServiceGuides_Update]    Script Date: 1/3/2023 9:25:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/30/2022
-- Description:	to edit a service guide
-- Code Reviewer:


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[ServiceGuides_Update]
				@Id int
				,@ServiceTypeId int
				,@Name nvarchar(100)
				,@Description nvarchar(500)
				,@Text nvarchar(max)
				,@ImageUrl nvarchar(500)
				,@VideoUrl nvarchar(500)
				,@ModifiedBy int

as

/*-----------------TEST CODE-------------------

	DECLARE @Id int = 3
			,@ServiceTypeId int = 3
			,@Name nvarchar(100) = 'Hitchhiker''s Guide To Rotating Tires'
			,@Description nvarchar(500) = 'vroom vroom'
			,@Text nvarchar(max) = 'Just drive your car, the tires will rotate as you accelerate'
			,@ImageUrl nvarchar(500) = 'dolphin.jpeg'
			,@VideoUrl nvarchar(500) = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
			,@ModifiedBy int = 81

	EXECUTE dbo.ServiceGuides_Select_ById @Id

	EXECUTE	dbo.ServiceGuides_Update
				@Id
				,@ServiceTypeId
				,@Name
				,@Description
				,@Text
				,@ImageUrl
				,@VideoUrl
				,@ModifiedBy

	EXECUTE dbo.ServiceGuides_Select_ById @Id


*/

BEGIN

	DECLARE	@datNow datetime2(7) = getutcdate();

	UPDATE	[dbo].[ServiceGuides]
	SET		[ServiceTypeId] = @ServiceTypeId
			,[Name] = @Name
			,[Description] = @Description
			,[Text] = @Text
			,[ImageUrl] = @ImageUrl
			,[VideoUrl] = @VideoUrl
			,[ModifiedBy] = @ModifiedBy
			,[DateModified] = @datNow

	WHERE	Id = @Id

END


GO
