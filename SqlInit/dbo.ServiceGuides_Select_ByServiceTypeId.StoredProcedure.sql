USE [ReParrot]
GO
/****** Object:  StoredProcedure [dbo].[ServiceGuides_Select_ByServiceTypeId]    Script Date: 1/3/2023 9:25:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Darryl Yeargin
-- Create date: 12/30/2022
-- Description:	select ServiceGuides by type of service Id
-- Code Reviewer:


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[ServiceGuides_Select_ByServiceTypeId]
				@ServiceTypeId int
				,@PageIndex int
				,@PageSize int
as

/*-----------------TEST CODE--------------------

	DECLARE @ServiceTypeId int = 12
			,@PageIndex int = 0
			,@PageSize int = 2

	EXECUTE	dbo.ServiceGuides_Select_ByServiceTypeId
				@ServiceTypeId
				,@PageIndex
				,@PageSize

*/

BEGIN

	DECLARE	@offset int = @PageIndex * @PageSize

	SELECT	sg.[Id]
			,[ServiceTypeId]
			,st.[Name] as ServiceType
			,sg.[Name]
			,[Description]
			,[Text]
			,[ImageUrl]
			,[VideoUrl]
			,[IsPublished]
			,[CreatedBy]
			,[ModifiedBy]
			,[DateCreated]
			,[DateModified]
			,TotalCount = COUNT(1) OVER()

	FROM	[dbo].[ServiceGuides] as sg 
			join ServiceTypes as st
				on st.Id = ServiceTypeId

	WHERE	[ServiceTypeId] = @ServiceTypeId

	ORDER BY sg.Id

	OFFSET @offSet Rows
	FETCH NEXT @PageSize Rows ONLY

END


GO
