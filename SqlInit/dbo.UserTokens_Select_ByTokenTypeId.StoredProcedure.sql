USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Select_ByTokenTypeId]    Script Date: 12/16/2022 12:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/15/2022
-- Description:	selects UserToken based upon TokenTypeId
-- Code Reviewer: Jacob Helton


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE	proc [dbo].[UserTokens_Select_ByTokenTypeId]
			@TokenTypeId int

as

/*--------------TEST CODE----------------------

	DECLARE	@TokenTypeId int = 1;
	EXECUTE	dbo.UserTokens_Select_ByTokenTypeId
				@TokenTypeId

*/

BEGIN

	SELECT	[Token]
			,[UserId]
			,[TokenTypeId]
	FROM	[dbo].[UserTokens]
	WHERE	TokenTypeId = @TokenTypeId

END


GO
