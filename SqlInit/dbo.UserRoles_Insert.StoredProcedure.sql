USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[UserRoles_Insert]    Script Date: 12/16/2022 12:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/15/2022
-- Description:	used to assign user roles
-- Code Reviewer: Jacob Helton


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE	proc [dbo].[UserRoles_Insert]
			@UserId int
			,@RoleId int

as

/*-----------------TEST CODE---------------------

	DECLARE	@UserId int = 1
			,@RoleId int = 5

	EXECUTE	dbo.UserRoles_Insert
				@UserId
				,@RoleId


*/

BEGIN

	INSERT INTO	[dbo].[UserRoles]
			([UserId]
			,[RoleId])
	VALUES
			(@UserId
			,@RoleId)

END

GO
