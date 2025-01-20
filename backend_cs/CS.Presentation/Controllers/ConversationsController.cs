using CS.Application.Commands.ConversationCommands;
using CS.Application.Queries.ConversationQueries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CS.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ConversationsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet]
        public async Task<IActionResult> GetConversations()
        {
            var query = new GetAllConversationsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetConversationById(Guid id)
        {
            var query = new GetConversationByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        //[Authorize(Roles = "Admin, User, Customer")]
        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetConversationByCustomerId(Guid customerId)
        {
            var query = new GetConversationByCustomerIdQuery(customerId);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateConversation([FromBody] CreateConversationCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateConversation(Guid id, [FromBody] UpdateConversationCommand command)
        {
            command.Id = id;
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
