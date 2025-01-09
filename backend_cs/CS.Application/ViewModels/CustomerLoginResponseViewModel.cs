using CS.Application.DTOs.CustomerDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.AuthenDTO
{
    public class CustomerLoginResponseViewModel
    {
        public CustomerReadDTO Customer { get; set; }
        public string Token { get; set; }
    }
}
