USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectById]    Script Date: 12/16/2022 12:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/15/2022
-- Description:	select single user by Id
-- Code Reviewer: Jacob Helton


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE	proc [dbo].[Users_SelectById]
			@Id int

as

/* ---------------TEST CODE---------------------

	DECLARE	@Id int = 1;

	EXECUTE	dbo.Users_SelectById 
				@Id

*/

BEGIN

	SELECT	[Id]
			,[Email]
			,[FirstName]
			,[LastName]
			,[Mi]
			,[AvatarUrl]
			,[IsConfirmed]
			,[StatusTypeId]
			,[DateCreated]
			,[DateModified]
	FROM	[dbo].[Users]
	WHERE	Id = @Id

END


GO
