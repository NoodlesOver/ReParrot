using Sabio.Models.Domain.Emails;
using Sabio.Models.Requests.Emails;
using sib_api_v3_sdk.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IEmailService
    {
        string GetGenericTemplate();
        string GetContactUsTemplate();
        void SendContactUsEmail(ContactUsAddRequest model);
        void SendNewUserEmail(Recipient model, int userId, string token);
        void SendTestEmail();
        void SendPasswordResetEmail(string email, string token, int userId);
    }
}
