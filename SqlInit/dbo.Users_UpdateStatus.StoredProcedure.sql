USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Users_UpdateStatus]    Script Date: 12/16/2022 12:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/15/2022
-- Description:	update StatusTypeId for a given user based upon Id
-- Code Reviewer: Jacob Helton


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE	proc [dbo].[Users_UpdateStatus]
			@StatusTypeId int
			,@Id int

as

/*--------------------TEST CODE--------------------

	DECLARE	@StatusTypeId int = 2
			,@Id int = 1

	EXECUTE	dbo.Users_SelectById
				@Id

	EXECUTE	dbo.Users_UpdateStatus
				@StatusTypeId
				,@Id

	EXECUTE	dbo.Users_SelectById
				@Id

*/

BEGIN

	DECLARE @datNow datetime2(7) = getutcdate();

	UPDATE	[dbo].[Users]
	SET		[StatusTypeId] = @StatusTypeId
			,[DateModified] = @datNow
	WHERE	Id = @Id

END


GO
