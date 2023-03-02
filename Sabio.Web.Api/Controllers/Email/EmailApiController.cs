using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Services;
using Sabio.Models.Requests.Emails;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Stripe;
using System;

namespace Sabio.Web.Api.Controllers.Email
{

    [Route("api/emails")]
    [ApiController]
    public class EmailApiController: BaseApiController
    {
        private IEmailService _service = null;
        private IUserService _userService = null;

        public EmailApiController(IEmailService service, IUserService userService, ILogger<EmailApiController> logger) : base(logger)
        {
            _service = service;
            _userService = userService;
        }

        [HttpPost("test")]
        public ActionResult<ItemResponse<int>> SendTestEmail()
        {

            ObjectResult result = null;

            try
            {

                _service.SendTestEmail();
                ItemResponse<int> response = new ItemResponse<int>();

                result = Created201(response);

            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                return StatusCode(500, response);
            }
            return result;
        }

        [HttpPost("contactus")]
        public ActionResult<ItemResponse<int>> CreateContactUs(ContactUsAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                _service.SendContactUsEmail(model);
                ItemResponse<int> response = new ItemResponse<int>();

                result = Created201(response);

            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                return StatusCode(500, response);
            }
            return result;
        }

        [AllowAnonymous]
        [HttpPost("passwordreset")]
        public ActionResult<ItemResponse<int>> CreateLostPassword(string email)
        {
            ObjectResult result = null;

            try
            {
                int userId = _userService.GetUserIdFromEmail(email);
                string token = _userService.CreateResetPasswordToken(userId);
                _service.SendPasswordResetEmail(email, token, userId);
                ItemResponse<int> response = new ItemResponse<int>();
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                return StatusCode(500, response);
            }
            return result;
        }
    }


}
