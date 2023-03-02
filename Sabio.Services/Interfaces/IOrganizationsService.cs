using Sabio.Models;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Locations;
using Sabio.Models.Requests.Organizations;
using System.Collections.Generic;

namespace Sabio.Services
{
	public interface IOrganizationsService
	{
		void Delete(int id, int userId);
		Organization GetById(int id);
		int Add(OrganizationAddRequest model, int userId);
		Paged<Organization> GetAll(int pageIndex, int pageSize);
		List<Organization> GetAllNoPag();
        void Update(OrganizationUpdateRequest model, int userId);
		Paged<Organization> Search(int pageIndex, int pageSize, string query);
		Organization GetByUserId(int userId);
		void AddBatchOrgs(List<PricingImport> importList, List<LocationAddRequest> locations, int userId);

    }
}