using CS.Application.Commands.CustomerCommands;
using CS.Application.Queries.CustomerQueries;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IValidator<CreateCustomerCommand> _validator;

        public CustomersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //[Authorize(Roles = "Admin, User")]
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            var query = new GetAllCustomersQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User, Customer")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerById(Guid id)
        {
            var query = new GetCustomerByIdQuery
            {
                Id = id
            };
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CreateCustomerCommand command)
        {
            try
            {
                var result = await _mediator.Send(command);
                return Ok(result);
            }
            catch (FluentValidation.ValidationException ex)
            {
                return BadRequest(new
                {
                    Errors = ex.Errors.Select(e => e.ErrorMessage)
                });
            }

        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(Guid id, [FromBody] UpdateCustomerCommand command)
        {
            command.Id = id;
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [Authorize(Roles ="Admin")]
        [HttpPost("resetedPassword/{customerId}")]
        public async Task<IActionResult> ResetPassword(Guid customerId)
        {
            var result = await _mediator.Send(new ResetCustomerPasswordCommand { CustomerId = customerId});
            return Ok(result);
        }

    }
}
