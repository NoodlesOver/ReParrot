USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Users_UpdatePassword]    Script Date: 1/12/2023 6:23:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 1/12/2023
-- Description:	updates user password
-- Code Reviewer: Bao Hana Phung


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE proc	[dbo].[Users_UpdatePassword]
				@UserId int
				,@Password varchar(100)
				,@Token nvarchar(200)

as

/*---------------TEST CODE---------------------

	EXECUTE dbo.Users_SelectPass_ByEmail 'testEmail@test.com';
	EXECUTE dbo.Users_UpdatePassword 1, 'Password3!', 'akjsdhfkajshdfkj';
	EXECUTE dbo.Users_SelectPass_ByEmail 'testEmail@test.com';

*/

BEGIN

	DECLARE	@datNow datetime2(7) = getutcdate();

	UPDATE	[dbo].[Users]
	SET		[Password] = @Password
			,[DateModified] = @datNow
	WHERE	Id = @UserId

	EXECUTE [dbo].[UserTokens_Delete_ByToken] @Token

END


GO
