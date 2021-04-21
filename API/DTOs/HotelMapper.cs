using System;
using System.Collections.Generic;
using System.Linq;

namespace API.DTOs
{
    public class HotelMapper
    {
        internal static List<HotelDto> HotelsToDto(Hotels hotels)
        {
            List<HotelDto> list = new List<HotelDto>();
            if (hotels != null && hotels.Data != null)
            {
                foreach (Datum d in hotels.Data)
                {
                    HotelDto hotelDto = new HotelDto();
                    hotelDto.Id = Guid.NewGuid();
                    hotelDto.Name = d.Hotel.Name;
                    hotelDto.Available = d.Available;
                    hotelDto.Description = d.Hotel.Description != null ? d.Hotel.Description.Text : "N/A";
                    hotelDto.Stars = string.IsNullOrEmpty(d.Hotel.Rating) ? 0 : int.Parse(d.Hotel.Rating);
                    if (d.Available && d.Offers.Any())
                    {
                        Offer CheapestOffer = GetCheapestOffer(d);
                        hotelDto.CheapestOfferPrice = CheapestOffer.Price.Total;
                        hotelDto.CheapestOfferCurrency = CheapestOffer.Price.Currency;
                    }
                    list.Add(hotelDto);
                }
            }
            else
            {
                throw new Exception("No data received from Amadeus API");
            }
            return list.OrderByDescending(p => p.Available).ToList();
        }

        private static Offer GetCheapestOffer(Datum datum)
        {
            return datum.Offers.Select(p => (p.Price.Total, p)).Min().Item2;
        }

    }

}