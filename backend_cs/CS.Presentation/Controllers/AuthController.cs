using AutoMapper;
using CS.Application.AuthenDTO;
using CS.Application.Commands.AuthenCommands;
using CS.Application.Commands.CustomerCommands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace CS.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [AllowAnonymous]
        [HttpPost("customer-login")]
        public async Task<CustomerLoginResponseViewModel> LoginCustomer(CustomerLoginCommand loginRequest)
        {
            var loginResponse = await _mediator.Send(loginRequest);
            return loginResponse;
        }

        [AllowAnonymous]
        [HttpPost("user-login")]
        public async Task<UserLoginResponseViewModel> LoginUser(UserLoginCommand loginRequest)
        {
            var loginResponse = await _mediator.Send(loginRequest);
            return loginResponse;
        }

        [AllowAnonymous]
        [HttpPost("customer-register")]
        public async Task<IActionResult> RegisterCustomer([FromBody] CreateCustomerCommand createCustomerCommand)
        {
            var customer = await _mediator.Send(createCustomerCommand);
            return Ok(customer);
        }
    }
}
