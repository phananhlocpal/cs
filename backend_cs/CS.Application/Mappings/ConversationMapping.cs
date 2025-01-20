using AutoMapper;
using CS.Application.DTOs.ConversationDTO;
using CS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Mappings
{
    public class ConversationMapping : Profile
    {
        public ConversationMapping()
        {
            CreateMap<Conversation, ConversationReadDTO>();
            CreateMap<ConversationCreateDTO, Conversation>();
        }
    }
}
