using System;

namespace API.DTOs
{
    public class HotelDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Stars { get; set; }
        public string Description { get; set; }
        public bool Available { get; set; }
        public string CheapestOfferPrice { get; set; }
        public string CheapestOfferCurrency { get; set; }
    }
}