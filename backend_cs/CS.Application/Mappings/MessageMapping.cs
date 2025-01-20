using AutoMapper;
using CS.Application.DTOs.MessageDTO;
using CS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Mappings
{
    public class MessageMapping : Profile
    {
        public MessageMapping()
        {
            CreateMap<Message, MessageReadDTO>();
            CreateMap<MessageCreateDTO, Message>();
        }
    }
}
