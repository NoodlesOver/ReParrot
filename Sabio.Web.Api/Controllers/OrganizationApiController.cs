﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Requests.Organizations;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using SendGrid;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
	[Route("api/organizations")]
	[ApiController]
	public class OrganizationApiController : BaseApiController
	{
		private IOrganizationsService _service = null;
		private ILocationsService _locationService = null;
		private IAuthenticationService<int> _authService = null;

		public OrganizationApiController(IOrganizationsService service
			, ILogger<OrganizationApiController> logger
			, IAuthenticationService<int> authService
			, ILocationsService locationService) : base(logger) 
		{
			_service = service;
			_authService = authService;
			_locationService = locationService;
		}

		[HttpDelete("{id:int}")]
		public ActionResult<ItemResponse<int>> Delete(int id)
		{
			int code = 200;
			BaseResponse response = null;

			try
			{
				int userId = _authService.GetCurrentUserId();
				_service.Delete(id, userId);
				response = new SuccessResponse();
			}
			catch (Exception ex)
			{
				code = 500;
				response = new ErrorResponse(ex.Message);
			}
			return StatusCode(code, response);
		}


		[HttpPost]
		public ActionResult<ItemResponse<int>> Create(OrganizationAddRequest model)
		{
			ObjectResult result = null;
			try
			{
				int userId = _authService.GetCurrentUserId();
				int locationId = _locationService.Add(model, userId);
				if (locationId > 1)
				{
					model.PrimaryLocationId = locationId;
                    int id = _service.Add(model, userId);
                    ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                    result = Created201(response);
                } else
				{
                    ErrorResponse response = new ErrorResponse("Register Failed");
                    result = StatusCode(500, response);
                }
			}
			catch (Exception ex)
			{
				base.Logger.LogError(ex.ToString());
				ErrorResponse response = new ErrorResponse(ex.Message);

				result = StatusCode(500, response);
			}


			return result;
		}

		[HttpPut("{id:int}")]
		public ActionResult<ItemResponse<int>> Update(OrganizationUpdateRequest model)
		{
			int code = 200;

			BaseResponse response = null;

			try
			{
				int userId = _authService.GetCurrentUserId();
				_service.Update(model, userId);

				response = new SuccessResponse();
			}
			catch (Exception ex)
			{
				code = 500;
				response = new ErrorResponse(ex.Message);
			}
			return StatusCode(code,response);
		}


		[HttpGet("current")]
		public ActionResult<ItemResponse<Organization>> GetByUserId()
		{

			int iCode = 200;
			BaseResponse response = null;
			try
			{
				int userId = _authService.GetCurrentUserId();
				Organization org = _service.GetByUserId(userId);

				if (org == null)
				{

					iCode = 404;
					response = new ErrorResponse("Application Resource not found.");

				}
				else
				{
					response = new ItemResponse<Organization>() { Item = org };
				}
			}
			catch (Exception ex)
			{
				iCode = 500;
				base.Logger.LogError(ex.ToString());
				response = new ErrorResponse($"Generic Error: {ex.Message}");
			}

			return StatusCode(iCode, response);
		}



		[HttpGet("paginate")]
		[AllowAnonymous]
		public ActionResult<ItemResponse<Paged<Organization>>> GetAllPagination(int pageIndex, int pageSize)
		{
			int code = 200;

			BaseResponse response = null;

			try
			{
				Paged<Organization> page = _service.GetAll(pageIndex, pageSize);

				if (page == null)
				{
					code = 404;
					response = new ErrorResponse("App Resource not found.");
				}
				else
				{
					response = new ItemResponse<Paged<Organization>> { Item = page };

				}
			}
			catch (Exception ex)
			{
				code = 500;
				response = new ErrorResponse(ex.Message);
				base.Logger.LogError(ex.ToString());
			}

			return StatusCode(code, response);

		}

        [HttpGet]
        public ActionResult<ItemsResponse<Organization>> GetAllNoPag()
        {
            int code = 200;

            BaseResponse response = null;

            try
            {
                List<Organization> list = _service.GetAllNoPag();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<Organization> { Items = list };

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }

        [HttpGet("{id:int}")]
		public ActionResult<ItemResponse<Organization>> GetById(int id)
		{

			int iCode = 200;
			BaseResponse response = null;
			try
			{
				Organization org = _service.GetById(id);

				if (org == null)
				{

					iCode = 404;
					response = new ErrorResponse("Application Resource not found.");

				}
				else
				{
					response = new ItemResponse<Organization>() { Item = org };
				}
			}
			catch (Exception ex)
			{
				iCode = 500;
				base.Logger.LogError(ex.ToString());
				response = new ErrorResponse($"Generic Error: {ex.Message}");
			}

			return StatusCode(iCode, response);

		}


		[HttpGet("search")]
		public ActionResult<ItemResponse<Paged<Organization>>> Search(int pageIndex, int pageSize, string query)
		{
			int code = 200;

			BaseResponse response = null;

			try
			{
				Paged<Organization> page = _service.Search(pageIndex, pageSize, query);

				if (page == null)
				{
					code = 404;
					response = new ErrorResponse("Records not found.");
				}
				else
				{
					response = new ItemResponse<Paged<Organization>> { Item = page };

				}
			}
			catch (Exception ex)
			{
				code = 500;
				response = new ErrorResponse(ex.Message);
				base.Logger.LogError(ex.ToString());
			}

			return StatusCode(code, response);

		}
	}
}
