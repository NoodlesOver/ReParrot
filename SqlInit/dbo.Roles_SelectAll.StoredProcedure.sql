USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[Roles_SelectAll]    Script Date: 12/16/2022 12:52:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/15/2022
-- Description:	selects all roles
-- Code Reviewer: Jacob Helton


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE	proc [dbo].[Roles_SelectAll]


as

-- ----------------TEST CODE------------------
-- execute dbo.Roles_SelectAll

BEGIN

	SELECT	[Id]
			,[Name]
	FROM	[dbo].[Roles]

END

GO
