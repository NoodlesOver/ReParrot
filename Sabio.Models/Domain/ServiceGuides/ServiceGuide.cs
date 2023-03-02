﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.ServiceGuides
{
    public class ServiceGuide
    {
        public int Id { get; set; }
        public LookUp ServiceType { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Text { get; set; }
        public string ImageUrl { get; set; }
        public string VideoUrl { get; set; }
        public bool IsPublished { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
