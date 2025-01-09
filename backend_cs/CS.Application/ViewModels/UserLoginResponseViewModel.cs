using CS.Application.DTOs.UserDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.AuthenDTO
{
    public class UserLoginResponseViewModel
    {
        public UserReadDTO User { get; set; }
        public string Token { get; set; }
    }
}
