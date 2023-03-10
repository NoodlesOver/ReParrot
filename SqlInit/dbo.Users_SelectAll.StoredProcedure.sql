USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll]    Script Date: 12/16/2022 12:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/15/2022
-- Description:	Paginated list of all users
-- Code Reviewer: Jacob Helton


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE	proc [dbo].[Users_SelectAll]
			@PageIndex int
			,@PageSize int

as

/* ---------------TEST CODE---------------------
	DECLARE	@PageIndex int = 0
			,@PageSize int = 4

	EXECUTE	dbo.Users_SelectAll 
				@PageIndex
				,@PageSize
					
*/

BEGIN

	DECLARE	@offset int = @PageIndex * @PageSize

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
			,TotalCount = COUNT(1) OVER()
	FROM	[dbo].[Users]
	ORDER BY Id
	OFFSET @offSet Rows
	FETCH NEXT @PageSize Rows ONLY

END


GO
