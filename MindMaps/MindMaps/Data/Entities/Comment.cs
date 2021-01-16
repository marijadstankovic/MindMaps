using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MindMaps.Data.Entities
{
    public class Comment : IEntity
    {
        public int Id { set; get; }
        [StringLength(100)]
        public String Text { set; get; }
        public DateTime DateTime { set; get; }
        public User User { set; get; }
        public MindMap MindMap { set; get; }

    }
}
