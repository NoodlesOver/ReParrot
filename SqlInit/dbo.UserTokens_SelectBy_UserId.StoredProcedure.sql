USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_SelectBy_UserId]    Script Date: 1/12/2023 6:23:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 1/12/2023
-- Description:	gives token for given user to compare
-- Code Reviewer: Bao Hana Phung


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE	proc [dbo].[UserTokens_SelectBy_UserId]
			@UserId int
			,@TokenTypeId int

as

/* ---------------TEST CODE---------------------

	EXECUTE dbo.UserTokens_SelectBy_UserId 87, 1
					
*/

BEGIN

	SELECT Token
	FROM dbo.UserTokens
	WHERE @UserId = UserId AND TokenTypeId = @TokenTypeId

END


GO
