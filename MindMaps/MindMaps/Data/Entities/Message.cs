using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace MindMaps.Data.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public User User { get; set; }

        [StringLength(60)]
        public String Text { get; set; }
        public DateTime DataTime { get; set; }
        public Chat Chat { set; get; }
    }
}
