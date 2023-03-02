using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Locations;
using Sabio.Models.Domain.Messages;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Locations;
using Sabio.Models.Requests.Organizations;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class OrganizationsService: IOrganizationsService
    {
        IDataProvider _data = null;

        public OrganizationsService(IDataProvider data)
        {
            _data = data;
        }

        public Organization GetById(int id)
        {
            string procName = "[dbo].[Organizations_SelectById]";

            Organization org = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIdex = 0;

                org = MapSingleOrganization(reader, ref startingIdex);

            }
            );

            return org;
        }

        public Paged<Organization> GetAll(int pageIndex, int pageSize)
        {
            Paged<Organization> pagedList = null;
            List<Organization> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Organizations_SelectAll]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    int startingIdex = 0;

                    Organization org = MapSingleOrganization(reader, ref startingIdex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIdex);
                    }

                    if (list == null)
                    {
                        list = new List<Organization>();
                    }

                    list.Add(org);
                });

            if (list != null)
            {
                pagedList = new Paged<Organization>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<Organization> GetAllNoPag()
        {
            string procName = "[dbo].[Organizations_SelectAll_NoPag]";
            List<Organization> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Organization org = MapSingleOrganization(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<Organization>();
                }

                list.Add(org);
            });

            return list;
        }

        public Organization GetByUserId(int userId)
        {
            string procName = "[dbo].[Organizations_Select_ByUserId]";

            Organization org = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@UserId", userId);

            }, delegate (IDataReader reader, short set)
            {
                int startingIdex = 0;

                org = MapSingleOrganization(reader, ref startingIdex);

            }
            );

            return org;
        }

        public int Add(OrganizationAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Organizations_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                AddCommonParams(model, col);


                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@ModifiedBy", userId);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object orgId = returnCollection["@Id"].Value;
                int.TryParse(orgId.ToString(), out id);

            });

            return id;

        }


        public void Delete(int id, int userId)
        {

            string procName = "[dbo].[Organizations_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@ModifiedBy", userId);
                col.AddWithValue("@Id", id);

            }, returnParameters: null);
        }

        public void Update(OrganizationUpdateRequest model, int userId)
        {

            string procName = "[dbo].[Organizations_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);

                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@ModifiedBy", userId);


            }, returnParameters: null);
        }


        public Paged<Organization> Search(int pageIndex, int pageSize, string query)

        {
            string procName = "[dbo].[Organizations_Search]";
            Paged<Organization> pagedList = null;
            List<Organization> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
                paramCollection.AddWithValue("@Query", query);

            },
            (IDataReader reader, short set) =>
            {
                int startingIdex = 0;
                Organization org = MapSingleOrganization(reader, ref startingIdex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIdex++);
                }

                if (list == null)
                {
                    list = new List<Organization>();
                }

                list.Add(org);

            }
            );

            if (list != null)
            {
                pagedList = new Paged<Organization>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;


        }
        public void AddBatchOrgs(List<PricingImport> importList, List<LocationAddRequest> locations, int userId)
        {
            string procName = "[dbo].[Organizations_Insert_Batch]";

            List<OrganizationBatch> orgs = MapListBatchOrgs(importList, userId);

            DataTable orgsTable = MapOrganizationsToTable(orgs);
            DataTable locsTable = MapLocationsToTable(locations, userId);

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@OrganizationsBatch", orgsTable);
                col.AddWithValue("@LocationsBatch", locsTable);
            }, null);
        }
        private static void AddCommonParams(OrganizationAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@OrganizationTypeId", model.OrganizationTypeId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@LogoUrl", model.LogoUrl);
            col.AddWithValue("@BusinessPhone", model.BusinessPhone);
            col.AddWithValue("@PrimaryLocationId", model.PrimaryLocationId);
            col.AddWithValue("@SiteUrl", model.SiteUrl);

        }

        private static Organization MapSingleOrganization(IDataReader reader, ref int startingIdex)
        {

            Organization org = new Organization();
            org.OrganizationType = new LookUp();
            org.Location = new Location();
            org.Location.LocationType = new LookUp();
            org.Location.State = new State();

            org.Id = reader.GetSafeInt32(startingIdex++);
            org.OrganizationType.Id = reader.GetSafeInt32(startingIdex++);
            org.OrganizationType.Name = reader.GetSafeString(startingIdex++);
            org.Name = reader.GetSafeString(startingIdex++);
            org.Description = reader.GetSafeString(startingIdex++);
            org.LogoUrl = reader.GetSafeString(startingIdex++);
            org.BusinessPhone = reader.GetSafeString(startingIdex++);
            org.PrimaryLocationId = reader.GetSafeInt32(startingIdex++);
            org.Location.LocationType.Id = reader.GetSafeInt32(startingIdex++);
            org.Location.LocationType.Name = reader.GetSafeString(startingIdex++);
            org.Location.Id = reader.GetSafeInt32(startingIdex++);
            org.Location.LineOne = reader.GetSafeString(startingIdex++);
            org.Location.LineTwo = reader.GetSafeString(startingIdex++);
            org.Location.City = reader.GetSafeString(startingIdex++);
            org.Location.State.Id = reader.GetSafeInt32(startingIdex++);
            org.Location.State.Name = reader.GetSafeString(startingIdex++);
            org.Location.State.Code = reader.GetSafeString(startingIdex++);
            org.Location.Zip = reader.GetSafeString(startingIdex++);
            org.SiteUrl = reader.GetSafeString(startingIdex++);
            org.IsDeleted = reader.GetSafeBool(startingIdex++);
            org.CreatedBy = reader.GetSafeInt32(startingIdex++);
            org.ModifiedBy = reader.GetSafeInt32(startingIdex++);
            return org;
        }
        private static DataTable MapOrganizationsToTable(List<OrganizationBatch> orgs)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("OrganizationTypeId", typeof(Int32));
            dt.Columns.Add("Name", typeof(string));
            dt.Columns.Add("Description", typeof(string));
            dt.Columns.Add("LogoUrl", typeof(string));
            dt.Columns.Add("BusinessPhone", typeof(string));
            dt.Columns.Add("PrimaryLocationId", typeof(Int32));
            dt.Columns.Add("SiteUrl", typeof(string));
            dt.Columns.Add("CreatedBy", typeof(Int32));
            dt.Columns.Add("ModifiedBy", typeof(Int32));
            dt.Columns.Add("ShopId", typeof(string));

            if (orgs != null)
            {
                foreach (OrganizationBatch org in orgs)
                {
                    DataRow dr = dt.NewRow();
                    int startingIndex = 0;

                    dr.SetField(startingIndex++, org.OrganizationTypeId);
                    dr.SetField(startingIndex++, org.Name);
                    dr.SetField(startingIndex++, org.Description);
                    dr.SetField(startingIndex++, org.LogoUrl);
                    dr.SetField(startingIndex++, org.BusinessPhone);
                    dr.SetField(startingIndex++, org.PrimaryLocationId);
                    dr.SetField(startingIndex++, org.SiteUrl);
                    dr.SetField(startingIndex++, org.CreatedBy);
                    dr.SetField(startingIndex++, org.ModifiedBy);
                    dr.SetField(startingIndex++, org.ShopId);

                    dt.Rows.Add(dr);
                }
            }
            return dt;
        }
        private static List<OrganizationBatch> MapListBatchOrgs(List<PricingImport> importList, int userId)
        {
            List<OrganizationBatch> list = new List<OrganizationBatch>();

            foreach (PricingImport import in importList)
            {
                OrganizationBatch orgBatch = new OrganizationBatch();
                orgBatch.OrganizationTypeId = 8;
                orgBatch.Name = import.BusinessName;
                orgBatch.BusinessPhone = import.PhoneNumber;
                orgBatch.CreatedBy = userId;
                orgBatch.ShopId = import.ShopID;

                list.Add(orgBatch);
            }

            return list;
        }

        private static DataTable MapLocationsToTable(List<LocationAddRequest> locations, int userId)
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("LocationTypeId", typeof(Int32));
            dt.Columns.Add("LineOne", typeof(string));
            dt.Columns.Add("LineTwo", typeof(string));
            dt.Columns.Add("City", typeof(string));
            dt.Columns.Add("Zip", typeof(string));
            dt.Columns.Add("State", typeof(string));
            dt.Columns.Add("Latitude", typeof(float));
            dt.Columns.Add("Longitude", typeof(float));
            dt.Columns.Add("CreatedBy", typeof(Int32));
            dt.Columns.Add("ModifiedBy", typeof(Int32));
            dt.Columns.Add("ShopId", typeof(string));

            if (locations != null)
            {
                foreach (LocationAddRequest location in locations)
                {
                    DataRow dr = dt.NewRow();
                    int startingIndex = 0;

                    dr.SetField(startingIndex++, location.LocationTypeId);
                    dr.SetField(startingIndex++, location.LineOne);
                    dr.SetField(startingIndex++, location.LineTwo);
                    dr.SetField(startingIndex++, location.City);
                    dr.SetField(startingIndex++, location.Zip);
                    dr.SetField(startingIndex++, location.State);
                    dr.SetField(startingIndex++, location.Latitude);
                    dr.SetField(startingIndex++, location.Longitude);
                    dr.SetField(startingIndex++, userId);
                    dr.SetField(startingIndex++, userId);
                    dr.SetField(startingIndex++, location.ShopId);

                    dt.Rows.Add(dr);
                }
            }
            return dt;
        }
    }
}
