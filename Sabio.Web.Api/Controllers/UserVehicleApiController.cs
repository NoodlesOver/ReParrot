using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.UserVehicles;
using Sabio.Models.Requests.UserVehicles;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/uservehicles")]
    [ApiController]
    public class UserVehicleApiController: BaseApiController
    {
        private IUserVehicleService _service = null;
        private IAuthenticationService<int> _authService = null;

        public UserVehicleApiController(IUserVehicleService service, IAuthenticationService<int> authService, ILogger<UserVehicleApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> AddUserVehicle(UserVehicleAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddUserVehicle(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id};
                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
                Logger.LogError(ex.ToString());
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> UpdateUserVehicle(UserVehicleUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateUserVehicle(model, userId);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<UserVehicle>>> GetUserVehiclesByOwnerId(int pageIndex, int pageSize, int ownerId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<UserVehicle> paged = _service.GetUserVehiclesByOwnerId(pageIndex, pageSize, ownerId);

                if(paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<UserVehicle>> { Item = paged };
                } 
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet]
        public ActionResult<ItemsResponse<UserVehicle>> GetUserVehiclesByOwnerIdNoPag(int ownerId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<UserVehicle> list = _service.GetUserVehiclesByOwnerIdNoPag(ownerId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemsResponse<UserVehicle> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<UserVehicle>> GetUserVehicleById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            UserVehicle userVehicle = null;

            try
            {
                userVehicle = _service.GetUserVehicleById(id);

                if(userVehicle == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<UserVehicle>() { Item = userVehicle };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteUserVehicle(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteUserVehicle(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}
