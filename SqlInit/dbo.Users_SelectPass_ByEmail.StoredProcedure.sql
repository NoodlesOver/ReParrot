USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectPass_ByEmail]    Script Date: 12/16/2022 12:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/15/2022
-- Description:	selects password for user based upon given email
-- Code Reviewer: Jacob Helton


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE	proc [dbo].[Users_SelectPass_ByEmail]
			@Email nvarchar(255)

as

/*----------------TEST CODE---------------------

	DECLARE	@Email nvarchar(255) = 'testEmail@test.com'
	EXECUTE	dbo.Users_SelectPass_ByEmail @Email

*/

BEGIN

	SELECT	[Password]

	FROM	[dbo].[Users]
	WHERE	Email = @Email

END


GO
