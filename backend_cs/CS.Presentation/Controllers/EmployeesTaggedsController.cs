using CS.Application.Commands.EmployeeTaggedCommands;
using CS.Application.Queries.EmployeeTaggedQueries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CS.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesTaggedsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EmployeesTaggedsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet]
        public async Task<IActionResult> GetEmployeeTaggeds()
        {
            var query = new GetAllEmployeeTaggedQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeTaggedById(Guid id)
        {
            var query = new GetEmployeeTaggedByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateEmployeeTagged([FromBody] CreateEmployeeTaggedCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployeeTagged(Guid id, [FromBody] UpdateEmployeeTaggedCommand command)
        {
            command.Id = id;
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
