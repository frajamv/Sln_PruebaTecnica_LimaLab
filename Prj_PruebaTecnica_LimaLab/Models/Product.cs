using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prj_PruebaTecnica_LimaLab.Models
{
    public class Product
    {
        public string productID {get; set;}
        public string urlImage { get; set; }
        public double price { get; set; }
        public string category { get; set; }
        public string description { get; set; }
        public int stockAmount { get; set; }
    }
}
