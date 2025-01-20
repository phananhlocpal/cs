using CS.Application.Commands.MessageCommands;
using CS.Application.Queries.MessageQueries;
using CS.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CS.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MessagesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet]
        public async Task<IActionResult> GetMessages()
        {
            var query = new GetAllMessagesQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMessageById(Guid id)
        {
            var query = new GetMessageByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User, Customer")]
        [HttpGet("conversationId/{conversationId}")]
        public async Task<IActionResult> GetMessagesByConversationId(Guid conversationId)
        {
            var query = new GetMessagesByConversationIdQuery { ConversationId = conversationId };
            var results = await _mediator.Send(query);
            return Ok(results);
        }

        [Authorize(Roles = "Admin, User, Customer")]
        [HttpPost]
        public async Task<IActionResult> CreateMessage([FromBody] CreateMessageCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMessage(Guid id, [FromBody] UpdateMessageCommand command)
        {
            command.Id = id;
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
