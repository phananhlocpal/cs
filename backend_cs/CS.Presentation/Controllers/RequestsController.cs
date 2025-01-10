using CS.Application.Commands.CustomerCommands;
using CS.Application.Commands.RequestCommands;
using CS.Application.Queries.CustomerQueries;
using CS.Application.Queries.RequestQueries;
using CS.Domain.Enumerations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CS.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RequestsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(Policy = "AdminPolicy")]
        [Authorize(Policy = "UserPolicy")]
        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var result = await _mediator.Send(new GetAllRequestsQuery());
            return Ok(result);
        }

        [Authorize(Policy = "AdminPolicy")]
        [Authorize(Policy = "UserPolicy")]
        [Authorize(Policy = "CustomerPolicy")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequestById(Guid id)
        {
            var result = await _mediator.Send(new GetRequestByIdQuery { Id = id });
            return Ok(result);
        }

        [Authorize(Policy = "AdminPolicy")]
        [Authorize(Policy = "UserPolicy")]
        [Authorize(Policy = "CustomerPolicy")]
        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetRequestsByCustomerId(Guid customerId)
        {
            var result = await _mediator.Send(new GetRequestsByCustomerIdQuery { CustomerId = customerId });
            return Ok(result);
        }

        [Authorize(Policy = "AdminPolicy")]
        [Authorize(Policy = "UserPolicy")]
        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetRequestsByStatus(RequestStatusEnum status)
        {
            var result = await _mediator.Send(new GetRequestsByStatusQuery { Status = status });
            return Ok(result);
        }

        [Authorize(Policy = "AdminPolicy")]
        [Authorize(Policy = "UserPolicy")]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetRequestsByUserId(Guid userId)
        {
            var result = await _mediator.Send(new GetRequestsByUserIdQuery { UserId = userId });
            return Ok(result);
        }

        [Authorize(Policy = "AdminPolicy")]
        [Authorize(Policy = "UserPolicy")]
        [Authorize(Policy = "CustomerPolicy")]
        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody] CreateRequestCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [Authorize(Policy = "AdminPolicy")]
        [Authorize(Policy = "UserPolicy")]
        [HttpPut]
        public async Task<IActionResult> UpdateRequest([FromBody] UpdateRequestCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(Guid id)
        {
            var result = await _mediator.Send(new DeleteRequestCommand { Id = id });
            return Ok(result);
        }
    }
}
